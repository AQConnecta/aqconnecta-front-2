export class MissingEnvVarError extends Error {
  public constructor(variable: string) {
    super(`Environment variable ${variable} is required but haven't been set.`);
  }
}
