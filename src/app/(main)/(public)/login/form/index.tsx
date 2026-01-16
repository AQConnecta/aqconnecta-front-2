"use client";

import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr/Envelope";
import { KeyIcon } from "@phosphor-icons/react/dist/ssr/Key";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import authQueries from "@/api/auth-queries";
import Button from "@/components/button";
import Form from "@/components/form";
import { Routes } from "@/core/routes";
import { RQKeys } from "@/libs/react-query";
import { useAuth } from "@/stores/auth";
import type { LoginFormData } from "./schema";
import { TogglePasswordVisibilityButton } from "./toggle-password-visibility-button";

export function LoginForm() {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const setAuth = useAuth((state) => state.setAuth);

  const { handleSubmit, clearErrors, register } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login } = useMutation({
    mutationKey: RQKeys.auth.base,
    mutationFn: authQueries.login,
    onMutate: () => {
      setIsProcessing(true);
      clearErrors();
    },
    onSettled: () => setIsProcessing(false),
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (response) => {
      const data = response.data!;
      setAuth(data.token, data.usuario);
      toast.success("Logado com sucesso!");
      router.replace(Routes.auth.login);
    },
  });

  return (
    <form className="card mb-80" onSubmit={handleSubmit((data) => login(data))}>
      <div className="flex flex-col gap-4 mb-8">
        <Form.Input
          label="E-mail"
          leftIcon={EnvelopeIcon}
          placeholder="Digite seu endereço de e-mail"
          type="email"
          required
          inputProps={register("email")}
        />

        <Form.Input
          label="Senha"
          leftIcon={KeyIcon}
          rightComponent={
            <TogglePasswordVisibilityButton
              isVisible={passwordIsVisible}
              setIsVisible={setPasswordIsVisible}
            />
          }
          placeholder="Digite sua senha"
          type={passwordIsVisible ? "text" : "password"}
          required
          inputProps={register("password")}
        />
      </div>

      <div className="flex-1 flex gap-2 justify-end max-xs-width:flex-col">
        <Button.Root
          asChild
          variant="ghost-primary"
          className="max-xs-width:justify-start"
        >
          <Link href={Routes.auth.login}>Ainda não tenho conta</Link>
        </Button.Root>

        <Button.Root
          type="submit"
          className="max-xs-width:justify-between"
          disabled={isProcessing}
          aria-busy={isProcessing}
        >
          Logar
          <Button.Icon icon={ArrowRightIcon} weight="bold" />
        </Button.Root>
      </div>
    </form>
  );
}
