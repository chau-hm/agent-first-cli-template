import { describe, expect, it, vi } from "vitest";
import { createProgram } from "../../src/cli/program.js";

async function runCli(args: string[]) {
  let output = "";
  const write = vi.spyOn(process.stdout, "write").mockImplementation((chunk: string | Uint8Array) => {
    output += String(chunk);
    return true;
  });

  try {
    await createProgram().exitOverride().parseAsync(["node", "__APP_NAME__", ...args]);
  } finally {
    write.mockRestore();
  }

  return output.trim();
}

describe("program", () => {
  it("prints health JSON", async () => {
    const output = await runCli(["health", "--format", "json"]);
    expect(JSON.parse(output)).toEqual({ ok: true, name: "__APP_NAME__" });
  });

  it("prints chat parse JSON draft", async () => {
    const output = await runCli(["chat", "parse", "add", "sample", "--format", "json"]);
    const parsed = JSON.parse(output);
    expect(parsed.kind).toBe("draft");
    expect(parsed.needsConfirmation).toBe(true);
  });
});

