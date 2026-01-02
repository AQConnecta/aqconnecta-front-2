import { APIRequestError } from "@/core/errors/api-request-error";
import type { Curriculo } from "@/core/types/value-objects/curriculo";
import { axios } from "@/libs/axios";
import { mountPath } from ".";

export async function getResumes() {
  try {
    const response = await axios.get(mountPath("curriculos"));
    const resumes = response.data as Curriculo[];
    return resumes;
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
