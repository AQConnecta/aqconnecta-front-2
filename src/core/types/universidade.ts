export type Universidade = {
  id: string;
  codigoIes: number;
  nomeInstituicao: string;
  sigla?: string | null;
  categoriaIes?: string | null;
  organizacaoAcademica?: string | null;
  codigoMunicipioIbge?: string | null;
  municipio?: string | null;
  uf?: string | null;
  situacaoIes?: string | null;
};
