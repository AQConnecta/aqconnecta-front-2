import { findCompleteUserByUrl } from "./find-complete-user-by-url";
import { getResumes } from "./get-resumes";

const prefix = "/usuario";

export function mountPath(endpoint: string): string {
  if (endpoint.startsWith("/")) endpoint = endpoint.slice(1);
  return `${prefix}/${endpoint}`;
}

export default {
  findCompleteUserBySlug: findCompleteUserByUrl,
  getResumes,
};
