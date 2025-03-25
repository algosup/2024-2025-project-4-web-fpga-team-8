import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { ModuleData } from "../types";

interface Props {
  module: ModuleData | null;
}

type TimingCell = {
  cell_type: string;
  instance: string;
  delays: Record<string, unknown>;
  constraints: Record<string, unknown>;
};

function FPGALayout({ module }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    const width = 500;
    const height = 500;
    const rows = 10;
    const cols = 10;
    const cellSize = width / cols;

    svg.attr("width", width).attr("height", height);

    // Draw the grid
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        svg.append("rect")
          .attr("x", i * cellSize)
          .attr("y", j * cellSize)
          .attr("width", cellSize)
          .attr("height", cellSize)
          .attr("stroke", "black")
          .attr("fill", "none");
      }
    }

    // Draw cells if timing data exists
    const cells = (module?.timing as { cells: TimingCell[] })?.cells;
    if (Array.isArray(cells)) {
      cells.forEach((cell: TimingCell, index: number) => {
        let xCoord: number, yCoord: number;

        // Try to extract coordinates from the instance string
        const match = cell.instance.match(/_(\d+)_(\d+)(?!.*\d)/);
        if (match) {
          xCoord = parseInt(match[1], 10);
          yCoord = parseInt(match[2], 10);
        } else {
          // Fallback to index-based layout
          xCoord = index % cols;
          yCoord = Math.floor(index / cols);
          console.warn("No coords found for instance:", cell.instance);
        }

        const x = xCoord * cellSize;
        const y = yCoord * cellSize;

        svg.append("circle")
          .attr("cx", x + cellSize / 2)
          .attr("cy", y + cellSize / 2)
          .attr("r", cellSize / 4)
          .attr("fill", getColor(cell.cell_type))
          .append("title")
          .text(`${cell.cell_type}\n${cell.instance}`);
      });
    }
  }, [module]);

  return <svg ref={svgRef}></svg>;
}

function getColor(type: string): string {
  switch (type) {
    case "DFF": return "#ff6f61"; 
    case "LUT_K": return "#4fc3f7"; 
    case "fpga_interconnect": return "#81c784";
    default: return "#ce93d8"; 
  }
}

export default FPGALayout;
