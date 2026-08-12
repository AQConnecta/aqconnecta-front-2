import { ReadCvLogoIcon } from "@phosphor-icons/react/dist/ssr/ReadCvLogo";
import type { ReactElement } from "react";
import { Alert } from "@/components/alert";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { useListUsersExperiences } from "@/hooks/experiences/list-users-experiences";
import { SectionContainer } from "../section-container";
import { SectionSkeleton } from "../skeleton";
import { CreateExperienceFormDialog } from "./create-experience-form";
import { Experience } from "./experience-card";

type Props = {
  authUser: Usuario | null;
  completeUser: UsuarioCompleto;
  userOwnsProfile: boolean;
};

export function ExperiencesSection({
  completeUser,
  userOwnsProfile,
  authUser,
}: Props) {
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
            authUser={authUser}
            experience={experience}
            completeUser={completeUser}
            userOwnsProfile={userOwnsProfile}
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
        <CreateExperienceFormDialog
          authUser={authUser}
          completeUser={completeUser}
        />
      }
    >
      {content}
    </SectionContainer>
  );
}
