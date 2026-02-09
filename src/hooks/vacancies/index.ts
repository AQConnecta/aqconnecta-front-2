import { HttpStatusCode } from "axios";
import type { APIRequestError } from "@/core/errors/api-request-error";

export const checkShouldRetry = (retries: number, error: APIRequestError) => {
  const notToRetryStatusCodes = [
    HttpStatusCode.Unauthorized,
    HttpStatusCode.Forbidden,
  ];

  const retryingIsUseless = notToRetryStatusCodes.includes(error.status);
  const hasAlreadyTriedTooMuch = retries > 3;

  return !(retryingIsUseless || hasAlreadyTriedTooMuch);
};
