import { describe, expect, it } from "vitest";
import { parseChatAdd, parseChatItems, parseChatMutation } from "../../src/domain/chat-intake.js";

describe("chat intake", () => {
  it("returns a non-mutating draft for add text", () => {
    const draft = parseChatAdd("add sample item");
    expect(draft.kind).toBe("draft");
    expect(draft.needsConfirmation).toBe(true);
    expect(draft.commandArgs).toContain("--name");
  });

  it("returns a read-only items request", () => {
    expect(parseChatItems("find sample")).toEqual({
      kind: "items",
      sourceText: "find sample",
      query: "find sample"
    });
  });

  it("marks mutation text as requiring target resolution", () => {
    const mutation = parseChatMutation("delete sample");
    expect(mutation.action).toBe("delete");
    expect(mutation.requiresResolution).toBe(true);
  });
});

