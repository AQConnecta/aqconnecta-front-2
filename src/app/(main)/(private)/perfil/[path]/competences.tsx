import { MedalIcon } from "@phosphor-icons/react/dist/ssr/Medal";
import type { ReactNode } from "react";
import { Alert } from "@/components/alert";
import { Badge } from "@/components/badge";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { SectionContainer } from "./section-container";

type Props = {
  completeUser: UsuarioCompleto;
  isUserOwnProfile: boolean;
};

export function Competences({ completeUser, isUserOwnProfile }: Props) {
  const hasNoCompetences = completeUser.competencias.length === 0;

  if (isUserOwnProfile && hasNoCompetences) {
    return (
      <Wrapper isUserOwnProfile={isUserOwnProfile}>
        <Alert variant="warning" title="Você ainda não possui competências!" />
      </Wrapper>
    );
  }

  if (hasNoCompetences) return null;

  return (
    <Wrapper isUserOwnProfile={isUserOwnProfile}>
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
  isUserOwnProfile,
}: {
  children: ReactNode;
  isUserOwnProfile: boolean;
}) {
  return (
    <SectionContainer
      shouldShowEditButton={isUserOwnProfile}
      icon={MedalIcon}
      title="Competências"
    >
      {children}
    </SectionContainer>
  );
}
