"use client";

import { ScrollArea } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr/Pencil";
import { HttpStatusCode } from "axios";
import { useEffect, useEffectEvent, useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { EditOwnEducationResponse } from "@/api/api-education-queries/edit-own-education";
import type { PresentedExperience } from "@/api/types/presented-experience";
import Button from "@/components/button";
import Dialog from "@/components/dialog";
import Form from "@/components/form";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { useEditOwnExperience } from "@/hooks/experiences/edit-own-experience";
import { experienceFormSchema } from "./schema";

type Props = {
  authUser: Usuario | null;
  completeUser: UsuarioCompleto;
  experience: PresentedExperience;
};

export function EditExperienceFormDialog({
  authUser,
  completeUser,
  experience,
}: Props) {
  const formId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const { register, reset, control, watch, setValue, handleSubmit, formState } =
    useForm({
      resolver: zodResolver(experienceFormSchema),
      values: {
        titulo: experience.titulo,
        descricao: experience.descricao,
        instituicao: experience.instituicao,
        atualExperiencia: experience.corrente,
        dataInicio: new Date(experience.dataInicio),
        dataFim: experience.dataFim ? new Date(experience.dataFim) : undefined,
      },
    });

  const { isPending, mutate: registerSelfExperience } = useEditOwnExperience({
    authUser,
    completeUser,
    onSuccess: () => {
      toast.success("Experiência profissional atualizada com sucesso.");
      setIsOpen(false);
    },
    onError: (error: APIRequestError) => {
      const status = error.status as EditOwnEducationResponse["status"];

      if (status === HttpStatusCode.NotFound) {
        return toast.error(
          "Não foi possível encontrar essa experiência no sistema.",
        );
      }

      toast.error(error.message);
    },
  });

  const isCurrentExperience = watch("atualExperiencia");

  useEffect(() => {
    if (!isCurrentExperience) return;

    // seria MARAVILHOSO e LINDO por `undefined` aqui, mas vai causar bug:
    // o setValue, vendo o `undefined`, ao invés de setar o valor, na verdade,
    // vai resetar (e no caso, resetar significa colocar a data que já está
    // na experiência, já que é o que colocamos no campo `values` no hook
    // `useForm`... só funcionaria se a experiência já tivesse dataFim como
    // undefined).
    //
    // essa gambiarra funciona porque o Form.DatePicker e o schema estão ambos
    // preparados pra lidar com "" como sendo data undefined
    setValue("dataFim", "" as unknown as Date, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [isCurrentExperience, setValue]);

  const resetFormValues = useEffectEvent(() => reset());

  useEffect(() => {
    if (isOpen) resetFormValues();
  }, [isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button.Root size="sm" variant="ghost">
          <Button.Icon icon={PencilIcon} /> Editar
        </Button.Root>
      </Dialog.Trigger>
      <Dialog.Container className="flex flex-col">
        <Dialog.Header
          title={`Editar experiência "${experience.titulo}"`}
          className="capitalize"
        />

        <ScrollArea.Root className="relative flex-1 min-h-0 overflow-hidden flex flex-col ">
          <ScrollArea.Viewport className="flex-1 min-h-0 overflow-y-auto p-1">
            <ScrollArea.Content className="">
              <form
                id={formId}
                className="flex flex-col gap-3"
                onSubmit={handleSubmit((data) =>
                  registerSelfExperience({ ...data, id: experience.id }),
                )}
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
                      checked={value}
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
              Atualizar
            </Button.Root>
          </Dialog.ActionsContainer.LeftArea>
        </Dialog.ActionsContainer>
      </Dialog.Container>
    </Dialog.Root>
  );
}
