import { UsersIcon } from "@phosphor-icons/react/dist/ssr/Users";
import Link from "next/link";
import Button from "@/components/button";
import { Routes } from "@/core/routes";
import type { Vaga } from "@/core/types/vaga";

type Props = {
  userIsThePublisher: boolean;
  vacancyId: Vaga["id"];
};

export function VacancyCardSeeCandidaturesButton({
  userIsThePublisher,
  vacancyId,
}: Props) {
  if (!userIsThePublisher) return null;

  return (
    <Button.Root asChild className="justify-self-start" variant="ghost">
      <Link href={Routes.candidatures.view(vacancyId)}>
        <Button.Icon icon={UsersIcon} />
        Ver candidatos
      </Link>
    </Button.Root>
  );
}
