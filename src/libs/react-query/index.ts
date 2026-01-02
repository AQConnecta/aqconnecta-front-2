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
  },
  auth: {
    base: ["auth"] as const,
    register: () => [...RQKeys.auth.base, "register"] as const,
  },
};
