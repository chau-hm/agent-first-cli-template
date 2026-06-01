# SDD + TDD Workflow

## Rule

No implementation slice is complete until the behavior is specified, tested, implemented, documented, and covered by the local CI/preflight baseline.

Chat intake is a core product surface. Major workflows should define both deterministic CLI behavior and `/__COMMAND__ ...` natural-language behavior.

## Working Loop

1. Spec: define one behavior with inputs, outputs, state changes, edge cases, and deferrals.
2. Test: write or update domain/CLI/chat intake tests.
3. Implement: keep changes scoped to the slice.
4. Refactor: clean only after tests pass.
5. Document: update TODO, Decisions, and user docs.

## Definition Of Ready

- Clear user-facing behavior.
- Chat/OpenClaw entry behavior, or explicit deferral.
- Data/state impact.
- Acceptance criteria.
- Test cases or test outline.
- Known assumptions and open questions.

## Definition Of Done

- Spec slice exists.
- Tests were written before or alongside implementation.
- Local preflight passes.
- CI baseline covers the behavior or the gap is documented.
- Ambiguous mutations do not mutate.
- Domain correctness does not rely on LLM/OCR/live provider output.
- Docs/TODO/Decisions are updated.

## Required Proof

```bash
./scripts/preflight.sh
```

