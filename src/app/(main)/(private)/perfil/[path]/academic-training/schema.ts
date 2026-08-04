import z from "zod";
import type { BasicServerValidationErrors } from "@/api/types/server-responses/basic";

export const academicTrainingFormSchema = z.object({
  universidade: z.object({
    id: z.uuid(
      "É necessário selecionar uma universidade dentre as disponíveis.",
    ),
  }),
  descricao: z.preprocess(
    (value) => value || undefined,
    z.string("A descrição deve ser um texto.").max(100, {
      error: ({ maximum }) =>
        `A descrição deve ter no máximo ${maximum} caracteres.`,
    }),
  ),
  diploma: z.preprocess(
    (value) => (value as string)?.trim() || undefined,
    z
      .string("Especifique o curso e o grau acadêmico em uma breve frase.")
      .max(255, {
        error: ({ maximum }) =>
          `O campo diploma deve ter no máximo ${maximum} caracteres.`,
      })
      .optional(),
  ),
  dataInicio: z.date("A data de início é inválida."),
  dataFim: z.date("A data de encerramento é inválida.").optional(),
  atualFormacao: z
    .boolean("A formação atual deve ser sinalizada por um valor booleano.")
    .default(false),
});

export type AcademicTrainingFormSchema = z.infer<
  typeof academicTrainingFormSchema
>;

export type AcademicTrainingServerErrors = Omit<
  BasicServerValidationErrors<AcademicTrainingFormSchema>,
  "universidade"
> & { universidade?: { id?: string[] } };
