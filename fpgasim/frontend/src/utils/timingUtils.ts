import { TimingDelay } from "../types";

export function getTypDelay(
  delays: Record<string, TimingDelay | string> = {}
): number {
  for (const val of Object.values(delays)) {
    if (typeof val === "object" && "typ" in val) {
      return val.typ;
    }
  }
  return 500;
}
