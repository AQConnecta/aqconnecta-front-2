import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Competencia } from "@/core/types/competencia";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type DeleteOwnCompetencesResponse = BasicServerResponse<
  Competencia[],
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.Forbidden
  | HttpStatusCode.BadRequest
  | HttpStatusCode.Ok // usuário não tem competências
  | HttpStatusCode.Created // competências removidas c/ sucesso
  | HttpStatusCode.NotFound // not found tá substituindo o erro 500...
  | HttpStatusCode.InternalServerError
>;

export type DeleteOwnCompetencesArgs = {
  competenceIdsToDelete: string[];
};

export async function deleteOwnCompetences({
  competenceIdsToDelete,
}: DeleteOwnCompetencesArgs) {
  try {
    const endpoint = mountPath("/remover_relacao_usuario");
    return await axios.delete<DeleteOwnCompetencesResponse>(endpoint, {
      data: { competencias: competenceIdsToDelete.map((id) => ({ id })) },
    });
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
