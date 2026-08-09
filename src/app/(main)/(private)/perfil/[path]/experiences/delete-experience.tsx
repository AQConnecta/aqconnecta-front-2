"use client";

import { ScrollArea } from "@base-ui/react";
import { TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "@/components/button";
import Dialog from "@/components/dialog";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { useDeleteOwnExperience } from "@/hooks/experiences/delete-own-experience";

type Props = {
  authUser: Usuario | null;
  experienceId: string;
  completeUser: UsuarioCompleto;
  title: string;
};

export function DeleteExperienceDialog({
  authUser,
  completeUser,
  experienceId,
  title,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { isPending, mutate: deleteOwnExperience } = useDeleteOwnExperience({
    authUser,
    completeUser,
    onSuccess: () => {
      toast.success(`A experiência profissional "${title}" foi removida.`);
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
          title={`Remover experiência profissional: ${title}`}
          className="capitalize"
        />

        <ScrollArea.Root className="relative flex-1 min-h-0 overflow-hidden flex flex-col ">
          <ScrollArea.Viewport className="flex-1 min-h-0 overflow-y-auto p-1">
            <ScrollArea.Content className="">
              <p>
                Você tem certeza que deseja remover sua experiência
                profissional? Esta ação é irreversível.
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
              onClick={() => deleteOwnExperience({ experienceId })}
            >
              Remover
            </Button.Root>
          </Dialog.ActionsContainer.LeftArea>
        </Dialog.ActionsContainer>
      </Dialog.Container>
    </Dialog.Root>
  );
}
