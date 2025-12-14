import { APIRequestError } from "@/core/errors/api-request-error";
import { axios } from "@/libs/axios";
import { useAuth } from "@/stores/auth";
import { mountPath } from ".";

export async function logout() {
  try {
    await axios.post(mountPath("logout"));
    useAuth.getState().removeAuth();
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
