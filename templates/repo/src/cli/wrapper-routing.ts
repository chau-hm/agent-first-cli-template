const GLOBAL_OPTIONS_WITH_VALUES = new Set(["--artifact-dir", "--format"]);

export function preserveGlobalOptions(args: string[], routedArgs: string[]) {
  const globals: string[] = [];
  const commandArgs: string[] = [];

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (GLOBAL_OPTIONS_WITH_VALUES.has(arg)) {
      globals.push(arg, args[index + 1] ?? "");
      index += 1;
    } else {
      commandArgs.push(arg);
    }
  }

  return [...globals, ...routedArgs, ...commandArgs];
}
