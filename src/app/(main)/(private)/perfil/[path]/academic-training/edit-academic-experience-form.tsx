"use client";

import { ScrollArea } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr/Pencil";
import { HttpStatusCode } from "axios";
import { useEffect, useEffectEvent, useId, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { EditOwnEducationResponse } from "@/api/api-education-queries/edit-own-education";
import Button from "@/components/button";
import Dialog from "@/components/dialog";
import Form from "@/components/form";
import type { APIRequestError } from "@/core/errors/api-request-error";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import type { FormacaoAcademica } from "@/core/types/value-objects/formacao-academica";
import { useEditOwnEducation } from "@/hooks/education/edit-own-education";
import { academicTrainingFormSchema } from "./schema";
import { UniversitiesCombobox } from "./universities-combobox";

type Props = {
  authUser: Usuario | null;
  completeUser: UsuarioCompleto;
  formacaoAcademica: FormacaoAcademica;
};

export function EditAcademicExperienceFormDialog({
  authUser,
  completeUser,
  formacaoAcademica,
}: Props) {
  const formId = useId();
  const [isOpen, setIsOpen] = useState(false);

  const { register, reset, control, watch, setValue, handleSubmit, formState } =
    useForm({
      resolver: zodResolver(academicTrainingFormSchema),
      values: {
        universidade: { id: formacaoAcademica.universidade.id },
        descricao: formacaoAcademica.descricao,
        diploma: formacaoAcademica.diploma,
        atualFormacao: formacaoAcademica.corrente ?? undefined,
        dataInicio: new Date(formacaoAcademica.dataInicio),
        dataFim: formacaoAcademica.dataFim
          ? new Date(formacaoAcademica.dataFim)
          : undefined,
      },
    });

  const { isPending, mutate: registerSelfEducation } = useEditOwnEducation({
    authUser,
    completeUser,
    onSuccess: () => {
      toast.success("Formação acadêmica atualizada com sucesso.");
      setIsOpen(false);
    },
    onError: (error: APIRequestError) => {
      const status = error.status as EditOwnEducationResponse["status"];

      if (status === HttpStatusCode.NotFound) {
        return toast.error(
          "Não foi possível encontrar a formação acadêmica especificada.",
        );
      }

      toast.error(error.message);
    },
  });
  const isAtualFormacao = watch("atualFormacao");

  const resetFormValues = useEffectEvent(() => reset());

  useEffect(() => {
    if (isOpen) resetFormValues();
  }, [isOpen]);

  useEffect(() => {
    if (!isAtualFormacao) return;

    setValue("dataFim", undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [isAtualFormacao, setValue]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button.Root size="sm" variant="ghost">
          <Button.Icon icon={PencilIcon} /> Editar
        </Button.Root>
      </Dialog.Trigger>
      <Dialog.Container className="flex flex-col">
        <Dialog.Header
          title="Adicionar nova formação acadêmica"
          className="capitalize"
        />

        <ScrollArea.Root className="relative flex-1 min-h-0 overflow-hidden flex flex-col ">
          <ScrollArea.Viewport className="flex-1 min-h-0 overflow-y-auto p-1">
            <ScrollArea.Content className="">
              <form
                id={formId}
                className="flex flex-col gap-3"
                onSubmit={handleSubmit((data) =>
                  registerSelfEducation({ ...data, id: formacaoAcademica.id }),
                )}
              >
                <Controller
                  control={control}
                  name="universidade.id"
                  render={({ field, fieldState }) => (
                    <UniversitiesCombobox
                      {...field}
                      errorMessage={fieldState.error?.message}
                      universityId={formacaoAcademica.universidade.id}
                      onSelectUniversity={(universityId) =>
                        field.onChange(universityId)
                      }
                    />
                  )}
                />

                <Form.Input
                  type="text"
                  label="Diploma"
                  placeholder="ex: Bacharelado em Ciência da Computação"
                  inputProps={register("diploma")}
                  errorMessage={formState.errors.diploma?.message}
                />

                <Form.Input
                  label="Descrição"
                  className="p-0"
                  required
                  placeholder="Descreva o curso, grau de instrução, etc."
                  asChild
                  inputWrapperClassname="p-0"
                  inputProps={register("descricao")}
                  errorMessage={formState.errors.descricao?.message}
                >
                  <textarea className="p-3 resize-y" />
                </Form.Input>

                <Controller
                  control={control}
                  name="atualFormacao"
                  render={({
                    field: { value, onChange, ...props },
                    fieldState,
                  }) => (
                    <Form.Switch
                      {...props}
                      label="Formação atual"
                      checked={value}
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
                        disabled={watch("atualFormacao")}
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
