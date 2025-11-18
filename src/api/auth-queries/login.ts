import axios, { type HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

export type LoginResponse = BasicServerResponse<
  { usuario: Usuario; token: string },
  | HttpStatusCode.NotFound
  | HttpStatusCode.Forbidden
  | HttpStatusCode.BadRequest
  | HttpStatusCode.Ok
>;

export async function login(params: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  try {
    const response = await axios.post<LoginResponse>(mountPath("login"), {
      email: params.email,
      senha: params.password,
    });

    return response.data;
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
