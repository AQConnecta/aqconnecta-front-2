import { useMutation } from "@tanstack/react-query";
import apiUsersQueries from "@/api/api-users-queries";
import type { EditSelfArgs } from "@/api/api-users-queries/edit-self";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { queryClient, RQKeys } from "@/libs/react-query";

type Args = { authUser: Usuario | null; completeUser: UsuarioCompleto };

export const useEditSelf = ({ authUser, completeUser }: Args) =>
  useMutation({
    mutationKey: RQKeys.user.editSelf(authUser?.id, completeUser),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: RQKeys.user.findCompleteByUserUrl(authUser?.userUrl),
      });
    },
    mutationFn: async (newData: EditSelfArgs) => {
      if (authUser) {
        await apiUsersQueries.editSelf(newData);
        return;
      }

      throw new Error(
        "Você não pode editar seu próprio perfil sem se identificar primeiro.",
      );
    },
  });
