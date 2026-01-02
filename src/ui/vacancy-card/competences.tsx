import { Badge } from "@/components/badge";
import type { Competencia } from "@/core/types/competencia";

type Props = { competences: Competencia[]; vacancyId: string };

export function VacancyCardCompetences({ competences, vacancyId }: Props) {
  if (competences.length <= 0) return null;
  return (
    <div className="mb-5 p-3 rounded-lg bg-gray-50">
      <span className="block font-medium text-sm mb-2">Competências</span>
      <div className="flex gap-2">
        {competences.map((competency) => (
          <Badge key={`vacancy-${vacancyId}-competency-${competency.id}`}>
            {competency.descricao}
          </Badge>
        ))}
      </div>
    </div>
  );
}
