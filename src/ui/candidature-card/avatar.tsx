import Avatar from "@/components/avatar";
import type { Usuario } from "@/core/types/usuario";

type Props = {
  user: Usuario;
  onGoToUserProfile: (user: Usuario) => void;
};

export function CandidatureCardAvatar({ user, onGoToUserProfile }: Props) {
  return (
    <button
      className="[grid-area:avatar] self-start"
      onClick={() => onGoToUserProfile(user)}
      type="button"
    >
      <Avatar.Root>
        <Avatar.Fallback name={user.nome} />
        <Avatar.Image src={user.fotoPerfil} />
      </Avatar.Root>
    </button>
  );
}
