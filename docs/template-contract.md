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
- Stable IDs for saved entities.
- Stable JSON error shape with machine-readable error codes.
- Ambiguous mutation returns candidates and performs no mutation.
- Draft/confirm flow for natural-language, OCR, receipt, or low-confidence ingestion.
- Soft delete where recovery/audit matters.
- CLI exit codes distinguish success, validation failure, ambiguous target, missing file, provider failure, and unexpected errors.

## Extraction Rule

Do not turn the template into a framework until the third app repeats the same code. Before that, prefer copyable scaffolds and tests over shared runtime abstractions.

