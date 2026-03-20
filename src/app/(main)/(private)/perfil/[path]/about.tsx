import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";
import type { ReactNode } from "react";
import { Alert } from "@/components/alert";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { SectionContainer } from "./section-container";

type Props = {
  completeUser: UsuarioCompleto;
  userOwnsProfile: boolean;
};

export function About({ completeUser, userOwnsProfile }: Props) {
  if (!completeUser.descricao && userOwnsProfile) {
    return (
      <Wrapper shouldShowEditButton={userOwnsProfile}>
        <Alert variant="warning" title="Você ainda não tem uma bio." />
      </Wrapper>
    );
  }

  if (!completeUser.descricao) return null;

  return (
    <Wrapper shouldShowEditButton={userOwnsProfile}>
      <p>{completeUser.descricao}</p>
    </Wrapper>
  );
}

function Wrapper({
  children,
  shouldShowEditButton,
}: {
  children: ReactNode;
  shouldShowEditButton: boolean;
}) {
  return (
    <SectionContainer
      icon={SparkleIcon}
      title="Sobre"
      shouldShowEditButton={shouldShowEditButton}
    >
      {children}
    </SectionContainer>
  );
}
