import { useQuery } from "@tanstack/react-query";
import apiCandidaturesQueries from "@/api/api-candidatures-queries";
import type { FetchCandidaturesResponse } from "@/api/api-candidatures-queries/fetch-many-candidatures";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import { RQKeys } from "@/libs/react-query";
import { checkShouldRetry } from ".";

type Args = { authUser: Usuario | null };

export const useFetchAuthUserCandidatures = ({ authUser }: Args) =>
  useQuery<FetchCandidaturesResponse, APIRequestError>({
    queryKey: RQKeys.vacancies.candidatures.listByUser(authUser?.id),
    queryFn: () => {
      if (!authUser) throw new Error("Identificador da vaga não encontrado.");
      return apiCandidaturesQueries.fetchManyFromAuthUser();
    },
    retry: checkShouldRetry,
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(authUser),
  });
