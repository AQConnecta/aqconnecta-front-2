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

// Esse tipo não é o mesmo que `BasicServerResponse`. Ele é a serialização da classe
// `com.aqConnecta.DTOs.response.ErrorResponse`, que é usada somente no endpoint
// de autenticação de usuário (mas em nenhuma outra parte da aplicação inteira).
//
// TODO: utilizar a resposta normal nesse endpoint no back-end e atualizar esse tipo
// para manter tudo padronizado.
type LoginResponse =
  | {
      usuario: Usuario;
      token: string;
    }
  | {
      message: string;
      httpStatus: string;
    };

type AdaptedLoginResponse = BasicServerResponse<
  {
    user: Usuario;
    token: string;
  },
  HttpStatusCode.Forbidden | HttpStatusCode.BadRequest | HttpStatusCode.Ok
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

  public static async login(params: {
    email: string;
    password: string;
  }): Promise<AdaptedLoginResponse> {
    try {
      const response = await axios.post<LoginResponse>(
        ApiAuthQueries.mountPath("login"),
        {
          email: params.email,
          senha: params.password,
        },
      );

      const adaptedResponse = {
        status: response.status,
      } as AdaptedLoginResponse;

      console.log(response.data);
      if ("usuario" in response.data) {
        adaptedResponse.data = {
          user: response.data.usuario,
          token: response.data.token,
        };

        delete adaptedResponse.data.user["senha"];
      } else {
        adaptedResponse.message = response.data.message;
      }

      return adaptedResponse;
    } catch (error) {
      throw APIRequestError.prepareFromAxiosError(error);
    }
  }
}
