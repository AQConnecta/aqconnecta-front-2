import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Competencia } from "@/core/types/competencia";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type CompetencesPage = {
  content: Competencia[];
  totalElements: number;
  totalPages: number;
  number: number;
  last: boolean;
};

export type FetchManyCompetencesResponse = BasicServerResponse<
  CompetencesPage,
  | HttpStatusCode.Ok
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.NoContent
  | HttpStatusCode.InternalServerError
>;

type FetchManyCompetencesArgs = {
  perPage?: number;
  search?: string;
  page?: number;
};

export async function fetchManyCompetences({
  perPage = 50,
  page = 0,
  search,
}: FetchManyCompetencesArgs) {
  try {
    const path = mountPath("listar");
    const response = await axios.get<FetchManyCompetencesResponse>(path, {
      params: {
        search,
        page,
        size: perPage,
      },
    });
    return response.data;
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
