import { ReadCvLogoIcon } from "@phosphor-icons/react/dist/ssr/ReadCvLogo";
import type { ReactElement } from "react";
import { Alert } from "@/components/alert";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { useListUsersExperiences } from "@/hooks/experiences/list-users-experiences";
import { SectionContainer } from "../section-container";
import { SectionSkeleton } from "../skeleton";
import { Experience } from "./experience-card";

type Props = {
  completeUser: UsuarioCompleto;
  userOwnsProfile: boolean;
};

export function Experiences({ completeUser, userOwnsProfile }: Props) {
  const { error, isError, isLoading, data } = useListUsersExperiences({
    userId: completeUser.id,
  });

  if (isLoading) return <SectionSkeleton className="h-36" titleChars={30} />;

  let content: ReactElement | null = null;

  if (isError) {
    content = (
      <Alert
        variant="danger"
        title="Não foi possível carregar as experiências do usuário."
        content={error?.message}
      />
    );
  } else {
    const experiences = data!.data!;
    const hasNoExperiences = experiences.length === 0;

    content = hasNoExperiences ? (
      <Alert variant="warning" title="Você ainda não registrou experiências." />
    ) : (
      <div className="divide-y divide-gray-200">
        {experiences.map((experience) => (
          <Experience
            key={`user-profile-${completeUser.id}-experiences-${experience.id}`}
            experience={experience}
          />
        ))}
      </div>
    );
  }

  return (
    <SectionContainer
      icon={ReadCvLogoIcon}
      title="Experiências"
      shouldShowEditButton={userOwnsProfile}
      actionContent={
        <SectionContainer.EditButton editButtonLabel="Editar suas experiências acadêmicas e/ou profissionalizantes" />
      }
    >
      {content}
    </SectionContainer>
  );
}
