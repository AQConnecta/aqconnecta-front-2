import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type DeleteOwnExperienceResponse = BasicServerResponse<
  never,
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.Forbidden
  | HttpStatusCode.NotFound
  | HttpStatusCode.Ok
  | HttpStatusCode.InternalServerError
>;

export type DeleteOwnExperienceArgs = {
  experienceId: string;
};

export async function deleteOwnExperience({
  experienceId,
}: DeleteOwnExperienceArgs) {
  try {
    const endpoint = mountPath(`deletar/${experienceId}`);
    return await axios.delete<DeleteOwnExperienceResponse>(endpoint);
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
