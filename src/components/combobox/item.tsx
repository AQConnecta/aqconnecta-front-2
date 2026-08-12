import { Combobox } from "@base-ui/react/combobox";
import clsx from "clsx";

type Props = Combobox.Item.Props & {};

export function ComboboxItem({ className, children, ...props }: Props) {
  return (
    <Combobox.Item
      {...props}
      className={clsx(
        "block cursor-default outline-none select-none",
        "will-change[box-shadow,background] transition-all duration-100",
        "rounded-xl py-1 px-3 text-sm leading-snug text-black",
        "not-data-selected:data-highlighted:bg-primary-200",
        "ring-0 ring-primary-200/50 data-highlighted:ring-4",
        "data-selected:bg-primary-600 data-selected:text-white",
        className,
      )}
    >
      {children}
    </Combobox.Item>
  );
}
