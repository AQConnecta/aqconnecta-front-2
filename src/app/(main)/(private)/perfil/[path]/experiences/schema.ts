import z from "zod";

export const experienceFormSchema = z.object({
  titulo: z
    .string("O título precisa ser um texto.")
    .max(50, {
      error: ({ maximum }) =>
        `O título precisa ter, no máximo, ${maximum} caracteres.`,
    })
    .nonempty("O título não pode estar vazio."),
  instituicao: z
    .string("A instituição precisa ser um texto.")
    .max(70, {
      error: ({ maximum }) =>
        `O nome da instituição deve ser limitado a ${maximum} caracteres.`,
    })
    .nonempty("É necessário informar a instituição/empresa."),
  descricao: z
    .string("A descrição precisa ser um texto.")
    .max(300, {
      error: ({ maximum }) =>
        `A descrição não pode ultrapassar ${maximum} caracteres.`,
    })
    .nonempty("A descrição não pode estar em branco."),
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
  atualExperiencia: z
    .boolean(
      "Você deve informar se a experiência é corrente através de um valor booleano.",
    )
    .default(false),
});

export type ExperienceFormSchema = z.infer<typeof experienceFormSchema>;
