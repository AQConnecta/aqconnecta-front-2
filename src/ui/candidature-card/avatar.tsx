import Link from "next/link";
import Avatar from "@/components/avatar";
import { Routes } from "@/core/routes";
import type { Usuario } from "@/core/types/usuario";

type Props = {
  user: Usuario;
};

export function CandidatureCardAvatar({ user }: Props) {
  return (
    <Link
      className="[grid-area:avatar]"
      href={Routes.users.profile(user.userUrl)}
    >
      <Avatar.Root>
        <Avatar.Fallback name={user.nome} />
        <Avatar.Image src={user.fotoPerfil} />
      </Avatar.Root>
    </Link>
  );
}
