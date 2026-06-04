# __APP_TITLE__ Decisions

## YYYY-MM-DD: Start Agent-First CLI

Decision: Build __APP_TITLE__ as an agent-first CLI app with Telegram/OpenClaw chat as the primary surface.

Reason: The app should be reliable through local automation, easy for an agent to call, and testable without provider dependencies.

Impact:

- CLI must be deterministic and non-interactive.
- Chat intake is first-class.
- CI/preflight is mandatory.
- Runtime data stays local and out of git.
- Agent-visible capabilities and mutation contracts stay machine-readable.
- Dry-run is zero-write; optional receipts cover mutation outcomes without read-only noise.
- Deploy/ship closeout verifies installed skill parity and post-deploy behavior separately.
