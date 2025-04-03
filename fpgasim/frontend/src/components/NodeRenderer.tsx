import * as d3 from "d3";
import { getColor, getStrokeColor } from "../utils/colorsUtils";
import { getTooltip } from "../utils/toolTipsUtils";
import { TimingCell } from "../types";

type ExtendedTimingCell = TimingCell & { index?: number };

export function renderNodes(
  nodeGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
  cells: ExtendedTimingCell[],
  cellSize: number,
  cols: number,
  currentStep: number,
  isPlaying: boolean
) {
  cells.forEach((cell, index) => {
    const match = cell.instance.match(/_(\d+)_(\d+)(?!.*\d)/);
    const xCoord = match ? parseInt(match[1], 10) : index % cols;
    const yCoord = match ? parseInt(match[2], 10) : Math.floor(index / cols);

    const spacingFactor = 1.2;
    const x = xCoord * cellSize * spacingFactor;
    const y = yCoord * cellSize * spacingFactor;
    const isActive = index === currentStep;

    const group = nodeGroup
      .append("g")
      .attr("transform", `translate(${x + cellSize / 2}, ${y + cellSize / 2})`);

    const circle = group
      .append("circle")
      .attr("r", cellSize / 3.5)
      .attr("fill", getColor(cell.cell_type))
      .attr("stroke", isActive ? "#FFD700" : getStrokeColor(cell.cell_type))
      .attr("stroke-width", isActive ? 4 : 1.5);

    // Add hover effect when animation is paused
    if (!isPlaying) {
      circle
        .on("mouseover", function () {
          d3.select(this).attr("stroke-width", 3);
        })
        .on("mouseout", function () {
          d3.select(this).attr("stroke-width", 1.5);
        });
    }

    group.append("title").text(getTooltip(cell));

    if (isActive) {
      group
        .append("text")
        .text("Active")
        .attr("text-anchor", "middle")
        .attr("dy", cellSize / 2 + 16)
        .style("font-size", `${cellSize / 3.2}px`)
        .style("font-weight", "600")
        .style("fill", "#222")
        .style("background", "transparent");
    }
  });
}