# __APP_TITLE__ PRD

## Product Intent

__DESCRIPTION__

The app is agent-first: Telegram/OpenClaw chat is the main user surface, and the CLI is the deterministic local backend.

## Primary Users

- The owner using Telegram/OpenClaw natural language.
- The local agent translating chat requests into CLI commands.
- A developer maintaining deterministic domain behavior and CI proof.

## Core Workflows

1. User writes `/__COMMAND__ <natural-language request>`.
2. Agent calls the CLI with JSON output.
3. CLI returns draft, saved result, candidate list, or clarification data.
4. Agent replies with a short human summary and stable IDs.

## MVP Requirements

- Stable non-interactive CLI.
- `--format json` for agent use.
- Machine-readable capabilities and typed JSON errors.
- Mutation metadata, true zero-write dry-run, and optional compact run receipts.
- Health command.
- Chat intake commands:
  - `chat parse`
  - `chat confirm`
  - `chat items`
  - `chat mutate`
- Deterministic parser behavior for common requests.
- Ambiguous mutation protection.
- Local-first storage.
- CI/preflight baseline.
- Wrapper global-option preservation and deploy/ship verification.

## Non-Goals

- Web dashboard.
- Cloud sync.
- Provider-dependent correctness.
- Hidden interactive prompts inside command mode.

## Success Criteria

- README starts with `/__COMMAND__ ...` examples.
- CLI commands can be called directly and from OpenClaw.
- Chat intake behavior is tested.
- CI runs build, typecheck, and tests.
