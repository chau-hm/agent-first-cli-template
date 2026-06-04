export type AppErrorCode =
  | "VALIDATION_FAILED"
  | "AMBIGUOUS_TARGET"
  | "NOT_FOUND"
  | "PROVIDER_FAILED"
  | "INTERNAL_ERROR";

export type AppError = {
  ok: false;
  error: {
    code: AppErrorCode;
    message: string;
    candidates?: unknown[];
  };
  scope: string[];
  sideEffects: string[];
  warnings: string[];
  artifactPath?: string;
};

export function ambiguousTarget(message: string, candidates: unknown[] = []): AppError {
  return {
    ok: false,
    error: {
      code: "AMBIGUOUS_TARGET",
      message,
      candidates
    },
    scope: [],
    sideEffects: [],
    warnings: []
  };
}

export function validationFailed(message: string): AppError {
  return {
    ok: false,
    error: { code: "VALIDATION_FAILED", message },
    scope: [],
    sideEffects: [],
    warnings: []
  };
}
