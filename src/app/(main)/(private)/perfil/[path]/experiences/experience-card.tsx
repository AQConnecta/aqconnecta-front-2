import { Heading } from "@/components/heading";
import type { Experiencia } from "@/core/types/value-objects/experiencia";

const formatter = Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" });

export function Experience({ experience }: { experience: Experiencia }) {
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
