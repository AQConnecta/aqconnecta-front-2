import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { FormacaoAcademica } from "@/core/types/value-objects/formacao-academica";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type RegisterOwnExperienceResponse = BasicServerResponse<
  FormacaoAcademica,
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.Created
  | HttpStatusCode.BadRequest
  | HttpStatusCode.InternalServerError
>;

export type RegisterOwnExperienceArgs = {
  titulo: string;
  instituicao: string;
  descricao: string;
  dataInicio: Date;
  dataFim?: Date;
  atualExperiencia?: boolean;
};

// back-end ainda não valida o DTO
export type RegisterOwnExperienceValidationErrors = never;
// export type RegisterOwnExperienceValidationErrors = BasicServerValidationErrors<RegisterOwnExperienceArgs>;

export async function registerOwnExperience(
  payload: RegisterOwnExperienceArgs,
) {
  try {
    const endpoint = mountPath("cadastrar");
    return await axios.post<RegisterOwnExperienceResponse>(endpoint, payload);
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError<RegisterOwnExperienceValidationErrors>(
      error,
    );
  }
}
