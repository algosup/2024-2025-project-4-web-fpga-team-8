import { TimingCell } from "../types";

type DelayValue = {
  min: number;
  typ: number;
  max: number;
};

// Formats a tooltip string for a given timing cell, including delays and constraints
export function getTooltip(cell: TimingCell): string {
  const formatSection = (
    data: Record<string, string | DelayValue>,
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