import * as d3 from "d3";
import { useEffect, useRef, useState, useMemo } from "react";
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);

  const cells = useMemo(() => {
    return (module?.timing as { cells: TimingCell[] })?.cells || [];
  }, [module]);

  const signalPath = useMemo(() => {
    return cells.map((cell, index) => ({ ...cell, index }));
  }, [cells]);

  // Animation effect
  useEffect(() => {
    if (!isPlaying || signalPath.length === 0) return;

    const current = signalPath[currentStep];
    const delay = getTypDelay(current?.delays) / speed;

    const timer = setTimeout(() => {
      if (currentStep < signalPath.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setIsPlaying(false);
        setCurrentStep(0);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, signalPath, speed]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const containerWidth = containerRef.current.clientWidth;
    const maxGridWidth = 750;
    const width = Math.min(containerWidth, maxGridWidth);

    const cols = 10;
    const rows = 10;
    const cellSize = (width / cols) * zoomLevel;
    const height = cellSize * rows;

    svg.attr("width", width).attr("height", height);

    // Grid
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

    // Nodes
    cells.forEach((cell, index) => {
      let xCoord: number, yCoord: number;
      const match = cell.instance.match(/_(\d+)_(\d+)(?!.*\d)/);
      if (match) {
        xCoord = parseInt(match[1], 10);
        yCoord = parseInt(match[2], 10);
      } else {
        xCoord = index % cols;
        yCoord = Math.floor(index / cols);
      }

      const x = xCoord * cellSize;
      const y = yCoord * cellSize;
      const isActive = index === signalPath[currentStep]?.index;

      const group = svg.append("g")
        .attr("transform", `translate(${x + cellSize / 2}, ${y + cellSize / 2})`);

      const circle = group
        .append("circle")
        .attr("r", cellSize / 3.5)
        .attr("fill", getColor(cell.cell_type))
        .attr("stroke", isActive ? "#FFD700" : getStrokeColor(cell.cell_type))
        .attr("stroke-width", isActive ? 4 : 1.5);

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
          .attr("dy", cellSize / 2 + 12)
          .style("font-size", "10px")
          .style("fill", "#333");
      }
    });
  }, [module, showLegend, currentStep, cells, signalPath, isPlaying, zoomLevel]);

  return (
    <div style={{ position: "relative", padding: "20px" }}>
      {/* Legend */}
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <strong style={{ fontSize: "14px" }}>Legend</strong>
          <button
            onClick={() => setShowLegend(!showLegend)}
            style={{
              fontSize: "11px",
              border: "none",
              background: "transparent",
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

      {/* Controls */}
      <div style={{ marginBottom: "12px", display: "flex", gap: "12px" }}>
        <button
          onClick={() => {
            setIsPlaying(true);
            setCurrentStep(0);
          }}
          style={buttonStyle}
        >
          Play
        </button>

        <button onClick={() => setIsPlaying(false)} style={buttonStyle}>
          Pause
        </button>

        <button
          onClick={() => {
            setIsPlaying(false);
            if (currentStep < signalPath.length - 1) {
              setCurrentStep((prev) => prev + 1);
            }
          }}
          style={buttonStyle}
        >
          Step
        </button>

        <select
          value={speed}
          onChange={(e) => setSpeed(parseInt(e.target.value))}
          style={{
            ...buttonStyle,
            padding: "6px",
            fontSize: "13px",
            width: "60px",
          }}
        >
          <option value={1}>x1</option>
          <option value={2}>x2</option>
          <option value={4}>x4</option>
        </select>

        <button onClick={() => setZoomLevel((z) => Math.min(z * 1.2, 5))} style={buttonStyle}>＋</button>
        <button onClick={() => setZoomLevel((z) => Math.max(z / 1.2, 1))} style={buttonStyle}>－</button>
      </div>

      {/* Canvas */}
      <div
        ref={containerRef}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
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

// ========== Utilities ==========

const buttonStyle = {
  padding: "6px 12px",
  backgroundColor: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "13px"
};

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

function getTooltip(cell: TimingCell): string {
  const formatSection = (
    data: Record<string, DelayValue | string>,
    title: string
  ): string => {
    const lines = [`${title}:`];
    for (const [key, val] of Object.entries(data)) {
      lines.push(`  ${key}:`);
      if (
        typeof val === "object" &&
        "min" in val &&
        "typ" in val &&
        "max" in val
      ) {
        lines.push(`    min: ${val.min}`);
        lines.push(`    typ: ${val.typ}`);
        lines.push(`    max: ${val.max}`);
      } else {
        lines.push(`    ${val}`);
      }
    }
    return lines.join("\n");
  };

  return [
    `Type: ${cell.cell_type}`,
    `Instance: ${cell.instance}`,
    "",
    Object.keys(cell.delays).length
      ? formatSection(cell.delays, "Delays")
      : "Delays: N/A",
    Object.keys(cell.constraints).length
      ? formatSection(cell.constraints, "Constraints")
      : "",
  ].join("\n");
}

function getTypDelay(delays: Record<string, DelayValue | string> = {}): number {
  for (const val of Object.values(delays)) {
    if (typeof val === "object" && "typ" in val) {
      return val.typ;
    }
  }
  return 500;
}

export default FPGALayout;
