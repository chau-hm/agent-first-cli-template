export type MutationMetadata = {
  scope: string[];
  sideEffects: string[];
  warnings: string[];
};

export type PlannedOperation = {
  operation: string;
  target: string;
};

export type MutationResult = MutationMetadata & {
  ok: true;
  kind: "saved" | "dry-run";
  id?: string;
  plannedOperations: PlannedOperation[];
  derivedStateImpact: Record<string, unknown>;
  artifactPath?: string;
};

export const capabilities = {
  schemaVersion: 1,
  commands: {
    health: { mutation: false, dryRun: false },
    capabilities: { mutation: false, dryRun: false },
    "chat parse": { mutation: false, dryRun: false },
    "chat items": { mutation: false, dryRun: false },
    "chat mutate": { mutation: false, dryRun: false },
    "chat confirm": { mutation: true, dryRun: true, artifacts: true }
  },
  contracts: {
    typedJsonErrors: true,
    richMessages: true,
    mutationMetadata: ["scope", "sideEffects", "warnings"],
    dryRun: ["plannedOperations", "derivedStateImpact", "zeroWrite"],
    optionalMutationArtifacts: true
  }
} as const;
