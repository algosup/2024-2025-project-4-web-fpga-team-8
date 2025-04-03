import * as d3 from "d3";

interface Cell {
  instance: string;
  index: number;
}

export function renderArrows(
  arrowGroup: d3.Selection<SVGGElement, unknown, null, undefined>,
  signalPath: Cell[],
  cellSize: number,
  cols: number
) {
  for (let i = 0; i < signalPath.length - 1; i++) {
    const from = signalPath[i];
    const to = signalPath[i + 1];

    // Extract grid coordinates from instance name if possible (e.g., "_3_5")
    const fromMatch = from.instance.match(/_(\d+)_(\d+)(?!.*\d)/);
    const toMatch = to.instance.match(/_(\d+)_(\d+)(?!.*\d)/);

    const [fromXGrid, fromYGrid] = fromMatch
      ? [parseInt(fromMatch[1], 10), parseInt(fromMatch[2], 10)]
      : [from.index % cols, Math.floor(from.index / cols)];

    const [toXGrid, toYGrid] = toMatch
      ? [parseInt(toMatch[1], 10), parseInt(toMatch[2], 10)]
      : [to.index % cols, Math.floor(to.index / cols)];

    const spacingFactor = 1.2;

    const fromX = fromXGrid * cellSize * spacingFactor + cellSize / 2;
    const fromY = fromYGrid * cellSize * spacingFactor + cellSize / 2;
    const toX = toXGrid * cellSize * spacingFactor + cellSize / 2;
    const toY = toYGrid * cellSize * spacingFactor + cellSize / 2;

    arrowGroup
      .append("line")
      .attr("x1", fromX)
      .attr("y1", fromY)
      .attr("x2", toX)
      .attr("y2", toY)
      .attr("stroke", "#888")
      .attr("stroke-width", 2)
      .attr("marker-end", "url(#arrow)");
  }
}
