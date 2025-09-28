import _axios from "axios";
import { PublicEnv } from "@/config/env/public";

export const axios = _axios.create({
  baseURL: PublicEnv.serverUrl,
  // O servidor precisa estar preparado pra lidar com o CORS corretamente
  // (permitir somente a origem do front-end) pra ativar essa opção; atualmente, permite tudo ("*").
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function getAuthorizatioHeader(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
  };
}
