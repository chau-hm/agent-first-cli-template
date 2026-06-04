import { describe, expect, it } from "vitest";
import { preserveGlobalOptions } from "../../src/cli/wrapper-routing.js";

describe("wrapper routing", () => {
  it("preserves global options when routing chat text", () => {
    expect(preserveGlobalOptions(
      ["find", "sample", "--format", "json", "--artifact-dir", "/tmp/runs"],
      ["chat", "items"]
    )).toEqual([
      "--format", "json", "--artifact-dir", "/tmp/runs",
      "chat", "items", "find", "sample"
    ]);
  });
});
