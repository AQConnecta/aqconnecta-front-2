import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import type { Candidatura } from "@/core/types/value-objects/candidatura";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type FindUserEducationResponse = BasicServerResponse<
  Candidatura[],
  | HttpStatusCode.Ok
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.NoContent
  | HttpStatusCode.InternalServerError
>;

export type FindUserEducationArgs = {
  userId: Usuario["id"];
};

export async function findUserEducation({ userId }: FindUserEducationArgs) {
  try {
    const path = mountPath(`listar/${userId}`);
    const response = await axios.get<FindUserEducationResponse>(path);
    return response.data;
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
