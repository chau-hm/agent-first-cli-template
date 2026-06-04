# __APP_TITLE__ TODO

## Phase 0: Bootstrap

- [ ] Create TypeScript CLI scaffold.
- [ ] Add health command.
- [ ] Add README with `/__COMMAND__ ...` examples before raw CLI examples.
- [ ] Add preflight script.
- [ ] Add GitHub Actions CI.

## Phase 1: First Domain Slice

- [ ] Define core entity/model.
- [ ] Add validation rules.
- [ ] Add domain tests.
- [ ] Add CLI output contract tests.
- [ ] Add machine-readable `capabilities`.
- [ ] Add typed JSON error and mutation metadata contracts.

## Phase 2: Persistence

- [ ] Add local storage adapter.
- [ ] Keep runtime data out of git.
- [ ] Add application tests with fake or temp storage.

## Phase 3: Chat Intake

- [ ] Add `chat parse` draft command.
- [ ] Add `chat confirm` save command.
- [ ] Add `chat items` list/search routing.
- [ ] Add `chat mutate` edit/delete/restore routing.
- [ ] Add ambiguity/candidate tests.

## Phase 4: OpenClaw Integration

- [ ] Add OpenClaw skill wrapper.
- [ ] Add Telegram-friendly response examples.
- [ ] Smoke test `/__COMMAND__ ...` routing.
- [ ] Test wrapper preservation of global options.

## Phase 5: Hardening

- [ ] Add JSON error contract tests.
- [ ] Add zero-write dry-run, planned operations, and derived-state impact tests.
- [ ] Add mutation receipt tests and prove read-only commands create no artifact noise.
- [ ] Add regression tests for destructive actions.
- [ ] Review docs against shared coding guideline.

## Phase 6: Deploy And Ship

- [ ] Deploy repo-managed skill/wrapper to the installed workspace location.
- [ ] Verify installed and repo-managed sources match.
- [ ] Run post-deploy preflight through the installed command path.
- [ ] Run `git diff --check`, commit intended changes, push current branch, and report results.
