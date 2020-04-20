const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const width = 2000,
  height = 500,
  padding = 80;

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
  .attr("y", height - padding / 4)
  .attr("class", "axisTitle")
  .attr("id", "xAxisTitle");

fetch(url)
  .then((response) => response.json())
  .then((dataset) => {
    const yScale = d3
      .scaleBand()
      .domain(dataset.monthlyVariance.map((d) => d.month))
      .rangeRound([height - padding, 0]);

    const xScale = d3
      .scaleBand()
      .domain(dataset.monthlyVariance.map((d) => d.year))
      .range([0, width - padding]);

    const yAxis = d3
      .axisLeft(yScale)
      .tickValues(yScale.domain())
      .tickFormat((d) => {
        date = new Date(0, d - 1);
        return d3.timeFormat("%B")(date);
      });

    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat((d) => {
        date = new Date(d, 0);
        return d3.timeFormat("%Y")(date);
      })
      .tickValues(xScale.domain().filter((x) => x % 10 === 0));

    svgContainer
      .append("g")
      .attr("id", "y-axis")
      .attr("transform", "translate(" + padding + ", 0)")
      .call(yAxis);

    svgContainer
      .append("g")
      .attr("id", "x-axis")
      .attr(
        "transform",
        "translate(" + padding + ", " + (height - padding) + ")"
      )
      .call(xAxis);

    svgContainer
      .selectAll("rect")
      .data(dataset.monthlyVariance)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(d))
      .attr("y", (d, i) => yScale(d));
  });
