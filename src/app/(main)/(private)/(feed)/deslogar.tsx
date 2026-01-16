"use client";

import { SignOutIcon } from "@phosphor-icons/react/dist/ssr/SignOut";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import authQueries from "@/api/auth-queries";
import Button from "@/components/button";
import { RQKeys } from "@/libs/react-query";

export function Deslogar() {
  const { mutate: logout, isPending } = useMutation({
    mutationKey: RQKeys.auth.base,
    mutationFn: authQueries.logout,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Button.Root
      variant="ghost"
      color="destructive"
      type="button"
      disabled={isPending}
      onClick={() => logout()}
      className="mt-8"
    >
      <Button.Icon icon={SignOutIcon} weight="bold" />
      {isPending ? "deslogando" : "deslogar"}
    </Button.Root>
  );
}
