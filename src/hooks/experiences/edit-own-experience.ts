import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import apiExperiencesQueries from "@/api/api-experiences-queries";
import type {
  EditOwnExperienceArgs,
  EditOwnExperienceResponse,
} from "@/api/api-experiences-queries/edit-own-experience";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { queryClient, RQKeys } from "@/libs/react-query";

type Mutation = UseMutationOptions<
  AxiosResponse<EditOwnExperienceResponse, unknown, object>,
  APIRequestError,
  EditOwnExperienceArgs
>;

type Args = { authUser: Usuario | null; completeUser: UsuarioCompleto } & Pick<
  Mutation,
  "onError" | "onSuccess"
>;

export const useEditOwnExperience = ({
  authUser,
  completeUser,
  onError,
  onSuccess,
}: Args) =>
  useMutation({
    mutationKey: RQKeys.user.editSelf(
      authUser?.id,
      completeUser,
      "edit_own_experience",
    ),
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.invalidateQueries({
        queryKey: RQKeys.experience.listByUser(authUser?.id),
      });

      await onSuccess?.(data, variables, onMutateResult, context);
    },
    onError,
    mutationFn: async (args: EditOwnExperienceArgs) => {
      return await apiExperiencesQueries.editOwnExperience(args);
    },
  });
