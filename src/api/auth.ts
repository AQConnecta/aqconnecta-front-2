import type { HttpStatusCode } from "axios";
import { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import { axios } from "@/libs/axios";
import type { BasicServerResponse } from "./types/server-responses/basic";

type RegisterResponse = BasicServerResponse<
  Usuario,
  | HttpStatusCode.Conflict
  | HttpStatusCode.InternalServerError
  | HttpStatusCode.Ok
>;

export abstract class ApiAuthQueries {
  private static prefix: string = "/auth";

  private static mountPath(path: string): string {
    return `${ApiAuthQueries.prefix}/${path}`;
  }

  public static async register(params: {
    name: string;
    email: string;
    password: string;
  }): Promise<RegisterResponse> {
    try {
      const response = await axios.post<RegisterResponse>(
        ApiAuthQueries.mountPath("registrar"),
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
}
