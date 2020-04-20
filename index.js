const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const width = 2000,
  height = 600,
  paddingLeft = 80,
  paddingBottom = 150;

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
  .attr("y", height - 110)
  .attr("class", "axisTitle")
  .attr("id", "xAxisTitle");

fetch(url)
  .then((response) => response.json())
  .then((dataset) => {
    d3.select(document.getElementById("description"))
      .append("text")
      .html(
        dataset.monthlyVariance[0].year +
          "-" +
          dataset.monthlyVariance[dataset.monthlyVariance.length - 1].year +
          " (base temperature " +
          dataset.baseTemperature +
          "&#8451;)"
      );

    const yScale = d3
      .scaleBand()
      .domain(dataset.monthlyVariance.map((d) => d.month))
      .range([height - paddingBottom, 0]);

    const xScale = d3
      .scaleBand()
      .domain(dataset.monthlyVariance.map((d) => d.year))
      .range([0, width - paddingLeft]);

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
      .attr("transform", "translate(" + paddingLeft + ", 0)")
      .call(yAxis);

    svgContainer
      .append("g")
      .attr("id", "x-axis")
      .attr(
        "transform",
        "translate(" + paddingLeft + ", " + (height - paddingBottom) + ")"
      )
      .call(xAxis);

    const varianceArray = dataset.monthlyVariance.map((d) => d.variance);
    const tempArray = varianceArray.map((d, i) => d + dataset.baseTemperature);

    const legendScale = d3
      .scaleLinear()
      .domain(() => {
        const step =
          d3.max(tempArray) - d3.min(tempArray) / legendColors.length;
      })
      .range(legendColors);

    const legendAxis = d3
      .axisBottom(legendScale)
      .tickFormat((d) => d3.format(".2f")(d));

    svgContainer
      .append("g")
      .attr("id", "legendAxis")
      .attr(
        "transform",
        "translate(" + paddingLeft + "," + (height - paddingLeft) + ")"
      )
      .call(legendAxis);

    svgContainer
      .selectAll("rect")
      .data(dataset.monthlyVariance)
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("data-month", (d) => d.month - 1)
      .attr("data-year", (d) => d.year)
      .attr("data-temp", (d) => dataset.baseTemperature + d.variance)
      .attr("x", (d, i) => xScale(d.year) + paddingLeft)
      .attr("y", (d, i) => yScale(d.month))
      .attr("width", 5)
      .attr("height", 30);
  });
