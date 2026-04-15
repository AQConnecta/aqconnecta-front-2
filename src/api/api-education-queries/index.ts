import { findUserEducation } from "./find-user-education";

const prefix = "/formacao_academica";

export function mountPath(endpoint: string): string {
  return `${prefix}/${endpoint}`;
}

export default {
  findUserEducation,
};
