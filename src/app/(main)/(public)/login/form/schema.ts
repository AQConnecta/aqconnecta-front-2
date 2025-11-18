import z from "zod";

export const loginFormSchema = z.object({
  email: z.email({
    error: "Você precisa inserir um endereço de e-mail válido",
  }),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
