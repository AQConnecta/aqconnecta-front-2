"use client";

import { ScrollArea } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Button from "@/components/button";
import Dialog from "@/components/dialog";
import Form from "@/components/form";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { useRegisterOwnExperience } from "@/hooks/experiences/register-own-experience";
import { SectionContainer } from "../section-container";
import { experienceFormSchema } from "./schema";

type Props = {
  authUser: Usuario | null;
  completeUser: UsuarioCompleto;
};

export function CreateExperienceFormDialog({ authUser, completeUser }: Props) {
  const formId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const { register, reset, control, watch, setValue, handleSubmit, formState } =
    useForm({
      resolver: zodResolver(experienceFormSchema),
    });

  const { isPending, mutate: registerOwnExperience } = useRegisterOwnExperience(
    {
      authUser,
      completeUser,
      onSuccess: () => {
        toast.success("Experiência profissional adicionada.");
        setIsOpen(false);
        reset();
      },
      onError: (error) => {
        if (error.body) console.error(error.body);
        toast.error(error.message);
      },
    },
  );

  const isCurrentExperience = watch("atualExperiencia");

  useEffect(() => {
    if (!isCurrentExperience) return;

    setValue("dataFim", undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [isCurrentExperience, setValue]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <SectionContainer.AddButton addButtonLabel="Editar suas experiências profissionais" />
      </Dialog.Trigger>
      <Dialog.Container className="flex flex-col">
        <Dialog.Header
          title="Adicionar nova experiência profissional"
          className="capitalize"
        />

        <ScrollArea.Root className="relative flex-1 min-h-0 overflow-hidden flex flex-col ">
          <ScrollArea.Viewport className="flex-1 min-h-0 overflow-y-auto p-1">
            <ScrollArea.Content className="">
              <form
                id={formId}
                className="flex flex-col gap-3"
                onSubmit={handleSubmit((data) => registerOwnExperience(data))}
              >
                <Form.Input
                  type="text"
                  label="Título"
                  required
                  placeholder="ex: Monitor de Programação"
                  inputProps={register("titulo")}
                  errorMessage={formState.errors.titulo?.message}
                />
                <Form.Input
                  type="text"
                  label="Instituição"
                  required
                  placeholder="ex: UTFPR - Campus Campo Mourão"
                  inputProps={register("instituicao")}
                  errorMessage={formState.errors.instituicao?.message}
                />
                <Form.Input
                  label="Descrição"
                  className="p-0"
                  required
                  placeholder="Descreva, brevemente, as atividades desenvolvidas nesta experiência."
                  asChild
                  inputWrapperClassname="p-0"
                  inputProps={register("descricao")}
                  errorMessage={formState.errors.descricao?.message}
                >
                  <textarea className="p-3 resize-y field-sizing-content" />
                </Form.Input>
                <Controller
                  control={control}
                  name="atualExperiencia"
                  render={({
                    field: { value, onChange, ...props },
                    fieldState,
                  }) => (
                    <Form.Switch
                      {...props}
                      label="Trabalho atual"
                      onCheckedChange={onChange}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
                <div className="flex items-start gap-4 w-full max-sm:flex-col">
                  <Controller
                    name="dataInicio"
                    control={control}
                    render={({ field: { onChange, ...props }, fieldState }) => (
                      <Form.DatePicker
                        {...props}
                        value={props.value}
                        className="w-full"
                        label="Data de início"
                        required
                        onDateChange={onChange}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />

                  <Controller
                    name="dataFim"
                    control={control}
                    render={({ field: { onChange, ...props }, fieldState }) => (
                      <Form.DatePicker
                        {...props}
                        className="w-full"
                        label="Data de formação"
                        onDateChange={onChange}
                        errorMessage={fieldState.error?.message}
                        disabled={isCurrentExperience}
                      />
                    )}
                  />
                </div>
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
              Adicionar
            </Button.Root>
          </Dialog.ActionsContainer.LeftArea>
        </Dialog.ActionsContainer>
      </Dialog.Container>
    </Dialog.Root>
  );
}
