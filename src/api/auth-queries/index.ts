import { login } from "./login";
import { logout } from "./logout";
import { refresh } from "./refresh";
import { register } from "./register";

const prefix: string = "/auth";
export function mountPath(path: string): string {
  return `${prefix}/${path}`;
}

export default {
  login,
  refresh,
  register,
  logout,
};
