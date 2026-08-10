import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import apiEducationQueries from "@/api/api-education-queries";
import type {
  EditOwnEducationArgs,
  EditOwnEducationResponse,
} from "@/api/api-education-queries/edit-own-education";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { queryClient, RQKeys } from "@/libs/react-query";

type Mutation = UseMutationOptions<
  AxiosResponse<EditOwnEducationResponse, unknown, object>,
  APIRequestError,
  EditOwnEducationArgs
>;

type Args = { authUser: Usuario | null; completeUser: UsuarioCompleto } & Pick<
  Mutation,
  "onError" | "onSuccess"
>;

export const useEditOwnEducation = ({
  authUser,
  completeUser,
  onError,
  onSuccess,
}: Args) =>
  useMutation({
    mutationKey: RQKeys.user.editSelf(
      authUser?.id,
      completeUser,
      "edit_own_education",
    ),
    onSuccess: async (data, variables, onMutateResult, context) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: RQKeys.education.listByUser(authUser?.id),
        }),
        queryClient.invalidateQueries({
          queryKey: RQKeys.user.findCompleteByUserUrl(completeUser.userUrl),
        }),
      ]);

      await onSuccess?.(data, variables, onMutateResult, context);
    },
    onError,
    mutationFn: async (args: EditOwnEducationArgs) => {
      return await apiEducationQueries.editOwnEducation(args);
    },
  });
