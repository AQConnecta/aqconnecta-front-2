import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type FindCompleteUserResponse = BasicServerResponse<
  UsuarioCompleto,
  | HttpStatusCode.Ok
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.Forbidden
  | HttpStatusCode.NotFound
  | HttpStatusCode.InternalServerError
>;

export type FindCompleteUserByUrlArgs = {
  slug: Usuario["userUrl"];
};

export async function findCompleteUserByUrl({
  slug,
}: FindCompleteUserByUrlArgs) {
  try {
    const endpoint = mountPath(`/p/${slug}`);
    const response = await axios.get<FindCompleteUserResponse>(endpoint);
    return response.data;
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
