import { ReadCvLogoIcon } from "@phosphor-icons/react/dist/ssr/ReadCvLogo";
import { Alert } from "@/components/alert";
import { Heading } from "@/components/heading";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import type { Experiencia } from "@/core/types/value-objects/experiencia";
import { SectionContainer } from "./section-container";

type Props = {
  completeUser: UsuarioCompleto;
  isUserOwnProfile: boolean;
};

export function Experiences({ completeUser, isUserOwnProfile }: Props) {
  const hasNoExperiences = completeUser.experiencias.length === 0;

  return (
    <SectionContainer
      icon={ReadCvLogoIcon}
      title="Experiências"
      shouldShowEditButton={isUserOwnProfile}
    >
      {hasNoExperiences ? (
        <Alert
          variant="warning"
          title="Você ainda não registrou experiências."
        />
      ) : (
        <div className="divide-y divide-gray-200">
          {completeUser.experiencias.map((experience) => (
            <Experience
              key={`user-profile-${completeUser.id}-experiences-${experience.id}`}
              experience={experience}
            />
          ))}
        </div>
      )}
    </SectionContainer>
  );
}

const formatter = Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" });

function Experience({ experience }: { experience: Experiencia }) {
  const startDate = formatter.format(new Date(experience.dataInicio));
  const endDate =
    experience.atualExperiencia || !experience.dataFim
      ? "Presente"
      : formatter.format(new Date(experience.dataFim));

  return (
    <div className="not-last-of-type:pb-3 not-first-of-type:mt-3">
      <Heading level={4} as="h3" className="mb-1">
        {experience.titulo}{" "}
      </Heading>

      <ul className="list-none font-light flex flex-col gap-1 mb-3">
        <li>{experience.instituicao}</li>
        <li>
          {startDate} - {endDate}
        </li>
      </ul>

      <p>{experience.descricao}</p>
    </div>
  );
}
