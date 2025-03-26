import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { ModuleData } from "../types";

interface Props {
  module: ModuleData | null;
}

type DelayValue = {
  min: number;
  typ: number;
  max: number;
};

type TimingCell = {
  cell_type: string;
  instance: string;
  delays: Record<string, DelayValue | string>;
  constraints: Record<string, DelayValue | string>;
};

function FPGALayout({ module }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showLegend, setShowLegend] = useState(true);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const containerWidth = containerRef.current.clientWidth;
    const maxGridWidth = 750;
    const width = Math.min(containerWidth, maxGridWidth);

    const cols = 10;
    const rows = 10;
    const cellSize = width / cols;
    const height = cellSize * rows;

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

        const group = svg.append("g")
          .attr("transform", `translate(${x + cellSize / 2}, ${y + cellSize / 2})`);

        group.append("circle")
          .attr("r", cellSize / 3.5)
          .attr("fill", getColor(cell.cell_type))
          .attr("stroke", getStrokeColor(cell.cell_type))
          .attr("stroke-width", 1.5);

        const formatSection = (
          data: Record<string, DelayValue | string>,
          sectionName: string
        ): string => {
          const lines: string[] = [`${sectionName}:`];
          Object.entries(data).forEach(([label, value]) => {
            lines.push(`  ${label}:`);
            if (
              typeof value === "object" &&
              value !== null &&
              "min" in value &&
              "typ" in value &&
              "max" in value
            ) {
              lines.push(`    min: ${value.min}`);
              lines.push(`    typ: ${value.typ}`);
              lines.push(`    max: ${value.max}`);
            } else {
              lines.push(`    ${value}`);
            }
          });
          return lines.join("\n");
        };

        const tooltipText = [
          `Type: ${cell.cell_type}`,
          `Instance: ${cell.instance}`,
          "",
          Object.keys(cell.delays).length > 0
            ? formatSection(cell.delays, "Delays")
            : "Delays: N/A",
          Object.keys(cell.constraints).length > 0
            ? "\n" + formatSection(cell.constraints, "Constraints")
            : ""
        ].join("\n");

        group.append("title").text(tooltipText);
      });
    }
  }, [module, showLegend]);

  return (
    <div style={{ position: "relative", padding: "20px" }}>
      {/* Floating Legend */}
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
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

      {/* Centered Grid Container */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "60px",
        }}
      >
        <svg
          ref={svgRef}
          style={{
            width: "100%",
            maxWidth: "750px",
            height: "auto",
            display: "block",
          }}
        />
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

function getStrokeColor(type: string): string {
  switch (type) {
    case "DFF":
      return "#b71c1c";
    case "LUT_K":
      return "#0d47a1";
    case "fpga_interconnect":
      return "#1b5e20";
    default:
      return "#6a1b9a";
  }
}

export default FPGALayout;
