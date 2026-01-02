import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import clsx from "clsx";
import IconButton from "../icon-button";
import { DialogClose } from "./close";

type Props = {
  className?: string;
  title: string;
};

export function DialogHeader({ className, title }: Props) {
  return (
    <header
      className={clsx(
        "max-w-[calc(100%-calc(var(--spacing)*10))] mb-3",
        className,
      )}
    >
      <DialogPrimitive.Title className="font-semibold text-lg">
        {title}
      </DialogPrimitive.Title>
      <DialogClose asChild>
        <IconButton.Root className="absolute right-2 top-2">
          <IconButton.Icon icon={XIcon} />
          <IconButton.Label>Fechar</IconButton.Label>
        </IconButton.Root>
      </DialogClose>
    </header>
  );
}
