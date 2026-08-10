export type PresentedExperience = {
  id: string; // uuid
  titulo: string;
  instituicao: string;
  descricao: string;
  dataInicio: Date | string;
  dataFim?: Date | string | null;
  corrente: boolean;
};
