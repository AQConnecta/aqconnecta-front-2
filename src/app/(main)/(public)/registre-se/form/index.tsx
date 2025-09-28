"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr/Envelope";
import { KeyIcon } from "@phosphor-icons/react/dist/ssr/Key";
import { UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ApiAuthQueries } from "@/api/auth";
import Button from "@/components/button";
import Form from "@/components/form";
import { Routes } from "@/core/routes";
import { registerFormSchema } from "./schema";

export function RegisterForm() {
  const router = useRouter();

  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(registerFormSchema),
  });

  const { mutate: registerUser } = useMutation({
    mutationKey: ["register"],
    mutationFn: ApiAuthQueries.register,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      toast.success(response.message);
      router.replace(Routes.auth.login);
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => registerUser(data))}
      className="card"
    >
      <div className="flex flex-col gap-4">
        <Form.Input
          label="Nome"
          type="text"
          leftIcon={UserIcon}
          placeholder="Digite seu nome completo"
          inputProps={register("name")}
          errorMessage={formState.errors.name?.message}
        />

        <Form.Input
          label="E-mail"
          type="email"
          leftIcon={EnvelopeIcon}
          placeholder="Digite seu endereço de e-mail"
          details="Insira um e-mail válido e existente: será necessário confirmá-lo posteriormente."
          inputProps={register("email")}
          errorMessage={formState.errors.email?.message}
        />

        <Form.Input
          label="Senha"
          type="password"
          leftIcon={KeyIcon}
          placeholder="Digite uma senha"
          inputProps={register("password")}
          errorMessage={formState.errors.password?.message}
        />

        <Form.Input
          label="Repita a senha"
          type="password"
          leftIcon={KeyIcon}
          placeholder="Repita a sua senha"
          inputProps={register("passwordRepitition")}
          errorMessage={formState.errors.passwordRepitition?.message}
        />
      </div>

      <div className="flex-1 flex gap-2 justify-end max-xs-width:flex-col">
        <Button.Root
          onClick={() => toast.success("Teste", {})}
          type="button"
          variant="ghost-primary"
          className="max-xs-width:justify-start"
        >
          Já tenho uma conta
        </Button.Root>
        <Button.Root type="submit" className="max-xs-width:justify-between">
          Criar conta
          <Button.Icon icon={ArrowRightIcon} weight="bold" />
        </Button.Root>
      </div>
    </form>
  );
}
