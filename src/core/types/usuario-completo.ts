import type { Competencia } from "./competencia";
import type { Permissao } from "./permissao";
import type { Curriculo } from "./value-objects/curriculo";
import type { Endereco } from "./value-objects/endereco";
import type { Experiencia } from "./value-objects/experiencia";
import type { FormacaoAcademica } from "./value-objects/formacao-academica";

export type UsuarioCompleto = {
  id: string;
  email: string;
  nome: string;
  descricao?: string;
  userUrl: string;
  permissao: Permissao[];
  competencias: Competencia[];
  enderecos: Endereco[];
  experiencias: Experiencia[];
  formacoesAcademicas: FormacaoAcademica[];
  deleteado: boolean;
  ativado: boolean;
  fotoPerfil?: string;
  curriculos: Curriculo[];
  telefone?: string;
  curriculoLattesUrl?: string;
  githubProfileUrl?: string;
  linkedinProfileUrl?: string;
};
