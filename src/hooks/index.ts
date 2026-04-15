import { HttpStatusCode } from "axios";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";

export const checkShouldRetry = (retries: number, error: APIRequestError) => {
  const notToRetryStatusCodes = [
    HttpStatusCode.Unauthorized,
    HttpStatusCode.Forbidden,
  ];

  const retryingIsUseless = notToRetryStatusCodes.includes(error.status);
  const hasAlreadyTriedTooMuch = retries > 3;

  return !(retryingIsUseless || hasAlreadyTriedTooMuch);
};

export const ensureAuthUser = (
  authUser: Usuario | null | undefined,
): Usuario => {
  if (authUser) return authUser;

  throw new Error(
    "Não é possível prosseguir com a requisição sem estar autenticado.",
  );
};
