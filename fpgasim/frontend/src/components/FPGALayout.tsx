import * as d3 from "d3";
import { useEffect, useRef, useState, useMemo } from "react";
import { ModuleData, TimingCell } from "../types";
import { getTypDelay } from "../utils/timingUtils";
import Legend from "./Legend";
import PlaybackControls from "./PlaybackControls";
import { renderGrid } from "./GridRenderer";
import { renderArrows } from "./ArrowRenderer";
import { renderNodes } from "./NodeRenderer";

interface Props {
  module: ModuleData | null;
}

function FPGALayout({ module }: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [showLegend, setShowLegend] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Extract cell data from the timing section
  const cells = useMemo(() => {
    return (module?.timing as { cells: TimingCell[] })?.cells || [];
  }, [module]);

  // Build an ordered path for signal traversal
  const signalPath = useMemo(() => {
    return cells.map((cell, index) => ({ ...cell, index }));
  }, [cells]);

  // Playback animation loop
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

  // Render grid, arrows, and nodes
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const gridGroup = svg.append("g").attr("class", "grid-layer");
    const arrowGroup = svg.append("g").attr("class", "arrow-layer");
    const nodeGroup = svg.append("g").attr("class", "node-layer");

    // Define reusable arrow marker
    arrowGroup
      .append("defs")
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 6)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", "#888");

      const containerWidth = containerRef.current.clientWidth;
      const maxGridWidth = 1000;
      const spacingFactor = 1.2; 
      const cols = 20;
      const rows = 20;
      
      const cellSize = (Math.min(containerWidth, maxGridWidth) / (cols * spacingFactor)) * zoomLevel;
      
      const width = cellSize * cols * spacingFactor;
      const height = cellSize * rows * spacingFactor;
      

    svg.attr("width", width).attr("height", height);

    renderGrid(gridGroup, cols, rows, cellSize);
    renderArrows(arrowGroup, signalPath, cellSize, cols);
    renderNodes(nodeGroup, cells, cellSize, cols, currentStep, isPlaying);
  }, [
    module,
    currentStep,
    cells,
    signalPath,
    isPlaying,
    zoomLevel,
    showLegend,
  ]);

  return (
    <div style={{ position: "relative", padding: "20px" }}>
      <Legend
        showLegend={showLegend}
        onToggle={() => setShowLegend(!showLegend)}
      />

      <PlaybackControls
        isPlaying={isPlaying}
        currentStep={currentStep}
        totalSteps={signalPath.length}
        onPlay={() => {
          setIsPlaying(true);
          setCurrentStep(0);
        }}
        onPause={() => setIsPlaying(false)}
        onStep={() => {
          setIsPlaying(false);
          if (currentStep < signalPath.length - 1) {
            setCurrentStep((prev) => prev + 1);
          }
        }}
        speed={speed}
        onSpeedChange={setSpeed}
        onZoomIn={() => setZoomLevel((z) => Math.min(z * 1.2, 5))}
        onZoomOut={() => setZoomLevel((z) => Math.max(z / 1.2, 1))}
      />

      <div
        ref={containerRef}
        style={{
          maxWidth: "100%",
          display: "flex",
          overflowX: "auto",
          overflowY: "hidden",
          justifyContent: "center",
        }}
      >
        <svg
          ref={svgRef}
          style={{
            display: "block",
          }}
        />
      </div>
    </div>
  );
}

export default FPGALayout;
