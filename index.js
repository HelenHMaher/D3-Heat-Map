const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const width = 2000,
  height = 500,
  padding = 60;

const svgContainer = d3
  .select(".visHolder")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

svgContainer
  .append("text")
  .text("Month")
  .attr("transform", "rotate(-90 15 200)")
  .attr("x", 15)
  .attr("y", 200)
  .attr("class", "axisTitle")
  .attr("id", "yAxisTitle");

svgContainer
  .append("text")
  .text("Year")
  .attr("x", 300)
  .attr("y", height - padding)
  .attr("class", "axisTitle")
  .attr("id", "xAxisTitle");

fetch(url)
  .then((response) => response.json())
  .then((dataset) => {
    const yScale = d3.scale.ordinal().domain([0, 1, 3, 11]).range([0, 100]);

    /*const xScale = d3
      .ordinal()
      .domain([dataset.monthlyVariance.map((d) => d.year)])
      .range([padding, width]);*/

    const yAxis = d3.axisLeft(yScale);
    //const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"));

    svgContainer
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(200, 200)")
      .call(yAxis);

    /*svgContainer
      .selectAll("rect")
      .data(dataset.monthlyVariance)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(d.Month - 1))
      .attr("y", (d, i) => yScale(d.Year));*/
  });
