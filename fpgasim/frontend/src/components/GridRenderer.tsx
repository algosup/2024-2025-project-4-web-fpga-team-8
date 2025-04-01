import * as d3 from "d3";

// Draws a grid of rectangles representing the FPGA layout
export function renderGrid(
  gridGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
  cols: number,
  rows: number,
  cellSize: number
) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      gridGroup
        .append("rect")
        .attr("x", i * cellSize)
        .attr("y", j * cellSize)
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("stroke", "black")
        .attr("fill", "none");
    }
  }
}