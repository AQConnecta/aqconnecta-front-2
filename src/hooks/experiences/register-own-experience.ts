import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import apiExperiencesQueries from "@/api/api-experiences-queries";
import type {
  RegisterOwnExperienceArgs,
  RegisterOwnExperienceResponse,
  RegisterOwnExperienceValidationErrors,
} from "@/api/api-experiences-queries/register-own-experience";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { queryClient, RQKeys } from "@/libs/react-query";

type Mutation = UseMutationOptions<
  AxiosResponse<RegisterOwnExperienceResponse>,
  APIRequestError<RegisterOwnExperienceValidationErrors>,
  RegisterOwnExperienceArgs
>;

type Args = { authUser: Usuario | null; completeUser: UsuarioCompleto } & Pick<
  Mutation,
  "onError" | "onSuccess"
>;

export const useRegisterOwnExperience = ({
  authUser,
  completeUser,
  onError,
  onSuccess,
}: Args) =>
  useMutation({
    mutationKey: RQKeys.user.editSelf(
      authUser?.id,
      completeUser,
      "register_own_professional_experience",
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
    mutationFn: async (data: RegisterOwnExperienceArgs) => {
      return await apiExperiencesQueries.registerOwnExperience(data);
    },
  });
