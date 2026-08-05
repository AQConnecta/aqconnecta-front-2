"use client";

import { useRouter } from "next/navigation";
import { type ReactElement, useEffect, useState } from "react";
import type { PresentedVacancy } from "@/api/types/presented-vacancy";
import { CandidatureFormSkeleton } from "@/app/(main)/(private)/candidaturas/[vacancyId]/candidatar/candidature-form-skeleton";
import { Alert } from "@/components/alert";
import Dialog from "@/components/dialog";
import { Routes } from "@/core/routes";
import type { Usuario } from "@/core/types/usuario";
import { useFetchVacancyCandidatures } from "@/hooks/vacancies/fetch-vacancy-candidatures";
import CandidatureCard from "@/ui/candidature-card";
import { DialogHeader } from "./dialog-header";

const DIALOG_CLOSE_ANIMATION_DURATION_MS = 200;

type Props = {
  vacancyId: PresentedVacancy["id"];
};

export function ViewCandidaturesDialog({ vacancyId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const onGoToUserProfile = (user: Usuario) => {
    setIsOpen(false);
    setTimeout(() => {
      router.push(Routes.users.profile(user.userUrl));
    }, DIALOG_CLOSE_ANIMATION_DURATION_MS);
  };

  const {
    data: response,
    error,
    status,
  } = useFetchVacancyCandidatures({ vacancyId });

  useEffect(() => setIsOpen(true), []);

  let content: ReactElement;
  switch (status) {
    case "success": {
      const candidatures = response.data!;
      content = (
        <>
          <DialogHeader vacancyId={vacancyId} />

          {candidatures.length > 0 ? (
            <div className="divide-y divide-black/15">
              {candidatures.map((candidature) => (
                <CandidatureCard.Root
                  key={`vacancy-${vacancyId}-candidature-${candidature.id}`}
                >
                  <CandidatureCard.Content
                    candidature={candidature}
                    onGoToUserProfile={onGoToUserProfile}
                  />
                  <CandidatureCard.Avatar
                    user={candidature.usuario}
                    onGoToUserProfile={onGoToUserProfile}
                  />
                </CandidatureCard.Root>
              ))}
            </div>
          ) : (
            <Alert
              variant="warning"
              content="Ainda não há nenhuma candidatura para esta vaga."
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
            Houve um erro carregávamos os dados desta vaga.
          </Dialog.Description>

          <Alert variant="danger" content={error.message} />
        </>
      );
      break;
    default:
      content = (
        <>
          <Dialog.Header title="Buscando candidatos desta vaga..." />
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
        if (!open)
          setTimeout(() => router.back(), DIALOG_CLOSE_ANIMATION_DURATION_MS);
      }}
    >
      <Dialog.Container className="w-full max-w-lg">{content}</Dialog.Container>
    </Dialog.Root>
  );
}
