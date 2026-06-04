# Agent-First CLI Template

Reusable starter for local-first apps whose primary surface is an agent, Telegram, or OpenClaw chat command, with a deterministic CLI as the backend.

This template is distilled from the expense tracker and inventory apps. It is intentionally a scaffold and operating contract, not a shared framework. Copy it, rename it, and let the third real app teach us what deserves extraction into a library.

## Use It

Preview:

```bash
scripts/create-agent-first-cli-app --help
```

Create a new app repo and matching vault docs:

```bash
scripts/create-agent-first-cli-app \
  --name warranty-box \
  --title "Warranty Box" \
  --command warranty \
  --description "Track warranty-heavy personal items through Telegram/OpenClaw." \
  --repo-dir ../warranty-box \
  --vault-dir "/Users/openclaw/Desktop/VirtualBuddyShared/Vault/side projects/warranty box"
```

Then:

```bash
cd ../warranty-box
npm install
./scripts/preflight.sh
```

## What It Generates

- TypeScript/Node CLI using `commander`.
- `src/domain`, `src/application`, `src/cli`, and `src/adapters` boundaries.
- Stable `health`, `capabilities`, `chat parse`, `chat confirm`, `chat items`, and `chat mutate` command skeletons.
- Machine-readable capabilities, typed JSON errors, mutation metadata, true dry-run, and optional run receipts.
- JSON output contract for agents and short text output for humans.
- Draft/confirm and ambiguous mutation placeholders.
- Tests for health, CLI JSON output, and chat intake contracts.
- `scripts/preflight.sh`, `npm run ci`, and GitHub Actions CI.
- README that shows `/command natural language` usage before raw CLI commands.
- Vault docs: `PRD.md`, `Architecture.md`, `SDD_TDD_Workflow.md`, `Decisions.md`, `TODO.md`, and `Research.md`.

## Template Contract

Every generated app starts with these assumptions:

- Chat intake is a first-class product surface.
- CLI commands are deterministic, non-interactive backend operations.
- Domain logic stays pure and testable.
- Mutations must be exact, confirmed, or guarded by candidate lists.
- Mutation responses declare `scope`, `sideEffects`, and `warnings`.
- Dry-run performs zero writes and reports `plannedOperations` plus derived-state impact.
- `--artifact-dir` writes compact receipts for mutation outcomes, never read-only noise.
- Wrappers preserve global options when routing commands.
- Core correctness must not depend on LLM, OCR, Telegram, live providers, or hidden prompts.
- Local preflight and CI are mandatory baseline gates.
- Deploy/ship closeout separately verifies installed skill parity and post-deploy preflight.
- Runtime data stays local and out of git.

## When Not To Use It

Do not use this template for:

- One-off scripts without ongoing product behavior.
- Web-first apps where CLI/chat is only an admin fallback.
- Apps that cannot be tested locally without a live provider.

## Files

```text
templates/repo/   Repository scaffold copied into the new app.
templates/vault/  Project planning docs copied into the vault.
scripts/          Generator and validation helpers.
docs/             Template design notes.
```

## Validate The Template

```bash
scripts/validate-template
```
