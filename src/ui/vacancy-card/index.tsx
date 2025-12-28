import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import { SuitcaseIcon } from "@phosphor-icons/react/dist/ssr/Suitcase";
import Link from "next/link";
import type { PresentedVacancy } from "@/api/types/presented-vacancy";
import Avatar from "@/components/avatar";
import { Badge } from "@/components/badge";
import Button from "@/components/button";
import { Routes } from "@/core/routes";
import { useAuth } from "@/stores/auth";

type Props = {
  vacancy: PresentedVacancy;
};

export function VacancyCard({ vacancy }: Props) {
  const user = useAuth((state) => state.user);
  const isUserThePublisher = user?.id === vacancy.publicador.id;

  return (
    <div className="card">
      <header className="mb-10 flex gap-3 items-start">
        <Link href={"#"}>
          <Avatar.Root>
            {vacancy.publicador.fotoPerfil && (
              <Avatar.Image src={vacancy.publicador.fotoPerfil} />
            )}
            <Avatar.Fallback name={vacancy.publicador.nome} />
          </Avatar.Root>
        </Link>
        <div className="flex flex-col gap-1">
          <span className="font-medium">{vacancy.titulo}</span>
          <span className="text-sm text-gray-750">
            Criado por{" "}
            <Link href={"#"}>
              {isUserThePublisher ? "você" : vacancy.publicador.nome}
            </Link>
          </span>
          {/* TODO: add context menu */}
        </div>
      </header>

      <div className="mb-5 text-sm flex items-center gap-3">
        <span className="flex items-center gap-1 text-gray-700">
          <MapPinIcon size={16} weight="bold" /> {vacancy.localDaVaga}
        </span>

        {vacancy.aceitaRemoto && <Badge variant="green">Vaga remota</Badge>}
        {vacancy.isIniciante && <Badge variant="blue">Iniciante</Badge>}
      </div>

      <p className="text-sm leading-5 mb-5">{vacancy.descricao}</p>

      <div className="mb-5 p-3 rounded-lg bg-gray-50">
        <span className="block font-medium text-sm mb-2">Competências</span>
        <div className="flex gap-2">
          {vacancy.competencias.map((competency) => (
            <Badge key={`vacancy-${vacancy.id}-competency-${competency.id}`}>
              {competency.descricao}
            </Badge>
          ))}
        </div>
      </div>

      <hr className="-mx-6 mb-6 text-black/10" />

      <div className="grid grid-flow-col items-center">
        {isUserThePublisher && (
          <>{/* TODO: add button to show candidatures */}</>
        )}

        <Button.Root className="justify-self-end w-fit place-self-end" asChild>
          <Link href={Routes.candidatures.apply(vacancy.id)}>
            <Button.Icon icon={SuitcaseIcon} />
            Candidatar-se
          </Link>
        </Button.Root>
      </div>
    </div>
  );
}
