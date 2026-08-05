import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import Button from "@/components/button";
import { LogoutButton } from "../sidebar-profile/logout-btn";

export function LoggedUserBox() {
  return (
    <>
      <LogoutButton />
      <Button.Root color="primary">
        <Button.Icon icon={PlusIcon} weight="bold" />
        Publicar vaga
      </Button.Root>
    </>
  );
}
