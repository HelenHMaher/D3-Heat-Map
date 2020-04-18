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

fetch(url)
  .then((response) => response.json())
  .then((dataset) => {
    console.log(dataset);
    svgContainer
      .append("text")
      .attr("x", 100)
      .attr("y", 100)
      .text(JSON.stringify(dataset));
  });
