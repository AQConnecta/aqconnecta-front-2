import { useQuery } from "@tanstack/react-query";
import apiUsersQueries from "@/api/api-users-queries";
import type { FindCompleteUserResponse } from "@/api/api-users-queries/find-complete-user-by-url";
import type { APIRequestError } from "@/core/errors/api-request-error";
import { RQKeys } from "@/libs/react-query";
import { checkShouldRetry } from "..";

type Args = { userUrl?: string };

export const useGetUserProfile = ({ userUrl }: Args) =>
  useQuery<FindCompleteUserResponse, APIRequestError>({
    queryKey: RQKeys.user.findCompleteByUserUrl(userUrl),
    queryFn: () => {
      if (!userUrl) {
        throw new Error("Cannot find user profile without valid `userUrl`.");
      }

      return apiUsersQueries.findCompleteUserBySlug({ slug: userUrl });
    },
    retry: checkShouldRetry,
    staleTime: 1000 * 60 * 5,
    enabled: Boolean(userUrl),
  });
