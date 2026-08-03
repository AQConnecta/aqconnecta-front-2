import { deleteOwnEducation } from "./delete-own-education";
import { findUserEducation } from "./find-user-education";
import { registerSelfEducation } from "./register-self-education";

const prefix = "/formacao_academica";

export function mountPath(endpoint: string): string {
  return `${prefix}/${endpoint}`;
}

export default {
  findUserEducation,
  registerSelfEducation,
  deleteOwnEducation,
};
