# AGENTS.md

This is an agent-first CLI app. Treat Telegram/OpenClaw chat intake as the primary product surface and the CLI as the deterministic backend.

## Working Rules

- Read the vault docs before implementation: `PRD.md`, `Architecture.md`, `SDD_TDD_Workflow.md`, `Decisions.md`, and `TODO.md`.
- Work in small spec slices with acceptance criteria.
- Keep domain logic separate from CLI/chat/provider adapters.
- Do not rely on LLM, OCR, Telegram, or live providers for core correctness.
- Make commands non-interactive and deterministic.
- JSON output is for agents; human output should be concise.
- Keep `capabilities` machine-readable and update it with command contracts.
- Mutation results and typed errors declare `scope`, `sideEffects`, and `warnings`.
- Dry-run must perform zero writes and report `plannedOperations` plus derived-state impact.
- `--artifact-dir` receipts are for mutation outcomes only; read-only commands stay quiet.
- OpenClaw wrappers must preserve global CLI options while routing.
- Ambiguous mutation must not mutate. Return candidates or ask for clarification.
- Use draft/confirm for low-confidence natural language, OCR, receipt, or destructive flows.
- Run `./scripts/preflight.sh` before finishing.
- Treat deploy/ship as a separate closeout: verify repo-managed and installed skills match, then run post-deploy preflight.
