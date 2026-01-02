import type { Usuario } from "../usuario";
import type { Vaga } from "../vaga";

export type Candidatura = {
  id: number;
  usuario: Usuario;
  // ID do currículo
  curriculo: number;
  curriculoUrl: string;
  vaga: Vaga;
};
