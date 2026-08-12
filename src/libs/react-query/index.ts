import { QueryClient } from "@tanstack/react-query";
import type { Vaga } from "@/core/types/vaga";
import type { Curriculo } from "@/core/types/value-objects/curriculo";
export const queryClient = new QueryClient();

export const RQKeys = {
  vacancies: {
    base: ["vacancies"] as const,
    list: (filters?: object) =>
      [...RQKeys.vacancies.base, "list", "presented", filters] as const,
    find: (vacancyId?: string) =>
      [...RQKeys.vacancies.base, vacancyId, "find"] as const,
    findPresented: (vacancyId?: string) =>
      [...RQKeys.vacancies.base, vacancyId, "find", "presented"] as const,
    apply: (vacancyId: Vaga["id"], resumeId: Curriculo["id"] | null) =>
      [
        ...RQKeys.vacancies.base,
        "candidatures",
        "apply",
        vacancyId,
        resumeId,
      ] as const,
    candidatures: {
      base: ["candidatures"] as const,
      listByUser: (userId?: string, filters?: object) =>
        [
          ...RQKeys.vacancies.base,
          ...RQKeys.vacancies.candidatures.base,
          "list",
          "by_user",
          userId,
          filters,
        ] as const,
      listByEveryVacancy: () =>
        [
          ...RQKeys.vacancies.base,
          ...RQKeys.vacancies.candidatures.base,
          "list",
          "by_vacancy",
        ] as const,
      listByVacancy: (vacancyId?: string, filters?: object) => [
        ...RQKeys.vacancies.candidatures.listByEveryVacancy(),
        vacancyId,
        filters,
      ],
    },
  },
  auth: {
    base: ["auth"] as const,
    register: () => [...RQKeys.auth.base, "register"] as const,
  },
  user: {
    base: ["user"] as const,
    findCompleteByUserUrl: (userUrl?: string) =>
      [...RQKeys.user.base, "find_complete_by_user_url", userUrl] as const,
    editSelf: (
      userId: string | undefined,
      currentUserData: object,
      scope: string,
    ) => [
      ...RQKeys.user.base,
      "edit_self_data",
      userId,
      currentUserData,
      scope,
    ],
  },
  universities: {
    base: ["university"] as const,
    list: (filters?: object) =>
      [...RQKeys.universities.base, "list", filters] as const,
  },
  education: {
    base: ["education"] as const,
    listByUser: (userId?: string) =>
      [...RQKeys.education.base, "list", "userId", userId] as const,
  },
  experience: {
    base: ["professional_experience"] as const,
    listByUser: (userId?: string) =>
      [...RQKeys.education.base, "list", "userId", userId] as const,
  },
  competence: {
    base: ["competence"] as const,
    list: (filters?: object) =>
      [...RQKeys.competence.base, "list", filters] as const,
  },
};
