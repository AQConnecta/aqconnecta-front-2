"use client";

import { ScrollArea } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useEffectEvent, useId, useState } from "react";
import { type FieldPath, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "@/components/button";
import Dialog from "@/components/dialog";
import Form from "@/components/form";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { useEditSelf } from "@/hooks/users/edit-self";
import { SectionContainer } from "../section-container";
import { type SocialMediaFormSchema, socialMediaFormSchema } from "./schema";

type Props = {
  authUser: Usuario | null;
  completeUser: UsuarioCompleto;
};

export function EditSocialMediaFormDialog({ authUser, completeUser }: Props) {
  const formId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const { register, reset, handleSubmit, formState, setError, clearErrors } =
    useForm({
      resolver: zodResolver(socialMediaFormSchema),
      values: {
        curriculoLattes: completeUser.curriculoLattesUrl,
        perfilGitHub: completeUser.githubProfileUrl,
        perfilLinkedin: completeUser.linkedinProfileUrl,
        telefone: completeUser.telefone,
      },
    });

  const { isPending, mutate: editSelf } = useEditSelf({
    authUser,
    completeUser,
    onMutate: () => clearErrors(),
    onSuccess: () => {
      toast.success("Redes sociais atualizadas.");
      setIsOpen(false);
    },
    onError: (error) => {
      if (error.body?.data) {
        const errors = error.body.data;

        for (const [key, value] of Object.entries(errors)) {
          setError(key as FieldPath<SocialMediaFormSchema>, {
            message: value[0],
          });
        }
      }

      toast.error(error.message);
    },
  });

  const onSubmit = (data: SocialMediaFormSchema) => {
    const payload: Partial<SocialMediaFormSchema> = {};
    const { curriculoLattes, perfilGitHub, perfilLinkedin, telefone } = data;
    const { dirtyFields } = formState;

    if (dirtyFields.curriculoLattes) payload.curriculoLattes = curriculoLattes;
    if (dirtyFields.perfilGitHub) payload.perfilGitHub = perfilGitHub;
    if (dirtyFields.perfilLinkedin) payload.perfilLinkedin = perfilLinkedin;
    if (dirtyFields.telefone) payload.telefone = telefone;

    editSelf(payload);
  };

  const resetFormValues = useEffectEvent(() => reset());

  useEffect(() => {
    if (isOpen) resetFormValues();
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <SectionContainer.EditButton editButtonLabel="Editar informações do perfil" />
      </Dialog.Trigger>
      <Dialog.Container className="flex flex-col">
        <Dialog.Header title="Editar redes sociais" className="capitalize" />

        <ScrollArea.Root className="relative flex-1 min-h-0 overflow-hidden flex flex-col ">
          <ScrollArea.Viewport className="flex-1 min-h-0 overflow-y-auto p-1">
            <ScrollArea.Content className="">
              <form
                id={formId}
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Form.Input
                  type="text"
                  label="GitHub"
                  placeholder="ex: https://github.com/aqconnecta"
                  inputProps={register("perfilGitHub")}
                  errorMessage={formState.errors.perfilGitHub?.message}
                />
                <Form.Input
                  type="text"
                  label="LinkedIn"
                  placeholder="ex: https://www.linkedin.com/in/seu-perfil-do-linkedin"
                  inputProps={register("perfilLinkedin")}
                  errorMessage={formState.errors.perfilLinkedin?.message}
                />
                <Form.Input
                  type="text"
                  label="Currículo Lattes"
                  required
                  placeholder="ex: https://lattes.cnpq.br/..."
                  inputProps={register("curriculoLattes")}
                  errorMessage={formState.errors.curriculoLattes?.message}
                />
                <Form.Input
                  type="text"
                  label="Número de telefone"
                  required
                  placeholder="ex: DDD XXXX-YYYY"
                  inputProps={register("telefone")}
                  errorMessage={formState.errors.telefone?.message}
                />
              </form>
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
              color="primary"
              type="submit"
              form={formId}
              disabled={isPending}
            >
              Atualizar
            </Button.Root>
          </Dialog.ActionsContainer.LeftArea>
        </Dialog.ActionsContainer>
      </Dialog.Container>
    </Dialog.Root>
  );
}
