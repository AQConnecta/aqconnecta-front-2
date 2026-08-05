import { listUsersExperiences } from "./list-users-experiences";

const prefix = "/experiencia";

export function mountPath(endpoint: string): string {
  if (endpoint.startsWith("/")) endpoint = endpoint.slice(1);
  return `${prefix}/${endpoint}`;
}

export default { listUsersExperiences };
