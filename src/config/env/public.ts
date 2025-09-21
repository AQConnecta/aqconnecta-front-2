import { getEnvVarOrThrow } from "./utils";

/**
 * Essas variáveis são substituídas pelo valor literal durante o build. Esses
 * valores não podem ser alterados on-fly, e precisam ter o prefixo
 * `NEXT_PUBLIC_`.
 */
export const PublicEnv = Object.freeze({
  appUrl: getEnvVarOrThrow("NEXT_PUBLIC_APPLICATION_URL"),
  appName: getEnvVarOrThrow("NEXT_PUBLIC_APPLICATION_NAME"),
});
