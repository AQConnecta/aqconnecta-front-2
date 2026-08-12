"use client";

import { PencilIcon } from "@phosphor-icons/react/dist/ssr/Pencil";
import Link from "next/link";
import type { ReactElement } from "react";
import { Alert } from "@/components/alert";
import Avatar from "@/components/avatar";
import Button from "@/components/button";
import { Routes } from "@/core/routes";
import { useFetchAuthUserCandidatures } from "@/hooks/vacancies/fetch-user-candidatures";
import { useAuth } from "@/stores/auth";
import { LogoutButton } from "./logout-btn";
import { SidebarAuthUserProfileSkeleton } from "./skeleton";

export function SidebarAuthUserProfile() {
  const user = useAuth((auth) => auth.user);
  const {
    status,
    data: response,
    error,
  } = useFetchAuthUserCandidatures({ authUser: user });

  let content: ReactElement | null;

  if (!user) return null;

  switch (status) {
    case "pending":
      return <SidebarAuthUserProfileSkeleton />;
    case "error":
      content = <Alert variant="danger" title={error.message}></Alert>;
      break;
    case "success": {
      const candidatures = response.data!;
      const candidaturesCount = candidatures.length;

      content = (
        <>
          <header className="flex flex-col items-center">
            <Link href={Routes.users.profile(user.userUrl)}>
              <Avatar.Root className="size-20 mb-3">
                <Avatar.Fallback name={user.nome} />
                <Avatar.Image src={user.fotoPerfil} />
              </Avatar.Root>
            </Link>

            <span className="block text-base">{user.nome}</span>
            {user.descricao && (
              <p className="text-gray-700 user-text-area">{user.descricao}</p>
            )}
          </header>

          <div className="mt-4 p-4 grid place-items-center rounded-xl bg-gray-100">
            <span className="font-bold text-primary-600 text-base">
              {candidaturesCount}
            </span>
            <span className="text-gray-700 capitalize">
              {candidaturesCount === 1 ? "candidatura" : "candidaturas"}
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <Button.Root variant="outline" className="w-full" asChild>
              <Link href={Routes.users.profile(user.userUrl)}>
                <Button.Icon icon={PencilIcon} />
                Editar Perfil
              </Link>
            </Button.Root>
            <LogoutButton className="w-full" />
          </div>
        </>
      );
      break;
    }
  }

  return <section className="card w-full max-w-72 min-w-72">{content}</section>;
}
