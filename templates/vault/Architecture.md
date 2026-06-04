# __APP_TITLE__ Architecture

## Direction

The app is a TypeScript/Node CLI designed for OpenClaw or Telegram-first use. Chat is the primary interaction layer; CLI commands are the deterministic backend.

## Stack

- TypeScript on Node.js.
- Commander CLI.
- Zod for validation.
- Vitest tests.
- Local-first storage adapter.
- JSON output for agents.

## Boundaries

- `domain/`: pure rules, validation, lifecycle calculations.
- `application/`: use cases and repository coordination.
- `cli/`: command parsing, output format, exit codes.
- `adapters/`: filesystem, database, provider, and future platform integrations.

## Required CLI Shape

```bash
__BIN_NAME__ health --format json
__BIN_NAME__ capabilities --format json
__BIN_NAME__ chat parse "<natural-language add request>" --format json
__BIN_NAME__ chat confirm --draft-json '<json>' --format json
__BIN_NAME__ chat items "<natural-language list/search>" --format json
__BIN_NAME__ chat mutate "<natural-language edit/delete/restore>" --format json
```

## OpenClaw Integration

The OpenClaw skill or command wrapper should translate `/__COMMAND__ ...` into CLI calls. Platform routing must not leak into domain/application logic. Wrappers preserve global options such as `--format` and `--artifact-dir` while routing.

## Mutation Contract

Mutation success, dry-run, and typed errors declare `scope`, `sideEffects`, and `warnings`. Dry-run is a true zero-write preview with `plannedOperations` and `derivedStateImpact`. Optional `--artifact-dir` receipts cover mutation outcomes only.

## Error Shape

```json
{
  "ok": false,
  "error": {
    "code": "AMBIGUOUS_TARGET",
    "message": "Multiple matching records found.",
    "candidates": []
  },
  "scope": [],
  "sideEffects": [],
  "warnings": []
}
```

## Exit Codes

- `0`: success.
- `1`: validation or business-rule failure.
- `2`: ambiguous target, no mutation performed.
- `3`: missing file or unreadable local resource.
- `4`: provider/adapter failure.
- `5`: unexpected internal error.
