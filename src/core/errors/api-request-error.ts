import { AxiosError, HttpStatusCode } from "axios";
import type { BasicServerResponse } from "@/api/types/server-responses/basic";

export class APIRequestError extends Error {
  public constructor(
    public readonly message: string,
    public readonly status: number,
  ) {
    super(message);
  }

  /**
   * Verifies whether the axios error is a pure client-side error or it comes from the server.
   * @param error an AxiosError instance
   * @returns `true` if error came from axios; `false` if it came from API server
   */
  public static isPurelyAxiosError(error: AxiosError) {
    return !error.response;
  }

  public static isServerUnhandledException(error: AxiosError) {
    if (!error.response) return false;

    const data = error.response.data as object;
    return "timestamp" in data && "path" in data;
  }

  public static internalServerError() {
    return new APIRequestError(
      "Houve um problema com o nosso servidor, tente mais tarde.",
      HttpStatusCode.InternalServerError,
    );
  }

  /**
   * Handles an axios error by checking whether it's a axios-created error or
   * a server error. It also checks if it's an unhandled exception or an intentionally
   * thrown error.
   * @param error an error thrown by axios
   */
  public static prepareFromAxiosError(error: unknown) {
    console.log(error);

    if (!(error instanceof AxiosError)) {
      return APIRequestError.internalServerError();
    }

    if (
      APIRequestError.isPurelyAxiosError(error) ||
      APIRequestError.isServerUnhandledException(error)
    ) {
      return APIRequestError.internalServerError();
    }

    const data = error.response?.data as BasicServerResponse<never>;
    return new APIRequestError(data.message, data.status);
  }
}
