import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Vaga } from "@/core/types/vaga";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type GetVacancyResponse = BasicServerResponse<
  Vaga,
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.BadRequest
  | HttpStatusCode.NotFound
  | HttpStatusCode.InternalServerError
>;

export type GetVacancyArgs = {
  id: Vaga["id"];
};

export async function getVacancy({ id }: GetVacancyArgs) {
  const path = mountPath(`localizar/${id}`);
  try {
    const response = await axios.get<GetVacancyResponse>(path);
    return response.data;
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
