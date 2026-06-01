export type OutputFormat = "text" | "json";

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

