import { PlusIcon } from "@phosphor-icons/react/dist/ssr/Plus";
import Button from "@/components/button";

export function LoggedUserBox() {
  return (
    <Button.Root>
      <Button.Icon icon={PlusIcon} weight="bold" />
      Publicar vaga
    </Button.Root>
  );
}
