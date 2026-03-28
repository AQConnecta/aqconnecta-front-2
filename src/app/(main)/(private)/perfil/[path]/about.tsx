/**
 * TODO: salvar as alterações no banco de dados
 * - um texto vazio deve ser transformado pra nulo/undefined visando remover a biografia atual
 */

"use client";

import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";
import { type ReactNode, useId, useState } from "react";
import { Alert } from "@/components/alert";
import Button from "@/components/button";
import Dialog from "@/components/dialog";
import Form from "@/components/form";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { SectionContainer } from "./section-container";

type Props = {
  completeUser: UsuarioCompleto;
  userOwnsProfile: boolean;
};

export function About({ completeUser, userOwnsProfile }: Props) {
  if (!completeUser.descricao && userOwnsProfile) {
    return (
      <Wrapper shouldShowEditButton={userOwnsProfile}>
        <Alert variant="warning" title="Você ainda não tem uma bio." />
      </Wrapper>
    );
  }

  if (!completeUser.descricao) return null;

  return (
    <Wrapper shouldShowEditButton={userOwnsProfile}>
      <p>{completeUser.descricao}</p>
    </Wrapper>
  );
}

function EditDialog({
  open,
  setOpen,
}: {
  setOpen: (open: boolean) => void;
  open: boolean;
}) {
  const formId = useId();
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Container>
        <Dialog.Header title="Editar biografia" className="capitalize" />
        <Dialog.Description className="mb-3">
          Edite a sua biografia para que os outros usuários possam te conhecer.
        </Dialog.Description>

        <form id={formId}>
          <Form.Input label="Biografia" type="textarea" required></Form.Input>
        </form>

        <Dialog.ActionsContainer>
          <Dialog.ActionsContainer.LeftArea>
            <Dialog.Close asChild>
              <Button.Root type="button" variant="outline">
                Cancelar
              </Button.Root>
            </Dialog.Close>

            <Button.Root type="submit" form={formId} color="primary">
              Salvar
            </Button.Root>
          </Dialog.ActionsContainer.LeftArea>
        </Dialog.ActionsContainer>
      </Dialog.Container>
    </Dialog.Root>
  );
}

function Wrapper({
  children,
  shouldShowEditButton,
}: {
  children: ReactNode;
  shouldShowEditButton: boolean;
}) {
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);

  return (
    <>
      <SectionContainer
        icon={SparkleIcon}
        title="Sobre"
        shouldShowEditButton={shouldShowEditButton}
        editButtonLabel="Editar sua biografia"
        onEditButtonClick={() => setEditDialogIsOpen(true)}
      >
        {children}
      </SectionContainer>
      <EditDialog open={editDialogIsOpen} setOpen={setEditDialogIsOpen} />
    </>
  );
}
