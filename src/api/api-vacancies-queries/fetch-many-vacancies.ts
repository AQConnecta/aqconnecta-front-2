import type { HttpStatusCode } from "axios";
import type { PresentedVacancy } from "@/api/types/presented-vacancy";
import { APIRequestError } from "@/core/errors/api-request-error";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type ListAllVacanciesResponse = BasicServerResponse<
  PresentedVacancy[],
  HttpStatusCode.Unauthorized | HttpStatusCode.InternalServerError
>;

export type ListAllVacanciesArgs = {
  begginnersOnly?: boolean;
  filter?: {
    query: string;
    filterBy: "title" | "competenceId";
  };
};

export async function fetchManyVacancies({
  filter,
  begginnersOnly,
}: ListAllVacanciesArgs = {}) {
  let path = mountPath("listar");

  const searchParams = new URLSearchParams();

  if (filter) {
    let filterBy: string;

    if (filter.filterBy === "title") filterBy = "titulo";
    else if (filter.filterBy === "competenceId") filterBy = "idCompetencia";
    else throw new Error("Received invalid `filterBy` value.");

    searchParams.set(filterBy, filter.query);
  }

  if (typeof begginnersOnly !== "undefined") {
    searchParams.set("iniciante", JSON.stringify(begginnersOnly));
  }

  if (searchParams.size) path = `${path}?${searchParams.toString()}`;

  try {
    const response = await axios.get<ListAllVacanciesResponse>(path);
    return response.data;
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
