import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { XIcon } from "@phosphor-icons/react/dist/ssr/X";
import clsx from "clsx";
import IconButton from "../icon-button";
import { PopoverClose } from "./close";

type Props = {
  className?: string;
  title: string;
};

export function PopoverHeader({ className, title }: Props) {
  return (
    <header
      className={clsx(
        "max-w-[calc(100%-calc(var(--spacing)*10))] mb-3",
        className,
      )}
    >
      <PopoverPrimitive.Title className="font-semibold text-base">
        {title}
      </PopoverPrimitive.Title>
      <PopoverClose asChild>
        <IconButton.Root className="absolute right-2 top-2">
          <IconButton.Icon icon={XIcon} />
          <IconButton.Label>Fechar</IconButton.Label>
        </IconButton.Root>
      </PopoverClose>
    </header>
  );
}
