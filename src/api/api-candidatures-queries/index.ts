import { fetchManyCandidatures } from "./fetch-many-candidatures";

const prefix = "/vaga";

export function mountPath(endpoint: string): string {
  return `${prefix}/${endpoint}`;
}

export default {
  fetchManyFromVacancy: fetchManyCandidatures,
};
