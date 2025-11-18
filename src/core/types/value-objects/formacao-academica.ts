import type { Universidade } from "../universidade";

export type FormacaoAcademica = {
  id: string; // uuid
  universidade: Universidade;
  descricao: string;
  diploma?: string | null;
  dataInicio: Date | string;
  dataFim?: Date | string | null;
  atualFormacao?: boolean | null;
};
