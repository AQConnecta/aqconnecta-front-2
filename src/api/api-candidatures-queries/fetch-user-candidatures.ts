import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Candidatura } from "@/core/types/value-objects/candidatura";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";

export type FetchCandidaturesResponse = BasicServerResponse<
  Candidatura[],
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.Forbidden
  | HttpStatusCode.NotFound
  | HttpStatusCode.InternalServerError
>;

export async function fetchAuthUserCandidatures() {
  try {
    const path = `/usuario/candidaturas`;
    const response = await axios.get<FetchCandidaturesResponse>(path);
    return response.data;
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
