import type { Competencia } from "./competencia";
import type { Permissao } from "./permissao";
import type { Curriculo } from "./value-objects/curriculo";
import type { Endereco } from "./value-objects/endereco";
import type { Experiencia } from "./value-objects/experiencia";
import type { FormacaoAcademica } from "./value-objects/formacao-academica";

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  fotoPerfil: string;
  descricao: string;
  userUrl: string;
  permissao: Permissao[];
  competencias: Competencia[];
  // TODO: decorar esse campo com @JsonIgnore no back-end
  senha?: string | null;
  deletado: boolean;
  ativado: boolean;
  enderecos: Endereco[];
  experiencias: Experiencia[];
  formacoesAcademicas: FormacaoAcademica[];
  curriculo: Curriculo[];
};
