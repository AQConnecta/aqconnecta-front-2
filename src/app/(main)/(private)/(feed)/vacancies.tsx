"use client";

import { useQuery } from "@tanstack/react-query";
import { HttpStatusCode } from "axios";
import { type PropsWithChildren, useState } from "react";
import apiVacanciesQueries from "@/api/api-vacancies-queries";
import type { ListAllVacanciesResponse } from "@/api/api-vacancies-queries/fetch-many-vacancies";
import type { PresentedVacancy } from "@/api/types/presented-vacancy";
import { Alert } from "@/components/alert";
import type { APIRequestError } from "@/core/errors/api-request-error";
import { RQKeys } from "@/libs/react-query";
import { useAuth } from "@/stores/auth";
import { VacancyCard } from "@/ui/vacancy-card";
import { VacancyCardSkeleton } from "@/ui/vacancy-card/skeleton";

// Assumindo que a interface Competencia seja algo assim:
// interface Competencia { id: string; nome: string; }

const MOCK_PRESENTED_VACANCIES: PresentedVacancy[] = [
  {
    id: "1",
    titulo: "Desenvolvedor Backend Java",
    descricao:
      "Auxiliar no desenvolvimento do backend do sistema AQConnecta. Desejável familiaridade com a linguagem Java e Spring Boot. Desejável conhecimento em banco de dados.",
    localDaVaga: "Campo Mourão",
    aceitaRemoto: true,
    isIniciante: true,
    criadoEm: new Date("2023-10-01"), // Data fictícia
    competencias: [
      { id: "c1", descricao: "MySQL" },
      { id: "c2", descricao: "Spring Boot" },
      { id: "c3", descricao: "Java (Programming Language)" },
    ],
    publicador: {
      id: "fef61108-33f4-4587-a652-205cf6f7d49a",
      nome: "Riume",
      email: "voce@aluno.com.br",
      permissao: [
        { id: 1, descricao: "CLIENTE" },
        { id: 2, descricao: "ADMIN" },
      ],
      deletado: false,
      ativado: true,
      fotoPerfil: "https://avatars.githubusercontent.com/u/87253773?v=4",
      userUrl: "/perfil/current-user",
    },
  },
  {
    id: "2",
    titulo: "Desenvolvedor Frontend React",
    descricao:
      "Projeto de extensão focado em desenvolvimento de plataforma educacional. Buscamos estudante com conhecimento em React e TypeScript para trabalhar no frontend da aplicação.",
    localDaVaga: "São Paulo",
    aceitaRemoto: true,
    isIniciante: false,
    criadoEm: new Date("2023-10-05"),
    competencias: [
      { id: "c4", descricao: "React" },
      { id: "c5", descricao: "TypeScript" },
      { id: "c6", descricao: "Node.js" },
    ],
    publicador: {
      id: "prof-ana",
      nome: "Prof. Ana Silva",
      email: "ana.silva@universidade.edu.br",
      permissao: [
        { id: 1, descricao: "CLIENTE" },
        { id: 2, descricao: "ADMIN" },
      ],
      deletado: false,
      ativado: true,
      userUrl: "/perfil/prof-ana",
    },
  },
  {
    id: "3",
    titulo: "Desenvolvedor Full Stack - Sistema de Gestão",
    descricao:
      "Projeto de pesquisa e extensão para desenvolvimento de sistema de gestão para ONGs. Necessário conhecimento em desenvolvimento web completo.",
    localDaVaga: "Rio de Janeiro",
    aceitaRemoto: false,
    isIniciante: false,
    criadoEm: new Date("2023-10-10"),
    competencias: [
      { id: "c7", descricao: "Python" },
      { id: "c8", descricao: "Django" },
      { id: "c9", descricao: "PostgreSQL" },
      { id: "c4", descricao: "React" },
    ],
    publicador: {
      id: "prof-carlos",
      nome: "Prof. Carlos Santos",
      email: "carlos.santos@universidade.edu.br",
      permissao: [{ id: 1, descricao: "CLIENTE" }],
      deletado: false,
      ativado: true,
      userUrl: "/perfil/prof-carlos",
    },
  },
  {
    id: "4",
    titulo: "Analista de Dados - Projeto Saúde Pública",
    descricao:
      "Projeto de extensão na área de saúde pública. Buscamos estudante para auxiliar na análise de dados e desenvolvimento de dashboards.",
    localDaVaga: "Curitiba",
    aceitaRemoto: true,
    isIniciante: true,
    criadoEm: new Date("2023-10-12"),
    competencias: [
      { id: "c7", descricao: "Python" },
      { id: "c9", descricao: "PostgreSQL" },
    ],
    publicador: {
      id: "prof-maria",
      nome: "Prof. Maria Oliveira",
      email: "maria.oliveira@universidade.edu.br",
      permissao: [{ id: 1, descricao: "CLIENTE" }],
      deletado: false,
      ativado: true,
      userUrl: "/perfil/prof-maria",
    },
  },
];

export function Vacancies() {
  const auth = useAuth();
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
    queryKey: [RQKeys.vacancies, auth],
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
        <VacancyCardSkeleton />
        <VacancyCardSkeleton />
        <VacancyCardSkeleton />
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

  if (![...(queryResult.data ?? []), ...MOCK_PRESENTED_VACANCIES]?.length) {
    return (
      <Alert variant="default" content="Ainda não existem vagas publicadas!" />
    );
  }

  return (
    <VacanciesContainer>
      {[...(queryResult!.data ?? []), ...MOCK_PRESENTED_VACANCIES].map(
        (vacancy) => (
          <VacancyCard vacancy={vacancy} key={`vacancy-card-${vacancy.id}`} />
        ),
      )}
    </VacanciesContainer>
  );
}

function VacanciesContainer({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-3">{children}</div>;
}
