import { fetchManyVacancies } from "./fetch-many-vacancies";

const prefix = "/vaga";

export function mountPath(endpoint: string): string {
  return `${prefix}/${endpoint}`;
}

export default {
  fetchMany: fetchManyVacancies,
};
