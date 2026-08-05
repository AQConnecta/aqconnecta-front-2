import { useQuery } from "@tanstack/react-query";
import apiExperiencesQueries from "@/api/api-experiences-queries";
import type { ListUsersExperiencesResponse } from "@/api/api-experiences-queries/list-users-experiences";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import { RQKeys } from "@/libs/react-query";
import { checkShouldRetry } from "..";

type Args = { userId: Usuario["id"] };

export const useListUsersExperiences = ({ userId }: Args) =>
  useQuery<ListUsersExperiencesResponse, APIRequestError>({
    queryKey: RQKeys.experience.listByUser(userId),
    queryFn: () => {
      return apiExperiencesQueries.listUsersExperiences({ userId: userId });
    },
    retry: checkShouldRetry,
    staleTime: 1000 * 60 * 5,
  });
