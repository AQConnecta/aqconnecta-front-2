type Props = {
  /**
   * Texto plano que descreve a vaga.
   */
  description: string;
};

export function VacancyCardContent({ description }: Props) {
  return <p className="text-sm leading-5 mb-5">{description}</p>;
}
