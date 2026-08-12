import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Competencia } from "@/core/types/competencia";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type AddOwnCompetencesResponse = BasicServerResponse<
  Competencia[],
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.BadRequest
  | HttpStatusCode.Created // competências removidas c/ sucesso
  | HttpStatusCode.NotFound // not found tá substituindo o erro 500 no service...
  | HttpStatusCode.InternalServerError
>;

export type AddOwnCompetencesArgs = {
  competenceIdsToDelete: string[];
};

export async function addOwnCompetences({
  competenceIdsToDelete,
}: AddOwnCompetencesArgs) {
  try {
    const endpoint = mountPath("/relacionar_competencia_usuario");
    return await axios.post<AddOwnCompetencesResponse>(endpoint, {
      competencias: competenceIdsToDelete.map((id) => ({ id })),
    });
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
