import { APIRequestError } from "@/core/errors/api-request-error";
import { axios } from "@/libs/axios";
import { queryClient } from "@/libs/react-query";
import { useAuth } from "@/stores/auth";
import { mountPath } from ".";

export async function logout() {
  try {
    await axios.post(mountPath("logout"));
    useAuth.getState().removeAuth();
    queryClient.clear();
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
