import { APIRequestError } from "@/core/errors/api-request-error";
import { axios } from "@/libs/axios";
import { mountPath } from ".";
import type { LoginResponse } from "./login";

export async function refresh(): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(mountPath("refresh"));
    return response.data;
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
