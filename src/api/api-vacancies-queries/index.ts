import { applyToVacancy } from "./apply-to-vacancy";
import { fetchManyVacancies } from "./fetch-many-vacancies";
import { getVacancy as findVacancyById } from "./find-vacancy-by-id";

const prefix = "/vaga";

export function mountPath(endpoint: string): string {
  return `${prefix}/${endpoint}`;
}

export default {
  fetchMany: fetchManyVacancies,
  findById: findVacancyById,
  apply: applyToVacancy,
};
