import { PencilIcon } from "@phosphor-icons/react/dist/ssr/Pencil";
import { TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import Button from "@/components/button";
import { Heading } from "@/components/heading";
import type { Experiencia } from "@/core/types/value-objects/experiencia";

const formatter = Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" });

type Props = { experience: Experiencia; userOwnsProfile: boolean };

export function Experience({ experience, userOwnsProfile }: Props) {
  const startDate = formatter.format(new Date(experience.dataInicio));
  const endDate =
    experience.atualExperiencia || !experience.dataFim
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
          <Button.Root size="sm" variant="ghost" color="destructive">
            <Button.Icon icon={TrashIcon} /> Excluir
          </Button.Root>

          <Button.Root size="sm" variant="ghost">
            <Button.Icon icon={PencilIcon} /> Editar
          </Button.Root>
        </div>
      )}
    </div>
  );
}
