"use client";

import { ScrollArea } from "@base-ui/react";
import { GraduationCapIcon } from "@phosphor-icons/react/dist/ssr/GraduationCap";
import { Alert } from "@/components/alert";
import Button from "@/components/button";
import Dialog from "@/components/dialog";
import Form from "@/components/form";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import type { FormacaoAcademica } from "@/core/types/value-objects/formacao-academica";
import { SectionContainer } from "./section-container";
import { UniversitiesCombobox } from "./universities-combobox";

type Props = {
  completeUser: UsuarioCompleto;
  userOwnsProfile: boolean;
};

export function Education({ completeUser, userOwnsProfile }: Props) {
  const hasNoAcademicBackgronud = completeUser.formacoesAcademicas.length === 0;

  const content = hasNoAcademicBackgronud ? (
    <Alert
      variant="warning"
      title="Você ainda não adicionou nenhuma formação acadêmica."
    />
  ) : (
    <div className="divide-y divide-gray-200">
      {completeUser.formacoesAcademicas.map((item) => (
        <AcademicTraining
          key={`user-profile-${completeUser.id}-academic-training-${item.id}`}
          item={item}
        />
      ))}
    </div>
  );

  return (
    <SectionContainer
      icon={GraduationCapIcon}
      title="Formação Acadêmica"
      shouldShowEditButton={userOwnsProfile}
      actionContent={<CreateDialog />}
    >
      {content}
    </SectionContainer>
  );
}

const dateFormatter = Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" });

function AcademicTraining({ item }: { item: FormacaoAcademica }) {
  const startDate = dateFormatter.format(new Date(item.dataInicio));
  const endDate =
    item.atualFormacao || !item.dataFim
      ? "Presente"
      : dateFormatter.format(new Date(item.dataFim));

  return (
    <div className="not-last-of-type:pb-3 not-first-of-type:mt-3">
      <p className="mb-1">
        <span className="font-medium">{item.universidade.nomeInstituicao}</span>
        - {item.descricao}
      </p>
      <span className="font-light">
        {startDate} - {endDate}
      </span>
    </div>
  );
}

function CreateDialog() {
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
              <form className="flex flex-col gap-3">
                <UniversitiesCombobox />

                <Form.Input
                  type="text"
                  label="Diploma"
                  required
                  placeholder="ex: Bacharelado em Ciência da Computação"
                />

                <Form.Input
                  type="textarea"
                  label="Descrição"
                  className="p-0"
                  required
                  placeholder="Descreva o curso, grau de instrução, etc."
                  asChild
                  inputWrapperClassname="p-0"
                >
                  <textarea className="p-3 resize-y" />
                </Form.Input>

                <Form.Switch label="Formação atual" />

                <div className="flex items-start gap-4 w-full max-sm:flex-col">
                  <Form.DatePicker
                    className="w-full"
                    label="Data de início"
                    required
                  />
                  <Form.DatePicker
                    className="w-full"
                    label="Data de formação"
                    required
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
            <Button.Root variant="default" color="primary">
              Adicionar
            </Button.Root>
          </Dialog.ActionsContainer.LeftArea>
        </Dialog.ActionsContainer>
      </Dialog.Container>
    </Dialog.Root>
  );
}
