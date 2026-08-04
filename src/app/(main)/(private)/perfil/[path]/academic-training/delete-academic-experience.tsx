"use client";

import { ScrollArea } from "@base-ui/react";
import { TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/button";
import Dialog from "@/components/dialog";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Universidade } from "@/core/types/universidade";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { useDeleteOwnEducation } from "@/hooks/education/delete-own-education";

type Props = {
  authUser: Usuario | null;
  idFormacaoAcademica: string;
  completeUser: UsuarioCompleto;
  universidade: Universidade;
  diploma?: string | null;
};

export function DeleteAcademicExperienceDialog({
  authUser,
  completeUser,
  universidade,
  diploma,
  idFormacaoAcademica,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { isPending, mutate: deleteOwnEducation } = useDeleteOwnEducation({
    authUser,
    completeUser,
    onSuccess: () => {
      toast.success(
        `A formação acadêmica "${diploma ?? universidade.nomeInstituicao}" foi removida.`,
      );
      setIsOpen(false);
    },
    onError: (error: APIRequestError) => {
      if (error.body) console.error(error.body);
      toast.error(error.message);
    },
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button.Root size="sm" variant="ghost" color="destructive">
          <Button.Icon icon={TrashIcon} /> Excluir
        </Button.Root>
      </Dialog.Trigger>

      <Dialog.Container className="flex flex-col">
        <Dialog.Header
          title={`Remover formação acadêmica: ${diploma ?? universidade.nomeInstituicao}`}
          className="capitalize"
        />

        <ScrollArea.Root className="relative flex-1 min-h-0 overflow-hidden flex flex-col ">
          <ScrollArea.Viewport className="flex-1 min-h-0 overflow-y-auto p-1">
            <ScrollArea.Content className="">
              <p className="text-balance">
                Você tem certeza que deseja remover sua formação acadêmica na
                universidade {universidade.nomeInstituicao}? Esta ação é
                irreversível.
              </p>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea.Root>

        <Dialog.ActionsContainer>
          <Dialog.ActionsContainer.LeftArea>
            <Dialog.Close asChild disabled={isPending}>
              <Button.Root variant="outline">Cancelar</Button.Root>
            </Dialog.Close>

            <Button.Root
              variant="default"
              color="destructive"
              type="submit"
              disabled={isPending}
              onClick={() => deleteOwnEducation({ idFormacaoAcademica })}
            >
              Remover
            </Button.Root>
          </Dialog.ActionsContainer.LeftArea>
        </Dialog.ActionsContainer>
      </Dialog.Container>
    </Dialog.Root>
  );
}
