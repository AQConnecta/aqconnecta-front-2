import type { Competencia } from "./competencia";

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  fotoPerfil: string;
  competencias: Competencia[];
  userUrl: string;
  permissao: {
    id: string;
    descricao: string;
  }[];
};
