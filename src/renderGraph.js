import * as d3 from "d3";

// Function to render the graph using D3.js
function renderGraph(lossHistory) {
  d3.select("#lossChart").selectAll("*").remove();

  const width = 400; // Set the width of the graph
  const height = 300; // Set the height of the graph

  // Create an SVG element for the graph
  const svg = d3
    .select("#lossChart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Define margins for the graph
  const margin = { top: 20, right: 20, bottom: 30, left: 40 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Create scales for x and y axes
  const xScale = d3
    .scaleLinear()
    .domain([1, lossHistory.length])
    .range([0, innerWidth]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(lossHistory)])
    .range([innerHeight, 0]);

  // Create a line generator for the path
  const line = d3
    .line()
    .x((d, i) => xScale(i + 1))
    .y((d) => yScale(d));

  // Append a group element for the graph
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  // Append the path element to display the line graph
  g.append("path")
    .datum(lossHistory)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 2)
    .attr("d", line);

  // Add x-axis
  g.append("g")
    .attr("transform", `translate(0,${innerHeight})`)
    .call(d3.axisBottom(xScale).ticks(lossHistory.length));

  // Add y-axis
  g.append("g").call(d3.axisLeft(yScale));

  // Add labels
  svg
    .append("text")
    .attr("transform", `translate(${width / 2},${height})`)
    .style("text-anchor", "middle")
    .text("Iteration");

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - height / 2)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Loss");

  return svg.node();
}

export default renderGraph;
