import { fetchManyCandidatures } from "./fetch-many-candidatures";
import { fetchAuthUserCandidatures } from "./fetch-user-candidatures";

export default {
  fetchManyFromVacancy: fetchManyCandidatures,
  fetchManyFromAuthUser: fetchAuthUserCandidatures,
};
