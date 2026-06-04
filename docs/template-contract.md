# Template Contract

This document captures the recurring shape shared by the expense tracker and inventory app.

## App Family

An agent-first CLI app is a local-first product where:

- Telegram/OpenClaw/chat is the primary user surface.
- A deterministic CLI is the stable backend.
- The CLI can be called directly by humans, scripts, CI, and the OpenClaw skill wrapper.
- Natural-language chat intake is part of the product contract, not an afterthought.

## Required Slices

Every app should start with these slices:

1. Health and baseline project setup.
2. First domain model and validation rule.
3. CRUD or main lifecycle vertical slice.
4. Chat intake: parse/draft, list/search, mutate with ambiguity protection.
5. Local storage adapter.
6. Agent/OpenClaw skill wrapper or command routing docs.
7. CI/preflight baseline.

## Required Contracts

- `--format json` or equivalent machine-readable output.
- A machine-readable `capabilities` command that advertises commands and supported contracts.
- Stable IDs for saved entities.
- Stable JSON error shape with machine-readable error codes.
- Mutation success, dry-run, and typed error responses include `scope`, `sideEffects`, and `warnings`.
- Every mutation supports a true zero-write dry-run where practical. Dry-run reports `plannedOperations`, empty `sideEffects`, and guidance or values for derived-state impact.
- Optional global `--artifact-dir <dir>` writes compact receipts for mutation success, dry-run, and typed errors. Read-only commands do not create receipts.
- OpenClaw/Telegram wrappers preserve global options while routing natural-language arguments.
- Ambiguous mutation returns candidates and performs no mutation.
- Draft/confirm flow for natural-language, OCR, receipt, or low-confidence ingestion.
- Soft delete where recovery/audit matters.
- CLI exit codes distinguish success, validation failure, ambiguous target, missing file, provider failure, and unexpected errors.

## Contract Test Baseline

Generated apps should keep executable tests for capabilities discovery, typed JSON errors, mutation metadata, dry-run zero-write behavior, planned operations, derived-state impact, mutation-only artifacts, and wrapper global-option preservation.

## Deploy And Ship Closeout

Implementation completion and deployment completion are separate states.

1. Run build, typecheck, tests, local CI/preflight, and `git diff --check`.
2. Deploy the repo-managed OpenClaw skill or wrapper to its installed workspace location.
3. Verify the installed skill matches the repo-managed source.
4. Run post-deploy preflight through the installed command path.
5. Commit only intended changes, push the current branch, and report commit/push results.

Restart the gateway only when routing/runtime loading requires it; do not restart by habit.

## Extraction Rule

Do not turn the template into a framework until the third app repeats the same code. Before that, prefer copyable scaffolds and tests over shared runtime abstractions.
