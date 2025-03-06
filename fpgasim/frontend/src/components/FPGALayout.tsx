import * as d3 from "d3";
import { useEffect, useRef } from "react";

function FPGALayout() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current)
      .attr("width", 500)
      .attr("height", 500);

    const rows = 10;
    const cols = 10;
    const cellSize = 50;
    
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
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default FPGALayout;