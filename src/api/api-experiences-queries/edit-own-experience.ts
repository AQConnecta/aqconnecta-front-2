import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Experiencia } from "@/core/types/value-objects/experiencia";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type EditOwnExperienceResponse = BasicServerResponse<
  Experiencia,
  | HttpStatusCode.Unauthorized // sem login ou não é dono da experiência
  | HttpStatusCode.Created // TODO: mudar (no back-end) pra 200 OK
  | HttpStatusCode.NotFound
  | HttpStatusCode.InternalServerError
  | HttpStatusCode.BadRequest
>;

export type EditOwnExperienceArgs = {
  id: string;
  titulo: string;
  instituicao: string;
  descricao: string;
  dataInicio: Date;
  dataFim?: Date;
  atualExperiencia?: boolean;
};

// embora tenha o código de bad request, não retorna erros de validações
export type RegisterSelfExperienceValidationErrors = never;

export async function editOwnExperience({
  id,
  ...payload
}: EditOwnExperienceArgs) {
  try {
    const endpoint = mountPath(`/alterar/${id}`);
    return await axios.put<EditOwnExperienceResponse>(endpoint, payload);
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError<RegisterSelfExperienceValidationErrors>(
      error,
    );
  }
}
