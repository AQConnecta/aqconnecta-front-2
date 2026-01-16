import type { Competencia } from "../../core/types/competencia";
import type { Usuario } from "../../core/types/usuario";

export type PresentedVacancy = {
  id: string;
  titulo: string;
  descricao: string;
  localDaVaga: string;
  aceitaRemoto: boolean;
  dataLimiteCandidatura?: Date | string;
  competencias: Competencia[];
  criadoEm?: Date | string;
  atualizadoEm?: Date | string;
  isIniciante: boolean;
  publicador: Pick<
    Usuario,
    | "id"
    | "email"
    | "nome"
    | "permissao"
    | "deletado"
    | "ativado"
    | "fotoPerfil"
    | "userUrl"
  >;
};
