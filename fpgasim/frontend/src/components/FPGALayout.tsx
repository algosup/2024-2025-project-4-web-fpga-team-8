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
        svg
          .append("rect")
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

        svg
          .append("circle")
          .attr("cx", x + cellSize / 2)
          .attr("cy", y + cellSize / 2)
          .attr("r", cellSize / 3.5)
          .attr("fill", getColor(cell.cell_type))
          .append("title")
          .text(`${cell.cell_type}\n${cell.instance}`);
      });
    }
  }, [module, showLegend]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ position: "relative", width: "600px" }}>
        <svg
          ref={svgRef}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />

        {/* Legend + Toggle Container */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 10,
            padding: "12px",
            borderRadius: "8px",
            background: "#fff",
            border: "1px solid #ccc",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            width: "140px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <strong style={{ fontSize: "14px" }}>Legend</strong>
            <button
              onClick={() => setShowLegend(!showLegend)}
              style={{
                padding: "2px 6px",
                fontSize: "11px",
                borderRadius: "4px",
                background: "#f3f3f3",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              {showLegend ? "×" : "Show"}
            </button>
          </div>

          {showLegend && (
            <>
              <LegendItem color="#ff6f61" label="DFF" />
              <LegendItem color="#4fc3f7" label="LUT" />
              <LegendItem color="#81c784" label="Interconnect" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "6px" }}>
      <div
        style={{
          width: "14px",
          height: "14px",
          backgroundColor: color,
          marginRight: "8px",
          borderRadius: "4px",
          border: "1px solid #aaa",
        }}
      />
      <span style={{ fontSize: "13px" }}>{label}</span>
    </div>
  );
}

function getColor(type: string): string {
  switch (type) {
    case "DFF":
      return "#ff6f61";
    case "LUT_K":
      return "#4fc3f7";
    case "fpga_interconnect":
      return "#81c784";
    default:
      return "#ce93d8";
  }
}

export default FPGALayout;
