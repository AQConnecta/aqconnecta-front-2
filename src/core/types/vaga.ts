import type { Competencia } from "./competencia";
import type { Usuario } from "./usuario";

export type Vaga = {
  id: string;
  publicador: Usuario;
  titulo: string;
  descricao: string;
  localDaVaga: string;
  aceitaRemoto: boolean;
  dataLimiteCandidatura: Date | string | null;
  criadoEm: Date | string;
  atualizadoEm: Date | string | null;
  deletadoEm: Date | string | null;
  isIniciante: boolean;
  competencias: Competencia[];
};
