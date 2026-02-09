import Dialog from "@/components/dialog";
import type { Vaga } from "@/core/types/vaga";
import { useFindVacancyById } from "@/hooks/vacancies/find-by-id";

type Props = {
  vacancyId: Vaga["id"];
};

export function DialogHeader({ vacancyId }: Props) {
  const { data, error, status } = useFindVacancyById({ vacancyId });

  let title: string | undefined;
  let description: string | undefined;

  switch (status) {
    case "error":
      title = "Não conseguimos carregar o título desta vaga =(";
      description = error.message;
      break;

    case "pending":
      title = "Carregando a vaga...";
      description = "";

      break;
    case "success": {
      const vacancy = data.data!;
      title = `${vacancy.titulo} - Candidaturas`;
      description = `Esses são todos os candidatos à vaga ${vacancy.titulo}.`;
      break;
    }
  }

  return (
    <>
      <Dialog.Header title={title} />
      <Dialog.Description className="sr-only">{description}</Dialog.Description>
    </>
  );
}
