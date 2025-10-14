export type Experiencia = {
  id: string; // uuid
  titulo: string;
  instituicao: string;
  descricao: string;
  dataInicio: Date | string;
  dataFim?: Date | string | null;
  atualExperiencia: boolean;
};
