import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Vaga } from "@/core/types/vaga";
import type { Curriculo } from "@/core/types/value-objects/curriculo";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type GetVacancyResponse = BasicServerResponse<
  Vaga,
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.BadRequest
  | HttpStatusCode.InternalServerError
  // TODO: deve-se arrumar no servidor para que seja lançado uma exceção de NotFound:
  // hoje, este lança uma exceção genérica quando a vaga não é encontrada, o que
  // é traduzido (pelo Spring Boot) em um erro interno do servidor.
  // | HttpStatusCode.NotFound
>;

export type GetVacancyArgs = {
  vacancyId: Vaga["id"];
  resumeId: Curriculo["id"];
};

export async function applyToVacancy({ resumeId, vacancyId }: GetVacancyArgs) {
  const path = mountPath(`candidatar/${vacancyId}`);
  try {
    const response = await axios.post<GetVacancyResponse>(path, resumeId);
    return response.data;
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
