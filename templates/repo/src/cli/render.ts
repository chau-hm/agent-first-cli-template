export type OutputFormat = "text" | "json" | "rich-json";

export type RichMessage = {
  schemaVersion: 1;
  channel: "telegram";
  title: string;
  tone: "info" | "success" | "warning" | "danger";
  fallbackText: string;
  presentation: {
    title: string;
    tone: "info" | "success" | "warning" | "danger";
    blocks: Array<
      | { type: "text"; text: string }
      | { type: "section"; fields: Array<{ label: string; value: string }> }
    >;
  };
  blocks: Array<
    | { type: "section"; text: string }
    | { type: "fields"; fields: Array<{ label: string; value: string }> }
  >;
};

export function formatJson(value: unknown) {
  return JSON.stringify(value);
}

export function formatText(value: unknown) {
  if (typeof value === "object" && value !== null && "ok" in value) {
    return "OK";
  }
  if (typeof value === "object" && value !== null && "kind" in value) {
    return String((value as { kind: unknown }).kind);
  }
  return String(value);
}

export function richMessage(title: string, fallbackText: string, fields: Array<{ label: string; value: string }> = []): RichMessage {
  const htmlFallbackText = formatTelegramHtmlFallback(title, fallbackText, fields);
  return {
    schemaVersion: 1,
    channel: "telegram",
    title,
    tone: "info",
    fallbackText: htmlFallbackText,
    presentation: {
      title,
      tone: "info",
      blocks: [
        { type: "text", text: fallbackText },
        ...(fields.length > 0 ? [{ type: "section" as const, fields }] : [])
      ]
    },
    blocks: [
      { type: "section", text: fallbackText },
      ...(fields.length > 0 ? [{ type: "fields" as const, fields }] : [])
    ]
  };
}

function formatTelegramHtmlFallback(title: string, fallbackText: string, fields: Array<{ label: string; value: string }>): string {
  const lines = [`<b>${escapeTelegramHtml(title)}</b>`];
  if (fallbackText.trim().length > 0) {
    lines.push(escapeTelegramHtml(fallbackText));
  }
  for (const field of fields.slice(0, 8)) {
    if (field.label.trim().length === 0 || field.value.trim().length === 0) continue;
    lines.push(`<b>${escapeTelegramHtml(field.label)}:</b> ${escapeTelegramHtml(field.value)}`);
  }
  return lines.join("\n");
}

function escapeTelegramHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
