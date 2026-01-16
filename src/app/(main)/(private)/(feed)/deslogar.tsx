"use client";

import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import authQueries from "@/api/auth-queries";
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
    <button type="button" disabled={isPending} onClick={() => logout()}>
      {isPending ? "deslogando" : "deslogar"}
    </button>
  );
}
