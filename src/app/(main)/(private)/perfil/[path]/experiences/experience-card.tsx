import type { PresentedExperience } from "@/api/types/presented-experience";
import { Heading } from "@/components/heading";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { DeleteExperienceDialog } from "./delete-experience";
import { EditExperienceFormDialog } from "./edit-experience-form";

const formatter = Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" });

type Props = {
  experience: PresentedExperience;
  userOwnsProfile: boolean;
  authUser: Usuario | null;
  completeUser: UsuarioCompleto;
};

export function Experience({
  authUser,
  experience,
  completeUser,
  userOwnsProfile,
}: Props) {
  const startDate = formatter.format(new Date(experience.dataInicio));
  const endDate =
    experience.corrente || !experience.dataFim
      ? "Presente"
      : formatter.format(new Date(experience.dataFim));

  return (
    <div className="not-last-of-type:pb-3 not-first-of-type:mt-3 wrap-break-word">
      <Heading level={4} as="h3" className="mb-1">
        {experience.titulo}
      </Heading>

      <ul className="list-none font-light flex flex-col gap-1 mb-3">
        <li>{experience.instituicao}</li>
        <li>
          {startDate} - {endDate}
        </li>
      </ul>

      <p className="user-text-area">{experience.descricao}</p>

      {userOwnsProfile && (
        <div className="mt-2 flex items-center justify-end gap-2">
          <DeleteExperienceDialog
            authUser={authUser}
            completeUser={completeUser}
            experienceId={experience.id}
            title={experience.titulo}
          />

          <EditExperienceFormDialog
            authUser={authUser}
            completeUser={completeUser}
            experience={experience}
          />
        </div>
      )}
    </div>
  );
}
