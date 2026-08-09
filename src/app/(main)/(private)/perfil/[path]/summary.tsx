import type { Icon } from "@phosphor-icons/react";
import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr/Envelope";
import { GithubLogoIcon } from "@phosphor-icons/react/dist/ssr/GithubLogo";
import { GraduationCapIcon } from "@phosphor-icons/react/dist/ssr/GraduationCap";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr/LinkedinLogo";
import { MapPinIcon } from "@phosphor-icons/react/dist/ssr/MapPin";
import { PhoneIcon } from "@phosphor-icons/react/dist/ssr/Phone";
import Avatar from "@/components/avatar";
import { Heading } from "@/components/heading";
import IconButton from "@/components/icon-button";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import type { Endereco } from "@/core/types/value-objects/endereco";
import { useAuth } from "@/stores/auth";
import { SectionContainer } from "./section-container";

type Props = {
  completeUser: UsuarioCompleto;
  userOwnsProfile: boolean;
};

export function SummarySection({ completeUser, userOwnsProfile }: Props) {
  const firstAddress: Endereco | undefined = completeUser.enderecos[0];

  const authUserIsAdmin = useAuth((state) => state.userIsAdmin());
  const canSeeEmail = userOwnsProfile || authUserIsAdmin;

  const hasAnySocialMedia = Boolean(
    completeUser.githubProfileUrl ||
      completeUser.curriculoLattesUrl ||
      completeUser.linkedinProfileUrl,
  );

  return (
    <section className="card flex flex-col items-center gap-4">
      {userOwnsProfile && (
        <SectionContainer.EditButton editButtonLabel="Editar informações do perfil" />
      )}

      <Avatar.Root className="size-32">
        <Avatar.Fallback name={completeUser.nome} />
        <Avatar.Image src={completeUser.fotoPerfil ?? undefined} />
      </Avatar.Root>

      <Heading level={1} as="h1" className="text-center">
        <span className="sr-only">Perfil de </span>
        {completeUser.nome}
      </Heading>

      <ul className="flex flex-col items-center justify-center gap-2 list-none">
        {firstAddress && (
          <SummaryListItem
            icon={MapPinIcon}
            content={`${firstAddress.cidade}, ${firstAddress.estado}`}
          />
        )}

        {canSeeEmail && (
          <SummaryListItem icon={EnvelopeIcon} content={completeUser.email} />
        )}

        {completeUser.telefone && (
          <SummaryListItem icon={PhoneIcon} content={completeUser.telefone} />
        )}
      </ul>

      {hasAnySocialMedia && (
        <>
          <hr className="w-full" />

          <ul className="flex items-center justify-center list-none">
            {completeUser.curriculoLattesUrl && (
              <IconSocialMediaLink
                icon={GraduationCapIcon}
                label="Currículo Lattes"
                href={completeUser.curriculoLattesUrl}
              />
            )}
            {completeUser.githubProfileUrl && (
              <IconSocialMediaLink
                icon={GithubLogoIcon}
                label="Github"
                href={completeUser.githubProfileUrl}
              />
            )}
            {completeUser.linkedinProfileUrl && (
              <IconSocialMediaLink
                icon={LinkedinLogoIcon}
                label="Linkedin"
                href={completeUser.linkedinProfileUrl}
              />
            )}
          </ul>
        </>
      )}
    </section>
  );
}

function SummaryListItem({
  icon: I,
  content,
}: {
  icon: Icon;
  content: string;
}) {
  return (
    <li className="flex items-center gap-1.5">
      <I className="text-gray-700 shrink-0" size={16} weight="regular" />
      <span className="text-gray-900 leading-none break-all">{content}</span>
    </li>
  );
}

function IconSocialMediaLink({
  icon,
  href,
  label,
}: {
  icon: Icon;
  href: string;
  label: string;
}) {
  return (
    <li>
      <IconButton.Root asChild>
        <a
          className="block"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={label}
        >
          <IconButton.Icon icon={icon} />
          <IconButton.Label>{label}</IconButton.Label>
        </a>
      </IconButton.Root>
    </li>
  );
}
