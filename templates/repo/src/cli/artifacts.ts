import { mkdir, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";

type Receipt = {
  command: string;
  outcome: "success" | "dry-run" | "error";
  scope: string[];
  sideEffects: string[];
  warnings: string[];
  errorCode?: string;
};

export async function writeRunReceipt(artifactDir: string | undefined, receipt: Receipt) {
  if (!artifactDir) return undefined;

  await mkdir(artifactDir, { recursive: true });
  const fileName = `run-${Date.now()}-${randomUUID()}.json`;
  const artifactPath = path.resolve(artifactDir, fileName);
  await writeFile(artifactPath, JSON.stringify(receipt) + "\n", "utf8");
  return artifactPath;
}
