import { MissingEnvVarError } from "@/core/errors/missing-env-var-error";

/**
 * Essas variáveis são substituídas pelo valor literal durante o build. Esses
 * valores não podem ser alterados on-fly, e precisam ter o prefixo
 * `NEXT_PUBLIC_`.
 *
 * Essa constante não pode utilizar a função utilitária `getEnvVarOrThrow` para
 * obter as variáveis de ambiente pois, como são substituídos no build, a buildtool
 * não consegue descobrir dinâmicamente qual variável está sendo buscada no `process.env`.
 */
export const PublicEnv = Object.freeze({
  appUrl: process.env.NEXT_PUBLIC_APPLICATION_URL!,
  appName: process.env.NEXT_PUBLIC_APPLICATION_NAME!,
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL!,
});

if (!PublicEnv.appUrl)
  throw new MissingEnvVarError("NEXT_PUBLIC_APPLICATION_URL");

if (!PublicEnv.appName)
  throw new MissingEnvVarError("NEXT_PUBLIC_APPLICATION_NAME");

if (!PublicEnv.serverUrl)
  throw new MissingEnvVarError("NEXT_PUBLIC_SERVER_URL");
