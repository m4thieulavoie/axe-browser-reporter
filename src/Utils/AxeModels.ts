export type ViolationImpact = "moderate" | "serious" | "critical" | "minor";

export interface AxeViolationNode {
  failureSummary: string;
  html: string;
  impact: ViolationImpact;
  target: string[];
}

export interface AxeViolation {
  description: string;
  help: string;
  helpUrl: string;
  id: string;
  impact: ViolationImpact;
  tags: string[];
  nodes: AxeViolationNode[];
}

export interface AxeResult {
  incomplete: AxeViolation[];
  passes: AxeViolation[];
  violations: AxeViolation[];
}
