import { GraduationCapIcon } from "@phosphor-icons/react/dist/ssr/GraduationCap";
import { Alert } from "@/components/alert";
import type { UsuarioCompleto } from "@/core/types/usuario-completo";
import type { FormacaoAcademica } from "@/core/types/value-objects/formacao-academica";
import { SectionContainer } from "./section-container";

type Props = {
  completeUser: UsuarioCompleto;
  isUserOwnProfile: boolean;
};

export function Education({ completeUser, isUserOwnProfile }: Props) {
  const hasNoAcademicBackgronud = completeUser.formacoesAcademicas.length === 0;

  const content = hasNoAcademicBackgronud ? (
    <Alert
      variant="warning"
      title="Você ainda não adicionou nenhuma formação acadêmica."
    />
  ) : (
    <div className="divide-y divide-gray-200">
      {completeUser.formacoesAcademicas.map((item) => (
        <AcademicTraining
          key={`user-profile-${completeUser.id}-academic-training-${item.id}`}
          item={item}
        />
      ))}
    </div>
  );

  return (
    <SectionContainer
      icon={GraduationCapIcon}
      title="Formação Acadêmica"
      shouldShowEditButton={isUserOwnProfile}
    >
      {content}
    </SectionContainer>
  );
}

const dateFormatter = Intl.DateTimeFormat("pt-BR", { dateStyle: "medium" });

function AcademicTraining({ item }: { item: FormacaoAcademica }) {
  const startDate = dateFormatter.format(new Date(item.dataInicio));
  const endDate =
    item.atualFormacao || !item.dataFim
      ? "Presente"
      : dateFormatter.format(new Date(item.dataFim));

  return (
    <div className="not-last-of-type:pb-3 not-first-of-type:mt-3">
      <p className="mb-1">
        <span className="font-medium">{item.universidade.nomeInstituicao}</span>{" "}
        - {item.descricao}
      </p>
      <span className="font-light">
        {startDate} - {endDate}
      </span>
    </div>
  );
}
