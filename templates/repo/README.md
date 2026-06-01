# __APP_TITLE__

__DESCRIPTION__

This is an agent-first CLI app: Telegram/OpenClaw chat is the main user surface, and the CLI is the deterministic local backend.

## Purpose

- Keep user data local-first.
- Expose stable non-interactive CLI commands for agents and automation.
- Treat chat intake as a first-class product feature.
- Keep domain logic pure and covered by tests.
- Keep CI/preflight as the baseline gate.

## Telegram Slash Command Examples

Use `/__COMMAND__` in Telegram or any OpenClaw chat surface.

```text
/__COMMAND__ add <thing in natural language>
/__COMMAND__ list everything
/__COMMAND__ find <target>
/__COMMAND__ edit <target> set <field>
/__COMMAND__ delete <exact-id-or-target>
/__COMMAND__ restore <exact-id-or-target>
```

Expected behavior:

- Natural-language add requests return a draft unless the request explicitly asks to save and the draft is unambiguous.
- List/search requests are read-only.
- Edit/delete/restore only mutate when the target resolves to exactly one entity.
- Ambiguous targets return candidates and perform no mutation.
- Replies include stable IDs for future edits, deletes, restores, attachments, and exports.

## CLI Commands

Install and verify:

```bash
npm install
./scripts/preflight.sh
```

Backend examples:

```bash
node dist/cli/index.js health
node dist/cli/index.js health --format json
node dist/cli/index.js chat parse "add <thing in natural language>" --format json
node dist/cli/index.js chat confirm --draft-json '<draft-json>' --format json
node dist/cli/index.js chat items "find <target>" --format json
node dist/cli/index.js chat mutate "edit <target> set <field>" --format json
```

## Data Storage

Default runtime data should live under:

```text
__DEFAULT_DATA_DIR__/
```

Keep runtime data, attachments, exports, and provider cache out of git.

## Development

```bash
npm run build
npm run typecheck
npm test
npm run ci
```

CI runs `npm run ci`; keep this aligned with `./scripts/preflight.sh`.

## Docs

Project planning docs should live beside the product notes in the vault:

- `PRD.md`
- `Architecture.md`
- `SDD_TDD_Workflow.md`
- `Decisions.md`
- `TODO.md`
- `Research.md`

