"use client";

import { HttpStatusCode } from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type ReactElement, useId } from "react";
import { Alert } from "@/components/alert";
import Button from "@/components/button";
import { Heading } from "@/components/heading";
import { Main } from "@/components/main";
import { Routes } from "@/core/routes";
import { useFindVacancyById } from "@/hooks/vacancies/find-by-id";
import { useAuth } from "@/stores/auth";
import VacancyCard from "@/ui/vacancy-card";
import { CandidatureForm } from "./candidature-form";

export default function Candidatar() {
  const user = useAuth((state) => state.user);
  const formId = useId();
  const { vacancyId } = useParams();

  const { data, error, status } = useFindVacancyById({
    vacancyId: vacancyId?.toString(),
  });

  let content: ReactElement;
  switch (status) {
    case "error": {
      const isUnauthorized = error.status === HttpStatusCode.Unauthorized;
      if (isUnauthorized) {
        content = (
          <Alert
            variant="danger"
            content={
              <>
                <p>Você precisa estar logado para candidatar-se a uma vaga.</p>
                <Link href={Routes.auth.login}>Faça login</Link>
              </>
            }
          />
        );
      } else content = <Alert variant="danger" content={error.message} />;
      break;
    }

    case "pending":
      content = <VacancyCard.Skeleton />;
      break;

    case "success": {
      const vacancy = data.data!;
      const userIsThePublisher = user?.id === vacancy.publicador.id;
      content = (
        <>
          <Heading level={1} className="mb-6">
            Candidate-se para {vacancy.titulo}
          </Heading>

          <VacancyCard.Root>
            <VacancyCard.Header
              title={vacancy.titulo}
              isUserThePublisher={userIsThePublisher}
              publisherName={vacancy.publicador.nome}
              publisherProfilePicutreUrl={vacancy.publicador.fotoPerfil}
            />
            <VacancyCard.Details
              acceptsBeginners={vacancy.isIniciante}
              isRemote={vacancy.aceitaRemoto}
              locale={vacancy.localDaVaga}
            />
            <VacancyCard.Content description={vacancy.descricao} />
            <VacancyCard.Footer>
              <CandidatureForm
                formId={formId}
                resumes={user?.curriculo ?? []}
                vacancyId={vacancy.id}
                cancelButton={
                  <Button.Root variant="outline" asChild>
                    <Link href={Routes.home}>Voltar</Link>
                  </Button.Root>
                }
              />
            </VacancyCard.Footer>
          </VacancyCard.Root>
        </>
      );
      break;
    }
  }

  return <Main>{content}</Main>;
}
