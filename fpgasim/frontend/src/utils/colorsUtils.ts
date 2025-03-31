export function getColor(type: string): string {
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
  
  export function getStrokeColor(type: string): string {
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
  