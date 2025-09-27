"use client";

import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import { EnvelopeIcon } from "@phosphor-icons/react/dist/ssr/Envelope";
import { KeyIcon } from "@phosphor-icons/react/dist/ssr/Key";
import { UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import Button from "@/components/button";
import Form from "@/components/form";

export function RegisterForm() {
  return (
    <form className="card">
      <div className="flex flex-col gap-4">
        <Form.Input
          label="Nome"
          leftIcon={UserIcon}
          placeholder="Digite seu nome completo"
          name="nome"
        />

        <Form.Input
          label="E-mail"
          leftIcon={EnvelopeIcon}
          placeholder="Digite seu endereço de e-mail"
          name="email"
          details="Insira um e-mail válido e existente: será necessário confirmá-lo posteriormente."
        />

        <Form.Input
          label="Senha"
          leftIcon={KeyIcon}
          placeholder="Digite uma senha"
          name="password"
        />

        <Form.Input
          label="Repita a senha"
          leftIcon={KeyIcon}
          placeholder="Repita a sua senha"
          name="password-repitition"
        />
      </div>

      <div className="flex-1 flex gap-2 justify-end">
        <Button.Root type="button" variant="ghost-primary">
          Já tenho uma conta
        </Button.Root>
        <Button.Root type="submit">
          Criar conta
          <Button.Icon icon={ArrowRightIcon} weight="bold" />
        </Button.Root>
      </div>
    </form>
  );
}
