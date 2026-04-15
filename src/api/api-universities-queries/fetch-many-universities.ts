import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Universidade } from "@/core/types/universidade";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type FetchManyUniversitiesResponse = BasicServerResponse<
  Universidade[],
  | HttpStatusCode.Ok
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.NoContent
  | HttpStatusCode.InternalServerError
>;

export async function fetchManyUniversities() {
  try {
    const path = mountPath("listar");
    const response = await axios.get<FetchManyUniversitiesResponse>(path);
    return response.data;
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
