"use client";

import { useParams } from "next/navigation";
import type { ReactElement } from "react";
import { Alert } from "@/components/alert";
import Button from "@/components/button";
import { Heading } from "@/components/heading";
import { Main } from "@/components/main";
import { useFetchVacancyCandidatures } from "@/hooks/vacancies/fetch-vacancy-candidatures";
import { useFindVacancyById } from "@/hooks/vacancies/find-by-id";
import CandidatureCard from "@/ui/candidature-card";

export default function ViewCandidatures() {
  const { vacancyId } = useParams();

  const fetchVacancy = useFindVacancyById({ vacancyId: vacancyId?.toString() });
  const fetchCandidatures = useFetchVacancyCandidatures({
    vacancyId: vacancyId?.toString(),
  });

  return (
    <Main>
      <Header className="mb-4" query={fetchVacancy} />
      <Candidatures query={fetchCandidatures} />
    </Main>
  );
}

type CandidaturesProps = {
  query: ReturnType<typeof useFetchVacancyCandidatures>;
};
function Candidatures({ query }: CandidaturesProps) {
  if (query.status === "error") {
    return <Alert variant="danger" content={query.error.message} />;
  }

  let content: ReactElement | ReactElement[];

  if (query.status === "pending") {
    content = (
      <>
        <CandidatureCard.Skeleton />
        <CandidatureCard.Skeleton />
        <CandidatureCard.Skeleton />
        <CandidatureCard.Skeleton />
      </>
    );
  } else {
    const candidatures = query.data.data!;
    if (candidatures.length > 0) {
      content = candidatures.map((candidature) => (
        <CandidatureCard.Root
          className="card p-4 py-5"
          key={`candidature-${candidature.id}-card-for-${candidature.usuario.id}`}
        >
          <CandidatureCard.Avatar user={candidature.usuario} />
          <CandidatureCard.Content candidature={candidature} />
        </CandidatureCard.Root>
      ));
    } else {
      content = (
        <Alert
          variant="warning"
          content="Ainda não existem candidaturas para esta vaga."
        />
      );
    }
  }

  return <div className="flex flex-col gap-3">{content}</div>;
}

type TitleProps = {
  query: ReturnType<typeof useFindVacancyById>;
  className?: string;
};
function Header({ query, className }: TitleProps) {
  if (query.status === "error")
    return (
      <header className={className}>
        <Heading className="mb-3">
          Não foi possível carregar detalhes desta vaga.
        </Heading>
        <Alert
          variant="danger"
          content={
            <div className="w-full flex justify-between gap-3 items-start">
              <span>{query.error.message}</span>

              <Button.Root
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => query.refetch()}
              >
                Tentar novamente
              </Button.Root>
            </div>
          }
        />
      </header>
    );

  if (query.status === "pending") {
    return (
      <Heading className={className}>Carregando informações da vaga...</Heading>
    );
  }

  const vacancy = query.data.data!;

  return (
    <header className={className}>
      <Heading>{vacancy.titulo} - Candidaturas</Heading>
      <p>Confira os candidatos para a vaga {vacancy.titulo} abaixo.</p>
    </header>
  );
}
