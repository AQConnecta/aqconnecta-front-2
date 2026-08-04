import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { FormacaoAcademica } from "@/core/types/value-objects/formacao-academica";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type EditOwnEducationResponse = BasicServerResponse<
  FormacaoAcademica,
  | HttpStatusCode.Unauthorized // sem login ou não é dono da formação acadêmica
  | HttpStatusCode.Created // TODO: mudar (no back-end) pra 200 OK
  | HttpStatusCode.NotFound
  | HttpStatusCode.InternalServerError
  // back-end não está preparado pra lidar com erros de validação no momento
  // | HttpStatusCode.BadRequest
>;

export type EditOwnEducationArgs = {
  id: string;
  universidade: {
    id: string;
  };
  descricao: string;
  dataInicio: Date;
  atualFormacao: boolean;
  diploma?: string | undefined;
  dataFim?: Date | undefined;
};

export type RegisterSelfEducationValidationErrors = {
  [K in keyof EditOwnEducationArgs]: string[];
};

export async function editOwnEducation({
  id,
  ...payload
}: EditOwnEducationArgs) {
  try {
    const endpoint = mountPath(`alterar/${id}`);
    return await axios.put<EditOwnEducationResponse>(endpoint, payload);
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError<RegisterSelfEducationValidationErrors>(
      error,
    );
  }
}
