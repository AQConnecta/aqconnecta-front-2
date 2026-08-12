import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import apiCompetencesQueries from "@/api/api-competences-queries";
import type {
  DeleteOwnCompetencesArgs,
  DeleteOwnCompetencesResponse,
} from "@/api/api-competences-queries/delete-own-competence";
import type { FindCompleteUserResponse } from "@/api/api-users-queries/find-complete-user-by-url";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { queryClient, RQKeys } from "@/libs/react-query";

type Mutation = UseMutationOptions<
  AxiosResponse<DeleteOwnCompetencesResponse, unknown, object>,
  APIRequestError,
  DeleteOwnCompetencesArgs
>;

type Args = { authUser: Usuario | null; completeUser: UsuarioCompleto } & Pick<
  Mutation,
  "onError" | "onSuccess"
>;

export const useDeleteOwnCompetences = ({
  authUser,
  completeUser,
  onError,
  onSuccess,
}: Args) =>
  useMutation({
    mutationKey: RQKeys.user.editSelf(
      authUser?.id,
      completeUser,
      "delete_own_competence",
    ),
    onSuccess: async (data, variables, onMutateResult, context) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: RQKeys.vacancies.candidatures.listByEveryVacancy(),
        }),
        queryClient.setQueryData(
          RQKeys.user.findCompleteByUserUrl(completeUser.userUrl),
          (oldData: FindCompleteUserResponse) => {
            if (!oldData?.data) return oldData;

            return {
              ...oldData,
              data: {
                ...oldData.data!,
                competencias: data.data.data!, // 🕊️
              },
            } satisfies FindCompleteUserResponse;
          },
        ),
      ]);

      await onSuccess?.(data, variables, onMutateResult, context);
    },
    onError,
    mutationFn: async (args: DeleteOwnCompetencesArgs) => {
      return await apiCompetencesQueries.deleteOwnCompetences(args);
    },
  });
