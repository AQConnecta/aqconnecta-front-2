import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr/Envelope";
import { Badge } from "@/components/badge";
import Button from "@/components/button";
import type { Usuario } from "@/core/types/usuario";
import type { Candidatura } from "@/core/types/value-objects/candidatura";

type Props = {
  candidature: Candidatura;
  onGoToUserProfile: (user: Usuario) => void;
};

export function CandidatureCardContent({
  candidature,
  onGoToUserProfile,
}: Props) {
  return (
    <div className="[grid-area:content]">
      <div className="flex items-center justify-between gap-3 mb-1">
        <button
          className="text-base font-medium hover:text-primary-800"
          onClick={() => onGoToUserProfile(candidature.usuario)}
          type="button"
        >
          {candidature.usuario.nome}
        </button>

        <Button.Root
          variant="outline"
          size="sm"
          onClick={() => onGoToUserProfile(candidature.usuario)}
          type="button"
        >
          <Button.Icon icon={ArrowSquareOutIcon} />
          Ver perfil
        </Button.Root>
      </div>

      {candidature.usuario.descricao && (
        <p className="text-sm text-gray-700 mb-3">
          {candidature.usuario.descricao}
        </p>
      )}
      <div className="flex gap-1 items-center mb-2">
        <EnvelopeIcon size={16} weight="bold" className="text-gray-500" />
        <a
          href={`mailto:${candidature.usuario.email}`}
          target="_blank"
          rel="noopener"
          className="leading-normal"
        >
          {candidature.usuario.email}
        </a>
      </div>
      <div className="flex flex-row gap-1 flex-wrap">
        {candidature.usuario.competencias.map((competencia) => (
          <Badge
            variant="default"
            key={`candidature-card-$candidature.id-$candidature.usuario.id-$competencia.id`}
          >
            {competencia.descricao}
          </Badge>
        ))}
      </div>
    </div>
  );
}
