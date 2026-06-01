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
};

export function ambiguousTarget(message: string, candidates: unknown[] = []): AppError {
  return {
    ok: false,
    error: {
      code: "AMBIGUOUS_TARGET",
      message,
      candidates
    }
  };
}

