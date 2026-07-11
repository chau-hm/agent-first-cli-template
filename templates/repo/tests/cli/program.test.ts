import { mkdtemp, readdir, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
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
    const output = await runCli(["--format", "json", "health"]);
    expect(JSON.parse(output)).toEqual({ ok: true, name: "__APP_NAME__" });
  });

  it("publishes machine-readable capabilities", async () => {
    const parsed = JSON.parse(await runCli(["capabilities", "--format", "json"]));
    expect(parsed.commands["chat confirm"]).toMatchObject({ mutation: true, dryRun: true, artifacts: true });
    expect(parsed.contracts.typedJsonErrors).toBe(true);
    expect(parsed.contracts.richMessages).toBe(true);
  });

  it("prints chat parse JSON draft", async () => {
    const output = await runCli(["chat", "parse", "add", "sample", "--format", "json"]);
    const parsed = JSON.parse(output);
    expect(parsed.kind).toBe("draft");
    expect(parsed.needsConfirmation).toBe(true);
    expect(parsed.richMessage).toMatchObject({
      schemaVersion: 1,
      channel: "telegram",
      title: "Draft ready",
      presentation: {
        title: "Draft ready",
        tone: "info",
        blocks: expect.arrayContaining([
          expect.objectContaining({ type: "text" }),
          expect.objectContaining({ type: "section" })
        ])
      },
      blocks: expect.arrayContaining([
        expect.objectContaining({ type: "section" }),
        expect.objectContaining({ type: "fields" })
      ])
    });
  });

  it("prints rich-json with Telegram message metadata", async () => {
    const output = await runCli(["chat", "parse", "add", "sample", "--format", "rich-json"]);
    const parsed = JSON.parse(output);
    expect(parsed).toMatchObject({
      ok: true,
      data: { kind: "draft" },
      richMessage: {
        schemaVersion: 1,
        channel: "telegram",
        title: "__APP_TITLE__",
        presentation: {
          title: "__APP_TITLE__",
          tone: "info",
          blocks: expect.arrayContaining([
            expect.objectContaining({ type: "text" })
          ])
        },
        blocks: expect.arrayContaining([
          expect.objectContaining({ type: "section" })
        ])
      }
    });
  });

  it("returns a zero-side-effect dry-run with planned operations and derived-state guidance", async () => {
    const parsed = JSON.parse(await runCli([
      "chat", "confirm", "--draft-json", "{\"name\":\"sample\"}", "--dry-run", "--format", "json"
    ]));
    expect(parsed).toMatchObject({
      ok: true,
      kind: "dry-run",
      sideEffects: [],
      scope: ["entity"],
      warnings: []
    });
    expect(parsed.plannedOperations).toHaveLength(1);
    expect(parsed.derivedStateImpact.guidance).toBeTruthy();
  });

  it("writes compact receipts for mutation success, dry-runs, and typed errors", async () => {
    const artifactDir = await mkdtemp(path.join(os.tmpdir(), "__APP_NAME__-artifacts-"));
    const success = JSON.parse(await runCli([
      "--artifact-dir", artifactDir, "chat", "confirm", "--draft-json", "{}", "--format", "json"
    ]));
    const dryRun = JSON.parse(await runCli([
      "--artifact-dir", artifactDir, "chat", "confirm", "--draft-json", "{}", "--dry-run", "--format", "json"
    ]));
    const error = JSON.parse(await runCli([
      "chat", "confirm", "--draft-json", "{", "--artifact-dir", artifactDir, "--format", "json"
    ]));

    expect(success.artifactPath).toBeTruthy();
    expect(dryRun.artifactPath).toBeTruthy();
    expect(error).toMatchObject({
      ok: false,
      error: { code: "VALIDATION_FAILED" },
      scope: [],
      sideEffects: [],
      warnings: []
    });
    const receipts = await readdir(artifactDir);
    expect(receipts).toHaveLength(3);
    const contents = await Promise.all(receipts.map(async (file) => JSON.parse(await readFile(path.join(artifactDir, file), "utf8"))));
    expect(contents.map((receipt) => receipt.outcome).sort()).toEqual(["dry-run", "error", "success"]);
  });

  it("does not create artifact noise for read-only commands", async () => {
    const artifactDir = path.join(await mkdtemp(path.join(os.tmpdir(), "__APP_NAME__-read-only-")), "receipts");
    await runCli(["--artifact-dir", artifactDir, "health", "--format", "json"]);
    await expect(readdir(artifactDir)).rejects.toThrow();
  });
});
