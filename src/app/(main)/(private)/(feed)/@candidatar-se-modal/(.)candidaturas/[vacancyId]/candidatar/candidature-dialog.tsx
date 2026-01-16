"use client";

import { useRouter } from "next/navigation";
import { type ReactElement, useEffect, useId, useState } from "react";
import type { PresentedVacancy } from "@/api/types/presented-vacancy";
import { CandidatureForm } from "@/app/(main)/(private)/candidaturas/[vacancyId]/candidatar/candidature-form";
import { CandidatureFormSkeleton } from "@/app/(main)/(private)/candidaturas/[vacancyId]/candidatar/candidature-form-skeleton";
import { Alert } from "@/components/alert";
import Button from "@/components/button";
import Dialog from "@/components/dialog";
import { useFindVacancyById } from "@/hooks/vacancies/find-by-id";
import { useAuth } from "@/stores/auth";

type Props = {
  vacancyId: PresentedVacancy["id"];
};

export function CandidatureDialog({ vacancyId }: Props) {
  const formId = useId();
  const user = useAuth().user;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const { data: response, error, status } = useFindVacancyById({ vacancyId });
  useEffect(() => setIsOpen(true), []);

  let content: ReactElement;
  switch (status) {
    case "success": {
      const vacancy = response.data!;
      content = (
        <>
          <Dialog.Header title={`Candidatar-se para ${vacancy.titulo}`} />

          <Dialog.Description className="mb-3">
            Selecione um currículo para se candidatar a esta vaga.
          </Dialog.Description>

          {user !== null ? (
            <CandidatureForm
              formId={formId}
              vacancyId={vacancy.id}
              resumes={user.curriculo}
              cancelButton={
                <Dialog.Close asChild>
                  <Button.Root variant="ghost-primary">Cancelar</Button.Root>
                </Dialog.Close>
              }
            />
          ) : (
            <Alert
              variant="danger"
              title="Você está deslogado"
              content="Precisa estar logado para poder se candidatar."
            />
          )}
        </>
      );
      break;
    }
    case "error":
      content = (
        <>
          <Dialog.Header title="Algo deu errado!" />

          <Dialog.Description className="mb-3 sr-only">
            Houve um erro enquanto buscávamos a vaga desejada.
          </Dialog.Description>

          <Alert variant="danger" content={error.message} />
        </>
      );
      break;
    default:
      content = (
        <>
          <Dialog.Header title="Carregando detalhes da vaga..." />
          <CandidatureFormSkeleton />
        </>
      );
      break;
  }

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setTimeout(() => router.back(), 200);
      }}
    >
      <Dialog.Container className="w-full max-w-lg">{content}</Dialog.Container>
    </Dialog.Root>
  );
}
