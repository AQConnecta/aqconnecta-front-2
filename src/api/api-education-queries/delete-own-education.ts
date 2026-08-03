import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type DeleteOwnEducationResponse = BasicServerResponse<
  never,
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.Forbidden
  | HttpStatusCode.Ok
  | HttpStatusCode.NotFound
  | HttpStatusCode.InternalServerError
>;

export type DeleteOwnEducationArgs = {
  idFormacaoAcademica: string;
};

export async function deleteOwnEducation({
  idFormacaoAcademica,
}: DeleteOwnEducationArgs) {
  try {
    const endpoint = mountPath(`deletar/${idFormacaoAcademica}`);
    return await axios.delete<DeleteOwnEducationResponse>(endpoint);
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
