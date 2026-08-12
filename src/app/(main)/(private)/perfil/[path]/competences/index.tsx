import { MedalIcon } from "@phosphor-icons/react/dist/ssr/Medal";
import type { MouseEventHandler, PropsWithChildren } from "react";
import toast from "react-hot-toast";
import { Alert } from "@/components/alert";
import { Badge } from "@/components/badge";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import { useDeleteOwnCompetences } from "@/hooks/competences/delete-own-competences";
import { SectionContainer } from "../section-container";
import { AddCompetencesFormDialog } from "./add-competences-form";

type Props = {
  authUser: Usuario | null;
  completeUser: UsuarioCompleto;
  userOwnsProfile: boolean;
};

export function CompetencesSection({
  completeUser,
  userOwnsProfile,
  authUser,
}: Props) {
  const hasNoCompetences = completeUser.competencias.length === 0;

  const { mutate: deleteCompetences } = useDeleteOwnCompetences({
    authUser,
    completeUser,
    onSuccess: () => toast.success("Competência removida com sucesso."),
    onError: (error) => {
      console.error(error.message);
      toast.error(`Não foi possível remover a competência.`);
    },
  });

  if (userOwnsProfile && hasNoCompetences) {
    return (
      <Wrapper
        userOwnsProfile={userOwnsProfile}
        authUser={authUser}
        completeUser={completeUser}
      >
        <Alert variant="warning" title="Você ainda não possui competências!" />
      </Wrapper>
    );
  }

  if (hasNoCompetences) return null;

  return (
    <Wrapper
      userOwnsProfile={userOwnsProfile}
      authUser={authUser}
      completeUser={completeUser}
    >
      <div className="flex flex-wrap gap-2">
        {completeUser.competencias.map((competencia) => {
          let onDelete: MouseEventHandler | undefined;

          if (userOwnsProfile) {
            onDelete = () =>
              deleteCompetences({ competenceIdsToDelete: [competencia.id] });
          }

          return (
            <Badge
              onDelete={onDelete}
              key={`user-${completeUser.id}-competences-${competencia.id}`}
              variant="default"
            >
              {competencia.descricao}
            </Badge>
          );
        })}
      </div>
    </Wrapper>
  );
}

function Wrapper({
  children,
  userOwnsProfile,
  authUser,
  completeUser,
}: PropsWithChildren<Props>) {
  return (
    <SectionContainer
      shouldShowEditButton={userOwnsProfile}
      icon={MedalIcon}
      title="Competências"
      actionContent={
        <AddCompetencesFormDialog
          authUser={authUser}
          completeUser={completeUser}
        />
      }
    >
      {children}
    </SectionContainer>
  );
}
