import { useQuery } from "@tanstack/react-query";
import apiUniversitiesQueries from "@/api/api-universities-queries";
import type { FetchManyUniversitiesResponse } from "@/api/api-universities-queries/fetch-many-universities";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import { RQKeys } from "@/libs/react-query";
import { checkShouldRetry, ensureAuthUser } from "..";

type Args = { authUser: Usuario | null };

export const useFetchManyUniversities = ({ authUser }: Args) =>
  useQuery<FetchManyUniversitiesResponse, APIRequestError>({
    queryKey: RQKeys.universities.list(),
    queryFn: () => {
      ensureAuthUser(authUser);
      return apiUniversitiesQueries.fetchMany();
    },
    retry: checkShouldRetry,
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(authUser),
  });
