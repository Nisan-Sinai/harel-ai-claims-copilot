import { z } from "zod";

export const claimAnalysisSchema = z.object({
  claimType: z.enum(["vehicle", "property", "health", "travel", "life", "other"]),
  severity: z.enum(["low", "medium", "high", "critical"]),
  summary: z.string().min(1).max(500),
  injuries: z.boolean().nullable(),
  incidentDate: z.string().nullable(),
  location: z.string().nullable(),
  entities: z.array(z.object({ label: z.string(), value: z.string() })).max(20),
  missingInformation: z.array(z.string()).max(20),
  recommendedDocuments: z.array(z.string()).max(20),
  nextAction: z.string().min(1).max(500),
  confidence: z.number().min(0).max(1),
  riskFlags: z.array(z.string()).max(20),
  rationale: z.array(z.string()).max(12)
});

export const createClaimSchema = z.object({
  description: z.string().trim().min(15, "יש להזין תיאור מפורט יותר").max(5000)
});

export const reviewClaimSchema = z.object({
  action: z.enum(["approve", "correct"]),
  reviewerNotes: z.string().trim().max(1500).optional().default(""),
  analysis: claimAnalysisSchema.optional()
});
