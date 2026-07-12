import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type EditSelfValidationErrors = {
  [K in keyof EditSelfArgs]: string[];
};

export type EditSelfResponse = BasicServerResponse<
  never,
  | HttpStatusCode.NoContent
  | HttpStatusCode.Unauthorized
  | HttpStatusCode.BadRequest
  | HttpStatusCode.InternalServerError
>;

export type EditSelfArgs = {
  nome?: string;
  descricao?: string | null;
  telefone?: string | null;
  curriculoLattes?: string | null;
  perfilGitHub?: string | null;
  perfilLinkedin?: string | null;
};

export async function editSelf(payload: EditSelfArgs) {
  try {
    const endpoint = mountPath("editar");
    await axios.patch<EditSelfResponse>(endpoint, payload);
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError<EditSelfValidationErrors>(
      error,
    );
  }
}
