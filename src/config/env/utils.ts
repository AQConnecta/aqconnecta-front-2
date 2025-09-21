import { MissingEnvVarError } from "@/core/errors/missing-env-var-error";

export function getEnvVarOrThrow<T extends string>(variable: string): T {
  const envVar = process.env[variable] as T | undefined;
  if (!envVar) throw new MissingEnvVarError(variable);
  return envVar;
}
