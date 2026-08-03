import { GraduationCapIcon } from "@phosphor-icons/react/dist/ssr/GraduationCap";
import { PencilIcon } from "@phosphor-icons/react/dist/ssr/Pencil";
import { Alert } from "@/components/alert";
import Button from "@/components/button";
import type { Usuario } from "@/core/types/usuario";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import type { FormacaoAcademica } from "@/core/types/value-objects/formacao-academica";
import { SectionContainer } from "../section-container";
import { CreateAcademicExperienceFormDialog } from "./create-academic-experience-form";
import { DeleteAcademicExperienceDialog } from "./delete-academic-experience";

type Props = {
  completeUser: UsuarioCompleto;
  userOwnsProfile: boolean;
  authUser: Usuario | null;
};

export function AcademicTrainingSection({
  completeUser,
  userOwnsProfile,
  authUser,
}: Props) {
  const hasNoAcademicBackgronud = completeUser.formacoesAcademicas.length === 0;

  const content = hasNoAcademicBackgronud ? (
    <Alert
      variant="warning"
      title="Você ainda não adicionou nenhuma formação acadêmica."
    />
  ) : (
    <div className="divide-y divide-gray-200">
      {completeUser.formacoesAcademicas
        .sort(
          (a, b) =>
            new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime(),
        )
        .map((item) => (
          <AcademicTraining
            item={item}
            authUser={authUser}
            completeUser={completeUser}
            userOwnsProfile={userOwnsProfile}
            key={`user-profile-${completeUser.id}-academic-training-${item.id}`}
          />
        ))}
    </div>
  );

  return (
    <SectionContainer
      icon={GraduationCapIcon}
      title="Formação Acadêmica"
      shouldShowEditButton={userOwnsProfile}
      actionContent={
        <CreateAcademicExperienceFormDialog
          authUser={authUser}
          completeUser={completeUser}
        />
      }
    >
      {content}
    </SectionContainer>
  );
}

const dateFormatter = Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" });

function AcademicTraining({
  item,
  userOwnsProfile,
  authUser,
  completeUser,
}: {
  item: FormacaoAcademica;
} & Props) {
  const startDate = dateFormatter.format(new Date(item.dataInicio));
  const endDate =
    item.atualFormacao || !item.dataFim
      ? "Presente"
      : dateFormatter.format(new Date(item.dataFim));

  return (
    <div className="not-last-of-type:pb-3 not-first-of-type:mt-3">
      <p className="mb-1">
        <span className="font-medium">{item.universidade.nomeInstituicao}</span>
        {item.diploma && ` - ${item.diploma}`}
      </p>
      <p className="text-balance whitespace-pre-wrap">{item.descricao}</p>
      <span className="font-light">
        {startDate} - {endDate}
      </span>

      {userOwnsProfile && (
        <div className="flex justify-end items-center gap-2 mt-2">
          <DeleteAcademicExperienceDialog
            authUser={authUser}
            completeUser={completeUser}
            universidade={item.universidade}
            diploma={item.diploma}
            idFormacaoAcademica={item.id}
          />

          <Button.Root size="sm" variant="ghost">
            <Button.Icon icon={PencilIcon} /> Editar
          </Button.Root>
        </div>
      )}
    </div>
  );
}
