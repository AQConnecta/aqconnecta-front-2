import { useQuery } from "@tanstack/react-query";
import apiCandidaturesQueries from "@/api/api-candidatures-queries";
import type { FetchCandidaturesResponse } from "@/api/api-candidatures-queries/fetch-many-candidatures";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Vaga } from "@/core/types/vaga";
import { RQKeys } from "@/libs/react-query";
import { checkShouldRetry } from ".";

type Args = { vacancyId: Vaga["id"] | undefined };

export const useFetchVacancyCandidatures = ({ vacancyId }: Args) =>
  useQuery<FetchCandidaturesResponse, APIRequestError>({
    queryKey: RQKeys.vacancies.candidatures.list(vacancyId),
    queryFn: async () => {
      if (!vacancyId) throw new Error("Identificador da vaga não encontrado.");
      return await apiCandidaturesQueries.fetchManyFromVacancy({ vacancyId });
    },
    retry: checkShouldRetry,
    staleTime: 1000 * 60 * 5,
    enabled: !!vacancyId,
  });
