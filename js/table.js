import * as d3 from "d3";

var employeePromise = d3.csv("data/CompanyData.csv");

var drawGraph = function (employee, xScale, yScale, sqrtScale) {
  console.log(employee);
  d3.select("#graph")
    .selectAll("circle")
    .data(employee)
    .enter()
    .append("circle")
    .attr("cx", function (emp) {
      return xScale(emp.Senority);
    })
    .attr("cy", function (emp) {
      return yScale(emp.salary);
    })
    .attr("r", 2)
    .attr("fill", function (emp) {
      if (emp.Area === "Production") {
        return "green";
      } else if (emp.Area === "Janitorial") {
        return "blue";
      } else if (emp.Area === "Management") {
        return "red";
      } else if (emp.Area === "Executive") {
        return "yellow";
      }
    });
};

var drawSqrt = function (employee, xScale, yScale, sqrtScale) {
  console.log(employee);
  d3.select("#graph")
    .selectAll("circle")
    .data(employee)
    .enter()
    .append("circle")
    .attr("cx", function (emp) {
      return xScale(emp.Senority);
    })
    .attr("cy", function (emp) {
      return yScale(emp.salary);
    })
    .attr("r", function (emp) {
      console.log(sqrtScale(emp.age));
      return sqrtScale(emp.age);
    })
    .attr("fill", function (emp) {
      if (emp.Area === "Production") {
        return "green";
      } else if (emp.Area === "Janitorial") {
        return "blue";
      } else if (emp.Area === "Management") {
        return "red";
      } else if (emp.Area === "Executive") {
        return "yellow";
      }
    });
};

var initGraph = function (employee, xmax, ymax) {
  var xScale = d3.scaleLinear().domain([0, xmax]).range([0, 600]);

  var yScale = d3.scaleLinear().domain([0, ymax]).range([400, 0]);

  drawGraph(employee, xScale, yScale);
};

var initLog = function (employee, xmax, ymax) {
  var xScale = d3.scaleLinear().domain([0, xmax]).range([0, 600]);

  var yScale = d3.scaleLog().domain([20000, ymax]).range([400, 0]);

  drawGraph(employee, xScale, yScale);
};

var initSqrt = function (employee, xmax, ymax, amax) {
  var xScale = d3.scaleLinear().domain([0, xmax]).range([0, 600]);

  var yScale = d3.scaleLinear().domain([0, ymax]).range([400, 0]);

  var sqrtScale = d3.scaleSqrt().domain([0, amax]).range([1, 10]);

  drawSqrt(employee, xScale, yScale, sqrtScale);
};

var clearGraph = function () {
  d3.select("#graph").selectAll("*").remove();
};

var successFCN = function (companyData) {
  console.log(companyData);
  // Salary Max
  var getsalary = function (employee) {
    return Number(employee.salary);
  };
  var salary1 = companyData.map(getsalary);
  var maxsalary = d3.max(salary1);
  console.log(maxsalary);
  // Senority Max
  var getage = function (employee) {
    return Number(employee.Senority);
  };
  var age1 = companyData.map(getage);
  var maxage = d3.max(age1);
  console.log(maxage);

  var getage1 = function (employee) {
    return Number(employee.age);
  };
  var age2 = companyData.map(getage1);
  var maxage1 = d3.max(age2);
  console.log(maxage1);

  d3.select("#reg").on("click", function () {
    clearGraph();
    initGraph(companyData, maxage, maxsalary);
  });

  d3.select("#log").on("click", function () {
    clearGraph();
    initLog(companyData, maxage, maxsalary);
  });

  d3.select("#size").on("click", function () {
    clearGraph();
    initSqrt(companyData, maxage, maxsalary, maxage1);
  });
};

var failFCN = function (fail) {
  console.log(fail);
};

employeePromise.then(successFCN, failFCN);
