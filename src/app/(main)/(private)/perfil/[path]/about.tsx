import { SparkleIcon } from "@phosphor-icons/react/dist/ssr/Sparkle";
import type { ReactNode } from "react";
import { Alert } from "@/components/alert";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { SectionContainer } from "./section-container";

type Props = {
  completeUser: UsuarioCompleto;
  isUserOwnProfile: boolean;
};

export function About({ completeUser, isUserOwnProfile }: Props) {
  if (!completeUser.descricao && isUserOwnProfile) {
    return (
      <Wrapper shouldShowEditButton={isUserOwnProfile}>
        <Alert variant="warning" title="Você ainda não tem uma bio." />
      </Wrapper>
    );
  }

  if (!completeUser.descricao) return null;

  return (
    <Wrapper shouldShowEditButton={isUserOwnProfile}>
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
