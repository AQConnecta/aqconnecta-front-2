import { create } from "zustand";
import type { Usuario } from "@/core/types/usuario";

type AuthStore = {
  token: string | null;
  user: Usuario | null;
  isLoadingAuth: boolean;

  setAuth(token: string, user: Usuario): void;
  removeAuth(): void;
};

export const useAuth = create<AuthStore>(
  (set) =>
    ({
      token: null,
      user: null,
      isLoadingAuth: true,

      setAuth(token: string, user: Usuario) {
        console.log("setou auth");
        set({ token, user, isLoadingAuth: false });
      },

      removeAuth() {
        set({ token: null, user: null });
      },
    }) satisfies AuthStore,
);
