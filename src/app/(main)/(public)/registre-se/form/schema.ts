import z from "zod";

export const registerFormSchema = z
  .object({
    name: z.string().min(1, { error: "Você deve inserir seu nome completo" }),
    email: z.email({
      error: "Você precisa inserir um endereço de e-mail válido",
    }),
    password: z
      .string()
      .min(8, { error: "A senha precisa ter, no mínimo, 8 caracteres" }),
    passwordRepitition: z.string(),
  })
  .refine((data) => data.password === data.passwordRepitition, {
    path: ["passwordRepitition"],
    error: "As senhas precisam ser iguais",
  });

export type RegisterFormData = z.infer<typeof registerFormSchema>;
