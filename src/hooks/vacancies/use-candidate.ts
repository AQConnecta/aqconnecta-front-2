import { useMutation } from "@tanstack/react-query";
import apiVacanciesQueries from "@/api/api-vacancies-queries";
import type { Vaga } from "@/core/types/vaga";
import type { Curriculo } from "@/core/types/value-objects/curriculo";
import { queryClient, RQKeys } from "@/libs/react-query";

export const useCandidate = (
  vacancyId: Vaga["id"],
  resumeId: Curriculo["id"] | null,
) =>
  useMutation({
    mutationKey: RQKeys.vacancies.apply(vacancyId, resumeId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: RQKeys.vacancies.candidatures.list(vacancyId),
      });
    },
    mutationFn: async () => {
      if (resumeId) {
        await apiVacanciesQueries.apply({ resumeId, vacancyId });
        return;
      }

      throw new Error(
        "Você precisa selecionar um currículo para se candidatar.",
      );
    },
  });
