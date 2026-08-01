"use client";

import { ScrollArea } from "@base-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import Button from "@/components/button";
import Dialog from "@/components/dialog";
import Form from "@/components/form";
import { SectionContainer } from "../section-container";
import { UniversitiesCombobox } from "./universities-combobox";

const createAcademicTrainingFormSchema = z.object({
  universidade: z.object({
    id: z.uuid(
      "É necessário selecionar uma universidade dentre as disponíveis.",
    ),
  }),
  descricao: z.preprocess(
    (value) => value || undefined,
    z.string("A descrição deve ser um texto."),
  ),
  // TODO: verificar se aqui não deveria ser upload do diploma, e não apenas o link para o diploma
  diploma: z.preprocess(
    (value) => (value as string).trim() || undefined,
    z
      .string("Especifique o curso e o grau acadêmico em uma breve frase.")
      .optional(),
  ),
  dataInicio: z.date("A data de início é inválida."),
  dataFim: z.date("A data de encerramento é inválida.").optional(),
  atualFormacao: z
    .boolean("A formação atual deve ser sinalizada por um valor booleano.")
    .default(false),
});

export type CreateAcademicTrainingFormSchema = z.infer<
  typeof createAcademicTrainingFormSchema
>;

export function CreateAcademicExperienceFormDialog() {
  const formId = useId();
  const { register, control, watch, setValue, handleSubmit, formState } =
    useForm({
      resolver: zodResolver(createAcademicTrainingFormSchema),
    });

  const isAtualFormacao = watch("atualFormacao");

  useEffect(() => {
    if (!isAtualFormacao) return;

    setValue("dataFim", undefined, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [isAtualFormacao, setValue]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <SectionContainer.AddButton addButtonLabel="Adicionar nova formação acadêmica" />
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
                onSubmit={handleSubmit((data) => console.log(data))}
              >
                <Controller
                  control={control}
                  name="universidade.id"
                  render={({ field, fieldState }) => (
                    <UniversitiesCombobox
                      {...field}
                      errorMessage={fieldState.error?.message}
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
            <Dialog.Close asChild>
              <Button.Root variant="outline">Cancelar</Button.Root>
            </Dialog.Close>
            <Button.Root
              variant="default"
              color="primary"
              type="submit"
              form={formId}
            >
              Adicionar
            </Button.Root>
          </Dialog.ActionsContainer.LeftArea>
        </Dialog.ActionsContainer>
      </Dialog.Container>
    </Dialog.Root>
  );
}
