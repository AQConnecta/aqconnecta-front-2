import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import apiUsersQueries from "@/api/api-users-queries";
import type {
  EditSelfArgs,
  EditSelfErrorResponse,
} from "@/api/api-users-queries/edit-self";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { queryClient, RQKeys } from "@/libs/react-query";

type MutationOptions = UseMutationOptions<
  Awaited<ReturnType<typeof apiUsersQueries.editSelf>>,
  APIRequestError<EditSelfErrorResponse>,
  EditSelfArgs
>;

type Args = {
  authUser: Usuario | null;
  completeUser: UsuarioCompleto;
} & Pick<MutationOptions, "onError" | "onSuccess" | "onSettled" | "onMutate">;

export const useEditSelf = ({
  authUser,
  completeUser,
  onError,
  onMutate,
  onSuccess,
}: Args) =>
  useMutation({
    mutationKey: RQKeys.user.editSelf(authUser?.id, completeUser, "edit_self"),
    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: RQKeys.user.findCompleteByUserUrl(authUser?.userUrl),
      });

      onSuccess?.(data, variables, onMutateResult, context);
    },
    onError,
    onMutate,
    mutationFn: async (newData: EditSelfArgs) => {
      await apiUsersQueries.editSelf(newData);
      return;
    },
  });
