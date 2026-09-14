export type ClaimType = "vehicle" | "property" | "health" | "travel" | "life" | "other";
export type Severity = "low" | "medium" | "high" | "critical";
export type ClaimStatus = "new" | "needs_review" | "approved" | "corrected";

export interface ClaimAnalysis {
  claimType: ClaimType;
  severity: Severity;
  summary: string;
  injuries: boolean | null;
  incidentDate: string | null;
  location: string | null;
  entities: Array<{ label: string; value: string }>;
  missingInformation: string[];
  recommendedDocuments: string[];
  nextAction: string;
  confidence: number;
  riskFlags: string[];
  rationale: string[];
}

export interface ClaimRecord {
  id: string;
  description: string;
  analysis: ClaimAnalysis;
  ai_provider: string;
  model: string;
  status: ClaimStatus;
  reviewer_notes: string | null;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}
