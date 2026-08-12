import { type UseMutationOptions, useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import apiCompetencesQueries from "@/api/api-competences-queries";
import type {
  AddOwnCompetencesArgs,
  AddOwnCompetencesResponse,
} from "@/api/api-competences-queries/add-own-competences";
import type { FindCompleteUserResponse } from "@/api/api-users-queries/find-complete-user-by-url";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { queryClient, RQKeys } from "@/libs/react-query";

type Mutation = UseMutationOptions<
  AxiosResponse<AddOwnCompetencesResponse, unknown, object>,
  APIRequestError,
  AddOwnCompetencesArgs
>;

type Args = { authUser: Usuario | null; completeUser: UsuarioCompleto } & Pick<
  Mutation,
  "onError" | "onSuccess" | "onMutate"
>;

export const useAddOwnCompetences = ({
  authUser,
  completeUser,
  onError,
  onSuccess,
  onMutate,
}: Args) =>
  useMutation({
    mutationKey: RQKeys.user.editSelf(
      authUser?.id,
      completeUser,
      "add_own_competence",
    ),
    onMutate,
    onSuccess: async (data, variables, onMutateResult, context) => {
      await queryClient.setQueryData(
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
      );

      toast.success("Competências adicionadas!");
      await onSuccess?.(data, variables, onMutateResult, context);
    },
    onError: (error: APIRequestError, variables, onMutateResult, context) => {
      console.error(error.body ?? error.message);
      toast.error(error.message);
      onError?.(error, variables, onMutateResult, context);
    },
    mutationFn: async (args: AddOwnCompetencesArgs) => {
      return await apiCompetencesQueries.addOwnCompetences(args);
    },
  });
