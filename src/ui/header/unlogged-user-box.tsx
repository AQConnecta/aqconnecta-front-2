import { KeyIcon } from "@phosphor-icons/react/dist/ssr/Key";
import { UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import Link from "next/link";
import Button from "@/components/button";
import { Routes } from "@/core/routes";

export function UnloggedBox() {
  return (
    <>
      <Button.Root asChild className="text-nowrap" size="md" variant="primary">
        <Link href={Routes.auth.register}>
          <Button.Icon icon={UserIcon} />
          Registre-se
        </Link>
      </Button.Root>
      <Button.Root
        asChild
        className="text-nowrap"
        size="md"
        variant="ghost-primary"
      >
        <Link href={Routes.auth.login}>
          <Button.Icon icon={KeyIcon} />
          Login
        </Link>
      </Button.Root>
    </>
  );
}
