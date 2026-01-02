import { Radio, RadioGroup } from "@base-ui/react";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/ssr/ArrowSquareOut";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import {
  type FormEvent,
  type ReactElement,
  useCallback,
  useId,
  useState,
} from "react";
import apiVacanciesQueries from "@/api/api-vacancies-queries";
import type { PresentedVacancy } from "@/api/types/presented-vacancy";
import { Alert } from "@/components/alert";
import Button from "@/components/button";
import { Routes } from "@/core/routes";
import type { Curriculo } from "@/core/types/value-objects/curriculo";
import { RQKeys } from "@/libs/react-query";

type Props = {
  formId: string;
  vacancyId: PresentedVacancy["id"];
  resumes: Curriculo[];
  cancelButton?: ReactElement;
};

export function CandidatureForm({
  vacancyId,
  resumes,
  formId,
  cancelButton,
}: Props) {
  const hasResumes = Boolean(resumes.length);

  // Alguns estados simples são o suficiente pra esse formulário que só tem 1 único campo
  const [resumeId, setResumeId] = useState<number | null>(null);

  const {
    error,
    isError,
    isPending,
    isSuccess,
    mutate: apply,
  } = useMutation({
    mutationKey: RQKeys.vacancies.apply(vacancyId, resumeId),
    mutationFn: async () => {
      if (resumeId) {
        await apiVacanciesQueries.apply({ resumeId, vacancyId });
        return;
      }

      throw new Error(
        "Você precisa selecionar um currículo para se candidatar.",
      );
    },
  });

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      apply();
    },
    [apply],
  );

  if (!hasResumes) return <NoResumes />;

  return (
    <div>
      <form id={formId} name={formId} onSubmit={handleSubmit}>
        {isError && (
          <Alert variant="danger" content={error?.message} className="mb-3" />
        )}

        {isSuccess && (
          <Alert
            className="mb-3"
            content="Candidatura realizada com sucesso!"
          />
        )}

        <RadioGroup
          className="flex flex-col gap-2"
          onValueChange={(resumeId) => setResumeId(Number(resumeId))}
        >
          {resumes.map((resume) => (
            <ResumeOption
              key={`candidature-to-${vacancyId}-resume-${resume.id}`}
              resume={resume}
            />
          ))}
        </RadioGroup>
      </form>

      <Link
        href={Routes.resumes.list}
        className="font-semibold text-primary-600 inline-block mt-3"
      >
        Gerencie seus currículos
      </Link>

      <hr className="my-6" />

      <div className="flex items-center justify-end gap-2">
        {cancelButton}

        <Button.Root
          type="submit"
          form={formId}
          disabled={isPending || isSuccess}
          aria-disabled={isPending}
        >
          Avançar
        </Button.Root>
      </div>
    </div>
  );
}

type ResumeOptionProps = { resume: Curriculo };

function ResumeOption({ resume }: ResumeOptionProps) {
  const inputId = useId();
  return (
    <label
      className={clsx(
        "flex gap-3 justify-between items-center p-3 rounded-xl border border-black/10",
        "outline-none ring-0 ring-primary-300 has-focus-visible:ring-4 transition-all duration-100 will-change-[box-shadow]",
      )}
      htmlFor={inputId}
    >
      <div>
        {resume.nomeCurriculo && (
          <span className="font-semibold text-sm">{resume.nomeCurriculo}</span>
        )}

        <a
          target="_blank"
          href={resume.curriculo}
          className={clsx(
            "flex items-center gap-1 text-sm font-medium text-primary-600 underline decoration-1",
          )}
        >
          {resume.curriculo}
          <ArrowSquareOutIcon size={16} weight="bold" />
        </a>
      </div>

      <Radio.Root
        value={resume.id}
        id={inputId}
        className={clsx(
          "size-6 rounded-full ring-inset data-unchecked:ring-1 ring-black/10 grid place-items-center",
          "transition-all duration-150 data-checked:ring-8 data-checked:ring-primary-600",
          "outline-none ring-0 ring-primary-300 focus-visible:ring-4",
        )}
      />
    </label>
  );
}

const NoResumes = () => {
  return (
    <Alert
      title="Sem currículos"
      content="Você ainda não possui nenhum currículo. Cadastre alguns antes de se candidatar!"
    />
  );
};
