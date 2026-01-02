"use client";

import { SuitcaseIcon } from "@phosphor-icons/react/dist/ssr/Suitcase";
import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import Link from "next/link";
import React, { type PropsWithChildren, useState } from "react";
import apiVacanciesQueries from "@/api/api-vacancies-queries";
import type { ListAllVacanciesResponse } from "@/api/api-vacancies-queries/fetch-many-vacancies";
import { Alert } from "@/components/alert";
import Button from "@/components/button";
import type { APIRequestError } from "@/core/errors/api-request-error";
import { Routes } from "@/core/routes";
import { RQKeys } from "@/libs/react-query";
import { useAuth } from "@/stores/auth";
import VacancyCard from "@/ui/vacancy-card";

export function Vacancies() {
  const user = useAuth((state) => state.user);
  const [mayRetry, SetMayRetry] = useState(true);
  const {
    data: queryResult,
    error,
    isError,
    isLoading,
    isPending,
    isSuccess,
    refetch,
  } = useQuery<ListAllVacanciesResponse, APIRequestError>({
    queryKey: RQKeys.vacancies.list(),
    queryFn: () => apiVacanciesQueries.fetchMany(),
    retry: (count, error) => {
      if (error.status === HttpStatusCode.Unauthorized) {
        SetMayRetry(false);
        return false;
      }

      return count <= 3;
    },
  });

  if (isLoading || isPending)
    return (
      <VacanciesContainer>
        <VacancyCard.Skeleton />
        <VacancyCard.Skeleton />
        <VacancyCard.Skeleton />
      </VacanciesContainer>
    );

  if (isError) {
    return (
      <Alert
        variant="danger"
        title={error.message}
        content={
          mayRetry ? (
            <button type="button" onClick={() => refetch()}>
              Tentar novamente
            </button>
          ) : undefined
        }
      />
    );
  }

  if (!isSuccess) return null;

  if (!queryResult.data?.length) {
    return (
      <Alert variant="default" content="Ainda não existem vagas publicadas!" />
    );
  }

  return (
    <VacanciesContainer>
      {queryResult.data.map((vacancy) => {
        const isUserThePublisher = user?.id === vacancy.publicador.id;
        return (
          <VacancyCard.Root key={`vacancy-card-${vacancy.id}`}>
            <VacancyCard.Header
              isUserThePublisher={isUserThePublisher}
              publisherName={vacancy.publicador.nome}
              title={vacancy.titulo}
              publisherProfilePicutreUrl={vacancy.publicador.fotoPerfil}
            />
            <VacancyCard.Details
              acceptsBeginners={vacancy.isIniciante}
              isRemote={vacancy.aceitaRemoto}
              locale={vacancy.localDaVaga}
            />
            <VacancyCard.Content description={vacancy.descricao} />
            <VacancyCard.Competences
              vacancyId={vacancy.id}
              competences={vacancy.competencias}
            />
            <VacancyCard.Footer>
              {isUserThePublisher && (
                /* TODO: add button to show candidatures */
                <React.Fragment />
              )}

              <Button.Root
                className="justify-self-end w-fit place-self-end"
                asChild
              >
                <Link
                  href={Routes.candidatures.apply(vacancy.id)}
                  scroll={false}
                >
                  <Button.Icon icon={SuitcaseIcon} />
                  Candidatar-se
                </Link>
              </Button.Root>
            </VacancyCard.Footer>
          </VacancyCard.Root>
        );
      })}
    </VacanciesContainer>
  );
}

function VacanciesContainer({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-3">{children}</div>;
}
