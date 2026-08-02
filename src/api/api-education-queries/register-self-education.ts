import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { FormacaoAcademica } from "@/core/types/value-objects/formacao-academica";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type RegisterSelfEducationResponse = BasicServerResponse<
  FormacaoAcademica,
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.Created
  // back-end não está preparado pra lidar com erros de validação no momento
  // | HttpStatusCode.BadRequest
  | HttpStatusCode.InternalServerError
>;

export type RegisterSelfEducationArgs = {
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
  [K in keyof RegisterSelfEducationArgs]: string[];
};

export async function registerSelfEducation(
  payload: RegisterSelfEducationArgs,
) {
  try {
    const endpoint = mountPath("cadastrar");
    return await axios.post<RegisterSelfEducationResponse>(endpoint, payload);
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError<RegisterSelfEducationValidationErrors>(
      error,
    );
  }
}
