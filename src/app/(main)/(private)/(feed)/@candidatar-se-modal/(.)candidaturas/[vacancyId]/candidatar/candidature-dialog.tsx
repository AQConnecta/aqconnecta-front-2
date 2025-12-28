"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert } from "@/components/alert";
import Dialog from "@/components/dialog";
import { useAuth } from "@/stores/auth";

type Props = {
  vacancyId: string;
};

export function CandidatureDialog({ vacancyId }: Props) {
  const user = useAuth().user;
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const hasResumes = Boolean(user?.curriculo.length);

  useEffect(() => setIsOpen(true), []);

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) setTimeout(() => router.back(), 200);
      }}
    >
      <Dialog.Container className="w-full max-w-lg">
        <Dialog.Header title="Foo" />
        <Dialog.Description className="mb-3">
          Selecione um currículo
        </Dialog.Description>
        {hasResumes ? <CandidatureForm vacancyId={vacancyId} /> : <NoResumes />}
      </Dialog.Container>
    </Dialog.Root>
  );
}

function NoResumes() {
  return (
    <Alert
      title="Sem currículos"
      content="Você ainda não possui nenhum currículo. Cadastre alguns antes de se candidatar!"
    />
  );
}

function CandidatureForm({ vacancyId }: Props) {
  return <form></form>;
}
