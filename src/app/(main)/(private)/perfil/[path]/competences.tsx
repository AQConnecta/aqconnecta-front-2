import { MedalIcon } from "@phosphor-icons/react/dist/ssr/Medal";
import type { ReactNode } from "react";
import { Alert } from "@/components/alert";
import { Badge } from "@/components/badge";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { SectionContainer } from "./section-container";

type Props = {
  completeUser: UsuarioCompleto;
  userOwnsProfile: boolean;
};

export function CompetencesSection({ completeUser, userOwnsProfile }: Props) {
  const hasNoCompetences = completeUser.competencias.length === 0;

  if (userOwnsProfile && hasNoCompetences) {
    return (
      <Wrapper userOwnsProfile={userOwnsProfile}>
        <Alert variant="warning" title="Você ainda não possui competências!" />
      </Wrapper>
    );
  }

  if (hasNoCompetences) return null;

  return (
    <Wrapper userOwnsProfile={userOwnsProfile}>
      <div className="flex flex-wrap gap-2">
        {completeUser.competencias.map((competencia) => (
          <Badge
            key={`user-${completeUser.id}-competences-${competencia.id}`}
            variant="default"
          >
            {competencia.descricao}
          </Badge>
        ))}
      </div>
    </Wrapper>
  );
}

function Wrapper({
  children,
  userOwnsProfile,
}: {
  children: ReactNode;
  userOwnsProfile: boolean;
}) {
  return (
    <SectionContainer
      shouldShowEditButton={userOwnsProfile}
      icon={MedalIcon}
      title="Competências"
      actionContent={
        <SectionContainer.EditButton editButtonLabel="Editar suas competências" />
      }
    >
      {children}
    </SectionContainer>
  );
}
