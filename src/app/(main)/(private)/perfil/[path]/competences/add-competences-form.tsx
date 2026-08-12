"use client";

import { ScrollArea } from "@base-ui/react";
import {
  type SubmitEventHandler,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react";
import { Badge } from "@/components/badge";
import Button from "@/components/button";
import Dialog from "@/components/dialog";
import type { Competencia } from "@/core/types/competencia";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { useAddOwnCompetences } from "@/hooks/competences/add-own-competences";
import { SectionContainer } from "../section-container";
import { CompetencesCombobox } from "./competences-combobox";

type Props = {
  authUser: Usuario | null;
  completeUser: UsuarioCompleto;
};

export function AddCompetencesFormDialog({ authUser, completeUser }: Props) {
  const formId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCompetences, setSelectedCompetences] = useState<Competencia[]>(
    [],
  );
  const [serverError, setServerError] = useState<string>();

  const { isPending, mutate: addCompetences } = useAddOwnCompetences({
    authUser,
    completeUser,
    onMutate: () => setServerError(undefined),
    onSuccess: () => setIsOpen(false),
    onError: (error) => setServerError(error.message),
  });

  useEffect(() => {
    if (!isOpen) setSelectedCompetences([]);
  }, [isOpen]);

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      const competenceIdsToDelete = selectedCompetences.map(
        (competences) => competences.id,
      );
      addCompetences({ competenceIdsToDelete });
    },
    [addCompetences, selectedCompetences],
  );

  const handleSelect = useCallback((competences: Competencia[]) => {
    setServerError(undefined);
    setSelectedCompetences(competences);
  }, []);

  const handleUnselect = useCallback(
    (removedCompetence: Competencia) => {
      const newSelectedCompetences = selectedCompetences.filter(
        (competence) => competence.id !== removedCompetence.id,
      );
      setSelectedCompetences(newSelectedCompetences);
    },
    [selectedCompetences],
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <SectionContainer.AddButton addButtonLabel="Adicionar novas competências" />
      </Dialog.Trigger>
      <Dialog.Container className="flex flex-col">
        <Dialog.Header
          title="Adicionar novas competências"
          className="capitalize"
        />

        <ScrollArea.Root className="relative flex-1 min-h-0 overflow-hidden flex flex-col ">
          <ScrollArea.Viewport className="flex-1 min-h-0 overflow-y-auto p-1">
            <ScrollArea.Content className="">
              <form
                id={formId}
                className="flex flex-col gap-3"
                onSubmit={handleSubmit}
              >
                <CompetencesCombobox
                  selectedCompetences={selectedCompetences}
                  onSelectCompetences={handleSelect}
                  errorMessage={serverError}
                />

                {Boolean(selectedCompetences.length) && (
                  <div className="flex gap-2 flex-wrap">
                    {selectedCompetences.map((competence) => (
                      <Badge
                        onDelete={() => handleUnselect(competence)}
                        key={`user-new-selected-${completeUser.id}-competences-${competence.id}`}
                        variant="default"
                      >
                        {competence.descricao}
                      </Badge>
                    ))}
                  </div>
                )}
              </form>
            </ScrollArea.Content>
          </ScrollArea.Viewport>
        </ScrollArea.Root>

        <Dialog.ActionsContainer className="mt-5">
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
