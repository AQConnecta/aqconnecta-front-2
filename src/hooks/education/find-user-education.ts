import { useQuery } from "@tanstack/react-query";
import apiEducationQueries from "@/api/api-education-queries";
import type { FindUserEducationResponse } from "@/api/api-education-queries/find-user-education";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import { RQKeys } from "@/libs/react-query";
import { checkShouldRetry, ensureAuthUser } from "..";

type Args = { authUser: Usuario | null };

export const useFetchManyUniversities = ({ authUser }: Args) =>
  useQuery<FindUserEducationResponse, APIRequestError>({
    queryKey: RQKeys.education.listByUser(authUser?.id),
    queryFn: () => {
      const user = ensureAuthUser(authUser);
      return apiEducationQueries.findUserEducation({ userId: user.id });
    },
    retry: checkShouldRetry,
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(authUser),
  });
