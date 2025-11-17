import type { InternalAxiosRequestConfig } from "axios";
import authQueries from "@/api/auth-queries";
import type { LoginResponse } from "@/api/auth-queries/login";
import { APIRequestError } from "@/core/errors/api-request-error";
import { useAuth } from "@/stores/auth";
import { axios } from ".";

let refreshPromise: Promise<LoginResponse> | undefined;

async function cachedRefreshAccessToken() {
  if (!refreshPromise) {
    refreshPromise = authQueries.refresh().finally(() => {
      refreshPromise = undefined;
    });
  }

  return await refreshPromise;
}

function trySetAuthState(response: LoginResponse) {
  const token = response.data?.token;
  const user = response.data?.usuario;

  if (!token || !user) {
    throw new Error("Server returned an unexpected refresh body.");
  }

  useAuth.getState().setAuth(token, user);
  return { token, user };
}

export async function refreshAndRetryFailedRequest(
  config: InternalAxiosRequestConfig,
  error?: Error,
) {
  try {
    const response = await cachedRefreshAccessToken();
    if (response.data) {
      const { token } = trySetAuthState(response);
      config.headers.setAuthorization(`Bearer ${token}`);
      const newResponse = await axios.request(config);
      return newResponse;
    }
  } catch (e) {
    useAuth.getState().removeAuth();
    if (e instanceof Error) {
      console.error("Access token refresh failed:", e.message);
    }

    if (error) return Promise.reject(error);
    return Promise.reject(e);
  }
}

export async function tryToPrefetchAccessToken() {
  try {
    const response = await cachedRefreshAccessToken();
    trySetAuthState(response);
  } catch (e) {
    if (e instanceof APIRequestError) console.error(e.message);
  }
}
