import { fetchManyUniversities } from "./fetch-many-universities";

const prefix = "/universidade";

export function mountPath(endpoint: string): string {
  return `${prefix}/${endpoint}`;
}

export default {
  fetchMany: fetchManyUniversities,
};
