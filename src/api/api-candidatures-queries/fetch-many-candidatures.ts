import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Vaga } from "@/core/types/vaga";
import type { Candidatura } from "@/core/types/value-objects/candidatura";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type FetchCandidaturesResponse = BasicServerResponse<
  Candidatura[],
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.Forbidden
  | HttpStatusCode.NotFound
  | HttpStatusCode.InternalServerError
>;

export type FetchCandidaturesArgs = {
  vacancyId: Vaga["id"];
};

export async function fetchManyCandidatures({
  vacancyId,
}: FetchCandidaturesArgs) {
  try {
    const path = mountPath(`candidaturas/${vacancyId}`);
    const response = await axios.get<FetchCandidaturesResponse>(path);
    return response.data;
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
