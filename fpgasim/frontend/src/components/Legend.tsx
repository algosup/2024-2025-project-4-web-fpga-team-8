import React from "react";
import LegendItem from "./LegendItem";

interface Props {
  showLegend: boolean;
  onToggle: () => void;
}

function Legend({ showLegend, onToggle }: Props) {
  return (
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
          onClick={onToggle}
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
  );
}

export default Legend;