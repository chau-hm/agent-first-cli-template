export type ChatDraft = {
  kind: "draft";
  sourceText: string;
  needsConfirmation: true;
  commandArgs: string[];
};

export type ChatItemsRequest = {
  kind: "items";
  sourceText: string;
  query: string | null;
};

export type ChatMutationRequest = {
  kind: "mutation";
  sourceText: string;
  action: "edit" | "delete" | "restore" | "unknown";
  target: string | null;
  requiresResolution: true;
};

export function parseChatAdd(sourceText: string): ChatDraft {
  return {
    kind: "draft",
    sourceText,
    needsConfirmation: true,
    commandArgs: ["entity", "add", "--name", sourceText]
  };
}

export function parseChatItems(sourceText: string): ChatItemsRequest {
  const query = sourceText.trim() || null;
  return {
    kind: "items",
    sourceText,
    query
  };
}

export function parseChatMutation(sourceText: string): ChatMutationRequest {
  const normalized = sourceText.toLowerCase();
  const action = normalized.includes("delete") || sourceText.includes("刪")
    ? "delete"
    : normalized.includes("restore") || sourceText.includes("還原")
      ? "restore"
      : normalized.includes("edit") || sourceText.includes("改")
        ? "edit"
        : "unknown";

  return {
    kind: "mutation",
    sourceText,
    action,
    target: sourceText.trim() || null,
    requiresResolution: true
  };
}

