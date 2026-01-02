import { useQuery } from "@tanstack/react-query";
import apiVacanciesQueries from "@/api/api-vacancies-queries";
import type { GetVacancyResponse } from "@/api/api-vacancies-queries/find-vacancy-by-id";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Vaga } from "@/core/types/vaga";
import { RQKeys } from "@/libs/react-query";

type Args = {
  vacancyId: Vaga["id"] | undefined;
};

export const useFindVacancyById = ({ vacancyId }: Args) =>
  useQuery<GetVacancyResponse, APIRequestError>({
    queryKey: [RQKeys.vacancies.find(vacancyId)],
    queryFn: async () => {
      if (!vacancyId) throw new Error("Identificador de vaga não encontrado.");
      return await apiVacanciesQueries.findById({ id: vacancyId });
    },
    retry: false,
  });
