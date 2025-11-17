import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "../types/server-responses/basic";
import { mountPath } from ".";

type RegisterResponse = BasicServerResponse<
  Usuario,
  | HttpStatusCode.Conflict
  | HttpStatusCode.InternalServerError
  | HttpStatusCode.Ok
>;

export async function register(params: {
  name: string;
  email: string;
  password: string;
}): Promise<RegisterResponse> {
  try {
    const response = await axios.post<RegisterResponse>(
      mountPath("registrar"),
      {
        nome: params.name,
        email: params.email,
        senha: params.password,
      },
    );

    return response.data;
  } catch (error) {
    throw APIRequestError.prepareFromAxiosError(error);
  }
}
