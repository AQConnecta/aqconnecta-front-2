import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import apiEducationQueries from "@/api/api-education-queries";
import type { RegisterSelfEducationArgs } from "@/api/api-education-queries/register-self-education";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { queryClient, RQKeys } from "@/libs/react-query";

type Mutation = UseMutationOptions<
  unknown,
  APIRequestError,
  RegisterSelfEducationArgs
>;

type Args = { authUser: Usuario | null; completeUser: UsuarioCompleto } & Pick<
  Mutation,
  "onError" | "onSuccess"
>;

export const useRegisterSelfEducation = ({
  authUser,
  completeUser,
  onError,
  onSuccess,
}: Args) =>
  useMutation({
    mutationKey: RQKeys.user.editSelf(
      authUser?.id,
      completeUser,
      "register_self_education",
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
    mutationFn: async (newData: RegisterSelfEducationArgs) => {
      return await apiEducationQueries.registerSelfEducation(newData);
    },
  });
