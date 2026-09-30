# Qodum Engineering Log

## Context

Qodum is a school ERP originally built between November 2023 and January
2025. Development paused in 2025 to focus on academic exams. Development resumed in August 2026 with a
different goal: instead of adding new features, this phase is a structured
audit of the existing codebase — finding real architectural, security, and
dependency issues, understanding their root causes, and fixing them
properly.

This log exists so the reasoning behind each change is on record, not just
the diff. Entries are written as they're found and fixed, in the order they
happened. A `pre-refactor` git tag marks the state of the codebase before
this work began, so any entry here can be diffed against the original.

Each entry follows the same structure: what was found, why it was
happening, what changed, how it was verified, and what it affects.

---

## Areas

- [Dependencies](./dependencies.md) — Next.js/React/Tailwind/ESLint
  upgrades, npm audit remediation
- [Authentication](./authentication.md) — server-side authorization,
  session handling
- [Architecture](./architecture.md) — findings about how the app is
  actually structured, independent of any single fix
- [Routing & Tab State](./routing.md) — client-side page/tab management
  replaced with real Next.js routes, Zustand-backed tabs, and per-page
  state preservation

## Timeline

| Date | Area | Summary |
|---|---|---|
| Aug 2026 | Dependencies | Next 14→16, React 18→19 |
| Aug 2026 | Dependencies | Tailwind 3→4 |
| Aug 2026 | Dependencies | ESLint 8→9 (flat config) |
| Aug 2026 | Dependencies | npm audit: 24 → 0 vulnerabilities |
| Aug 2026 | Architecture | No server-side routing/data access found |
| Aug 2026 | Authentication | token-based authentication with proxy.ts file |
| Sep 2026 | Routing | Users module: real routes replace client-side tab state |
| Sep 2026 | Routing | Create User Form/View split; per-tab state preservation via Zustand |
| Sep 2026 | Architecture | Shared CRUD layer (form/buttons/print/view) built and applied to Create User; pattern for remaining ~70 modules |
| Sep 2026 | Architecture | react-xlsx-wrapper replaced with exceljs for print/export |
| Sep 2026 | Architecture | Decision: migrate MongoDB → PostgreSQL (Prisma) |
| Sep 2026 | Architecture | Per-user permissions moved to PostgreSQL: `User` → `UserPermission` → `PermissionItem`, sparse and session-scoped |
| Sep 2026 | Architecture | Decision: user CRUD through API routes with a shared `authorize()` check, not server actions |
| Sep 2026 | Architecture | Numeric data handling: one Zod schema shared by client and server; `hydrateRecord` and the schema are the only conversion points |