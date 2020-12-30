import { Result } from "axe-core";

export type ViolationImpact = "moderate" | "serious" | "critical" | "minor";

export interface AxeResult {
  incomplete: Result[];
  passes: Result[];
  violations: Result[];
}
