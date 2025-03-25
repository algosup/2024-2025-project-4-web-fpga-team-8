import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
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
  const [showLegend, setShowLegend] = useState(true);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const container = svgRef.current.parentElement;
    const width = container ? container.clientWidth : 600;
    const height = 600;

    const cols = 10;
    const rows = 10;
    const cellSize = Math.min(width, height) / cols;

    svg.attr("width", width).attr("height", height);

    // Draw grid
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

    const cells = (module?.timing as { cells: TimingCell[] })?.cells;
    if (Array.isArray(cells)) {
      cells.forEach((cell: TimingCell, index: number) => {
        let xCoord: number, yCoord: number;

        const match = cell.instance.match(/_(\d+)_(\d+)(?!.*\d)/);
        if (match) {
          xCoord = parseInt(match[1], 10);
          yCoord = parseInt(match[2], 10);
        } else {
          xCoord = index % cols;
          yCoord = Math.floor(index / cols);
          console.warn("No coords found for instance:", cell.instance);
        }

        const x = xCoord * cellSize;
        const y = yCoord * cellSize;

        svg.append("circle")
          .attr("cx", x + cellSize / 2)
          .attr("cy", y + cellSize / 2)
          .attr("r", cellSize / 3.5)
          .attr("fill", getColor(cell.cell_type))
          .append("title")
          .text(`${cell.cell_type}\n${cell.instance}`);
      });
    }

    // Legend
    if (showLegend) {
      const legendData = [
        { label: "DFF", color: "#ff6f61" },
        { label: "LUT", color: "#4fc3f7" },
        { label: "Interconnect", color: "#81c784" },
      ];

      const legend = svg.selectAll(".legend")
        .data(legendData)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", (_, i) => `translate(${width - 120}, ${i * 20 + 10})`);

      legend.append("rect")
        .attr("width", 10)
        .attr("height", 10)
        .attr("fill", d => d.color);

      legend.append("text")
        .attr("x", 15)
        .attr("y", 10)
        .style("font-size", "10px")
        .text(d => d.label);
    }
  }, [module, showLegend]);

  return (
    <div>
      <button onClick={() => setShowLegend(!showLegend)} style={{ marginBottom: "10px" }}>
        {showLegend ? "Hide Legend" : "Show Legend"}
      </button>
      <svg ref={svgRef} style={{ width: "100%", height: "auto", display: "block" }} />
    </div>
  );
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
