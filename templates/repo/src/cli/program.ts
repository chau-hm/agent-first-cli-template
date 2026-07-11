import { Command } from "commander";
import { parseChatAdd, parseChatItems, parseChatMutation } from "../domain/chat-intake.js";
import { capabilities, type MutationResult } from "../domain/contracts.js";
import { validationFailed, type AppError } from "../domain/errors.js";
import { writeRunReceipt } from "./artifacts.js";
import { formatJson, formatText, richMessage, type OutputFormat } from "./render.js";

type GlobalOptions = {
  format?: OutputFormat;
  artifactDir?: string;
};

function output(value: unknown, format: OutputFormat = "text") {
  const rendered = format === "json"
    ? formatJson(value)
    : format === "rich-json"
      ? formatJson({
        ok: !(typeof value === "object" && value !== null && "ok" in value && (value as { ok?: unknown }).ok === false),
        data: value,
        richMessage: richMessage("__APP_TITLE__", formatText(value))
      })
      : formatText(value);
  process.stdout.write(rendered + "\n");
}

export function createProgram() {
  const program = new Command();

  program
    .name("__APP_NAME__")
    .description("__DESCRIPTION__")
    .version("0.1.0")
    .option("--format <format>", "Output format: text, json, or rich-json", "text")
    .option("--artifact-dir <dir>", "Write compact receipts for mutation outcomes");

  const globals = (command: Command) => command.optsWithGlobals<GlobalOptions>();

  program
    .command("health")
    .description("Check that the CLI is available")
    .action((_options, command) => {
      output({ ok: true, name: "__APP_NAME__" }, globals(command).format);
    });

  program
    .command("capabilities")
    .description("Print machine-readable command and contract capabilities")
    .action((_options, command) => {
      output(capabilities, globals(command).format);
    });

  const chat = program.command("chat").description("Natural-language chat intake commands");

  chat
    .command("parse")
    .description("Parse natural-language add text into a non-mutating draft")
    .argument("<text...>", "Natural-language request")
    .action((parts: string[], _options, command) => {
      const result = parseChatAdd(parts.join(" "));
      output({
        ...result,
        richMessage: richMessage("Draft ready", formatText(result), [
          { label: "Command", value: "chat confirm" },
          { label: "Needs confirmation", value: String(result.needsConfirmation) }
        ])
      }, globals(command).format);
    });

  chat
    .command("confirm")
    .description("Confirm a parsed draft JSON and save it")
    .requiredOption("--draft-json <json>", "Draft JSON returned by chat parse")
    .option("--dry-run", "Preview planned writes without changing state")
    .action(async (options: { draftJson: string; dryRun?: boolean }, command) => {
      const globalOptions = globals(command);
      let result: MutationResult | AppError;
      try {
        JSON.parse(options.draftJson) as unknown;
        result = {
          ok: true,
          kind: options.dryRun ? "dry-run" : "saved",
          ...(options.dryRun ? {} : { id: "ent_template" }),
          plannedOperations: [{ operation: "create", target: "entity" }],
          derivedStateImpact: { guidance: "Report domain totals, balances, or indexes affected by this mutation." },
          scope: ["entity"],
          sideEffects: options.dryRun ? [] : ["local-storage-write"],
          warnings: []
        };
      } catch {
        result = validationFailed("--draft-json must contain valid JSON");
      }

      const outcome = result.ok ? (result.kind === "dry-run" ? "dry-run" : "success") : "error";
      const artifactPath = await writeRunReceipt(globalOptions.artifactDir, {
        command: "chat confirm",
        outcome,
        scope: result.scope,
        sideEffects: result.sideEffects,
        warnings: result.warnings,
        ...(!result.ok ? { errorCode: result.error.code } : {})
      });
      output({ ...result, ...(artifactPath ? { artifactPath } : {}) }, globalOptions.format);
    });

  chat
    .command("items")
    .description("Parse natural-language list/search text")
    .argument("<text...>", "Natural-language request")
    .action((parts: string[], _options, command) => {
      output(parseChatItems(parts.join(" ")), globals(command).format);
    });

  chat
    .command("mutate")
    .description("Parse natural-language edit/delete/restore text")
    .argument("<text...>", "Natural-language request")
    .action((parts: string[], _options, command) => {
      output(parseChatMutation(parts.join(" ")), globals(command).format);
    });

  return program;
}
