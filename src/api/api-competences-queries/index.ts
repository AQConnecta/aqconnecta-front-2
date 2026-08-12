import { deleteOwnCompetences } from "./delete-own-competence";

const prefix = "/competencia";

export function mountPath(endpoint: string): string {
  if (endpoint.startsWith("/")) endpoint = endpoint.slice(1);
  return `${prefix}/${endpoint}`;
}

export default {
  deleteOwnCompetences,
};
