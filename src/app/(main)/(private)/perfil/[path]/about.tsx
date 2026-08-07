"use client";

import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";
import {
  type ReactNode,
  type SubmitEvent,
  useCallback,
  useId,
  useState,
} from "react";
import toast from "react-hot-toast";
import type { EditSelfValidationErrors } from "@/api/api-users-queries/edit-self";
import { Alert } from "@/components/alert";
import Button from "@/components/button";
import Dialog from "@/components/dialog";
import Form from "@/components/form";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { useEditSelf } from "@/hooks/users/edit-self";
import { SectionContainer } from "./section-container";

type Props = {
  authUser: Usuario | null;
  completeUser: UsuarioCompleto;
  userOwnsProfile: boolean;
};

export function About({ completeUser, authUser, userOwnsProfile }: Props) {
  if (!completeUser.descricao && userOwnsProfile) {
    return (
      <Wrapper
        shouldShowEditButton={userOwnsProfile}
        authUser={authUser}
        completeUser={completeUser}
      >
        <Alert variant="warning" title="Você ainda não tem uma bio." />
      </Wrapper>
    );
  }

  if (!completeUser.descricao) return null;

  return (
    <Wrapper
      shouldShowEditButton={userOwnsProfile}
      authUser={authUser}
      completeUser={completeUser}
    >
      <p className="user-text-area">{completeUser.descricao}</p>
    </Wrapper>
  );
}

function EditDialog({
  open,
  setOpen,
  completeUser,
  authUser,
}: {
  setOpen: (open: boolean) => void;
  open: boolean;
  completeUser: UsuarioCompleto;
  authUser: Usuario | null;
}) {
  const formId = useId();

  const [description, setDescription] = useState<string | undefined>(
    completeUser.descricao,
  );
  const [descriptionError, setDescriptionError] = useState<string | null>(null);

  const { isPending, mutate: editSelf } = useEditSelf({
    authUser,
    completeUser,
    onSuccess: () => {
      toast.success("Descrição alterada.");
      setOpen(false);
    },
    onError: (error: APIRequestError) => {
      if (error.body) {
        setDescriptionError(
          (error.body as EditSelfValidationErrors).descricao?.[0] ?? null,
        );
      }

      toast.error(error.message);
    },
  });

  const handleSubmit = useCallback(
    (event: SubmitEvent) => {
      event.preventDefault();

      let resolvedDescription: string | undefined | null;

      if (description !== completeUser.descricao)
        resolvedDescription = description;

      if (description === "") resolvedDescription = null;

      editSelf({ descricao: resolvedDescription });
    },
    [editSelf, description, completeUser],
  );

  const descriptionInputId = useId();

  const handleOpenChange = (open: boolean) => {
    if (isPending && !open) return;
    setOpen(open);
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Container>
        <Dialog.Header title="Editar biografia" className="capitalize" />
        <Dialog.Description className="mb-3">
          Edite a sua biografia para que os outros usuários possam te conhecer.
        </Dialog.Description>

        <form id={formId} onSubmit={handleSubmit}>
          <div>
            <Form.Label
              htmlFor={descriptionInputId}
              required
              className="block mb-1"
            >
              Biografia
            </Form.Label>

            <Form.TextField.Root>
              <Form.TextField.Input
                id={descriptionInputId}
                placeholder="Conte detalhes sobre você."
                defaultValue={completeUser.descricao}
                onInput={(e) => setDescription(e.currentTarget.value)}
                asChild
                className="py-2"
              >
                <textarea rows={10} />
              </Form.TextField.Input>
            </Form.TextField.Root>

            {descriptionError && (
              <Form.TextField.ErrorMessage message={descriptionError} />
            )}
          </div>
        </form>

        <Dialog.ActionsContainer>
          <Dialog.ActionsContainer.LeftArea>
            <Dialog.Close asChild>
              <Button.Root type="button" variant="outline" disabled={isPending}>
                Cancelar
              </Button.Root>
            </Dialog.Close>

            <Button.Root
              type="submit"
              form={formId}
              color="primary"
              disabled={isPending}
            >
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
  authUser,
  completeUser,
}: {
  children: ReactNode;
  shouldShowEditButton: boolean;
  authUser: Usuario | null;
  completeUser: UsuarioCompleto;
}) {
  const [editDialogIsOpen, setEditDialogIsOpen] = useState(false);

  return (
    <>
      <SectionContainer
        icon={SparkleIcon}
        title="Sobre"
        shouldShowEditButton={shouldShowEditButton}
        actionContent={
          <SectionContainer.EditButton
            editButtonLabel="Editar sua biografia"
            onClick={() => setEditDialogIsOpen(true)}
          />
        }
      >
        {children}
      </SectionContainer>
      <EditDialog
        open={editDialogIsOpen}
        setOpen={setEditDialogIsOpen}
        authUser={authUser}
        completeUser={completeUser}
      />
    </>
  );
}
