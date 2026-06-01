import { Command } from "commander";
import { parseChatAdd, parseChatItems, parseChatMutation } from "../domain/chat-intake.js";
import { formatJson, formatText, type OutputFormat } from "./render.js";

type GlobalOptions = {
  format?: OutputFormat;
};

function output(value: unknown, format: OutputFormat = "text") {
  const rendered = format === "json" ? formatJson(value) : formatText(value);
  process.stdout.write(rendered + "\n");
}

export function createProgram() {
  const program = new Command();

  program
    .name("__APP_NAME__")
    .description("__DESCRIPTION__")
    .version("0.1.0");

  program
    .command("health")
    .description("Check that the CLI is available")
    .option("--format <format>", "Output format: text or json", "text")
    .action((options: GlobalOptions) => {
      output({ ok: true, name: "__APP_NAME__" }, options.format);
    });

  const chat = program.command("chat").description("Natural-language chat intake commands");

  chat
    .command("parse")
    .description("Parse natural-language add text into a non-mutating draft")
    .argument("<text...>", "Natural-language request")
    .option("--format <format>", "Output format: text or json", "text")
    .action((parts: string[], options: GlobalOptions) => {
      output(parseChatAdd(parts.join(" ")), options.format);
    });

  chat
    .command("confirm")
    .description("Confirm a parsed draft JSON and save it")
    .requiredOption("--draft-json <json>", "Draft JSON returned by chat parse")
    .option("--format <format>", "Output format: text or json", "text")
    .action((options: GlobalOptions & { draftJson: string }) => {
      const draft = JSON.parse(options.draftJson) as unknown;
      output({ kind: "saved", id: "ent_template", draft }, options.format);
    });

  chat
    .command("items")
    .description("Parse natural-language list/search text")
    .argument("<text...>", "Natural-language request")
    .option("--format <format>", "Output format: text or json", "text")
    .action((parts: string[], options: GlobalOptions) => {
      output(parseChatItems(parts.join(" ")), options.format);
    });

  chat
    .command("mutate")
    .description("Parse natural-language edit/delete/restore text")
    .argument("<text...>", "Natural-language request")
    .option("--format <format>", "Output format: text or json", "text")
    .action((parts: string[], options: GlobalOptions) => {
      output(parseChatMutation(parts.join(" ")), options.format);
    });

  return program;
}

