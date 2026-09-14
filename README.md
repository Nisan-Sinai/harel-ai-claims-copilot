# Harel AI Claims Copilot

## Insurance AI Claims Copilot — Candidate Demo

A one-repository, end-to-end AI engineering portfolio demo for insurance claims intake. Free text is converted into validated structured data, persisted to Supabase, and routed to a human review workflow.

> **Candidate Demo – Not affiliated with Harel Insurance & Finance. Fictional data only.**

### What this demonstrates

- Next.js 16 + React 19 + strict TypeScript
- Gemini structured extraction behind a server-only boundary
- Zod validation of model output before persistence
- Supabase PostgreSQL with RLS enabled
- Human-in-the-loop review and approval/correction states
- Deterministic demo fallback when no AI key is configured
- Dashboard, architecture view, health endpoint, tests and GitHub Actions CI

### Architecture

```text
Browser → Next.js API → input validation → Gemini → Zod output validation → Supabase → human review
```

The model does **not** determine coverage, liability, fraud or payout. Risk indicators are triage signals for human review only.

### Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.5-flash
```

Run `supabase/migrations/001_claims.sql` in the Supabase SQL editor. The service-role key is server-side only and must never be exposed to the browser.

Without `GEMINI_API_KEY`, the application uses a clearly labelled deterministic fallback so the complete UI can still be demonstrated with fictional data.

### Quality gates

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

For a real insurance deployment, add enterprise SSO/RBAC, immutable audit events, DLP/PII controls, rate limiting, model evaluation/monitoring, prompt-injection defenses, formal retention rules and security/privacy review.
