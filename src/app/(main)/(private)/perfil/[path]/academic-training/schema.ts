import z from "zod";
import type { BasicServerValidationErrors } from "@/api/types/server-responses/basic";

export const academicTrainingFormSchema = z
  .object({
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
    dataInicio: z
      .union([z.string(), z.date()])
      .superRefine((value, ctx) => {
        if (!value) {
          ctx.addIssue({
            code: "invalid_type",
            message: "A data de início é obrigatória.",
            expected: "date",
          });
          return;
        }

        if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
          ctx.addIssue({
            code: "invalid_type",
            message: "A data de início fornecida é inválida.",
            expected: "date",
          });
        }
      })
      .transform((value) => value as Date),
    dataFim: z
      .union([z.string(), z.date()])
      .optional()
      .superRefine((value, ctx) => {
        if (value === undefined || value === "") return;

        if (!(value instanceof Date) || Number.isNaN(value.getTime())) {
          ctx.addIssue({
            code: "invalid_type",
            message: "A data de término fornecida é inválida.",
            expected: "date",
          });
        }
      })
      .transform((value) => value as Date),
    atualFormacao: z
      .boolean("A formação atual deve ser sinalizada por um valor booleano.")
      .default(false),
  })
  .refine(
    (data) => {
      if (!data.dataFim) return true;
      return data.dataFim >= data.dataInicio;
    },
    {
      message: "A data de término não pode ser anterior à data de início.",
      path: ["dataFim"],
    },
  );

export type AcademicTrainingFormSchema = z.infer<
  typeof academicTrainingFormSchema
>;

export type AcademicTrainingServerErrors = Omit<
  BasicServerValidationErrors<AcademicTrainingFormSchema>,
  "universidade"
> & { universidade?: { id?: string[] } };
