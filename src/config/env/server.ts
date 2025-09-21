import { getEnvVarOrThrow } from "./utils";

/**
 * Essas variáveis devem ser acessadas somente pelo lado do servidor.
 * Acessá-las pelo front-end ocasionará em **ERRO**, já que o `process.env`
 * não existe no navegador (client-side).
 */
export const ServerEnv = Object.freeze({
  appUrl: getEnvVarOrThrow("APPLICATION_URL"),
  appName: getEnvVarOrThrow("APPLICATION_NAME"),
  serverUrl: getEnvVarOrThrow("SERVER_URL"),
});
