import _axios from "axios";
import { PublicEnv } from "@/config/env/public";

export const axios = _axios.create({
  baseURL: PublicEnv.serverUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export function getAuthorizatioHeader(token: string): Record<string, string> {
  return {
    Authorization: `Bearer ${token}`,
  };
}
