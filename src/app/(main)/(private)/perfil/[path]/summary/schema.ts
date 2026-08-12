import z from "zod";
import { validateUrlDomain } from "@/libs/zod";

const emptyToNull = (value: unknown) => value || null;

export const socialMediaFormSchema = z.object({
  telefone: z.preprocess(
    emptyToNull,
    z
      .string()
      .max(1000, {
        error: ({ maximum }) =>
          `Seu número telefônico deve ter, no máximo, ${maximum} caracteres.`,
      })
      .nullable()
      .optional(),
  ),
  perfilGitHub: z.preprocess(
    emptyToNull,
    z
      .url("Você deve fornecer um URL válido para o seu perfil no GitHub.")
      .max(255, {
        error: ({ maximum }) =>
          `O URL do seu perfil do GitHub não pode ultrapassar ${maximum} caracteres.`,
      })
      .refine(validateUrlDomain("github.com"), {
        error:
          "O URL do seu perfil do GitHub não pertence ao domínio oficial do GitHub.",
      })
      .nullable()
      .optional(),
  ),
  perfilLinkedin: z.preprocess(
    emptyToNull,
    z
      .url("Você deve fornecer um URL válido para o seu perfil no Linkedin.")
      .max(255, {
        error: ({ maximum }) =>
          `O URL do seu perfil no Linkedin não pode ultrapassar ${maximum} caracteres.`,
      })
      .refine(validateUrlDomain("linkedin.com", "/in/"), {
        error:
          "O URL do seu perfil do LinkedIn não pertence ao domínio oficial do LinkedIn.",
      })
      .nullable()
      .optional(),
  ),
  curriculoLattes: z.preprocess(
    emptyToNull,
    z
      .url("Você deve fornecer um URL válido para o seu Currículo Lattes.")
      .max(255, {
        error: ({ maximum }) =>
          `O URL do seu perfil no Currículo Lattes não pode ultrapassar ${maximum} caracteres.`,
      })
      .refine(validateUrlDomain("cnpq.br"), {
        message: "O URL fornecido não pertence ao domínio oficial do CNPq.",
      })
      .nullable()
      .optional(),
  ),
});

export type SocialMediaFormSchema = z.infer<typeof socialMediaFormSchema>;

/**
        @URL(error  ({})=>= "Você deve fornecer um URL válido para o seu Currículo Lattes.")
        @Size(max = 255, error  ({})=>= "O URL do seu perfil no Currículo Lattes não pode ultrapassar {max} caracteres.")
            String>
        curriculoLattes = JsonNullable.undefined();

    private JsonNullable<
        @Size(max = 255, error  ({})=>= "O URL do seu perfil do GitHub não pode ultrapassar {max} caracteres.")
        @URL(error  ({})=>= "Você deve fornecer um URL válido para o seu perfil no GitHub.")
            String>
        perfilGitHub = JsonNullable.undefined();

    private JsonNullable<
        @Size(max = 255, error  ({})=>= "O URL do seu perfil no Linkedin não pode ultrapassar {max} caracteres.")
        @URL(error  ({})=>= "Você deve fornecer um URL válido para o seu perfil no Linkedin.")
            String>
        perfilLinkedin = JsonNullable.undefined();

 */
