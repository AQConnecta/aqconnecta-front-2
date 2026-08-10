import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import { axios } from "@/libs/axios";
import type { PresentedExperience } from "../types/presented-experience";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type ListUsersExperiencesResponse = BasicServerResponse<
  PresentedExperience[],
  | HttpStatusCode.Ok
  | HttpStatusCode.NotFound
  | HttpStatusCode.Forbidden
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.InternalServerError
>;

export type ListUsersExperiencesArgs = {
  userId: Usuario["id"];
};

export async function listUsersExperiences({
  userId,
}: ListUsersExperiencesArgs) {
  try {
    const path = mountPath(`/listar/${userId}`);
    const response = await axios.get<ListUsersExperiencesResponse>(path);
    return response.data;
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
