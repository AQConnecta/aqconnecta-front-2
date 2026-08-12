import { Combobox } from "@base-ui/react";
import clsx from "clsx";

type Props = Combobox.Positioner.Props & {};

export function ComboboxContent({
  side = "bottom",
  align = "center",
  alignOffset = 0,
  sideOffset = 8,
  collisionPadding = 24,
  children,
  className,
  ...positionerProps
}: Props) {
  return (
    <Combobox.Portal>
      <Combobox.Positioner
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        side={side}
        {...positionerProps}
      >
        <Combobox.Popup
          className={clsx(
            "w-(--available-width) max-w-[max(--spacing(92),var(--anchor-width))] origin-(--transform-origin)",
            "p-3 card text-gray-800 shadow-xl shadow-black/10",
            "transition-[transform,scale,opacity] data-ending-style:scale-95 data-ending-style:opacity-0",
            "data-starting-style:scale-95 data-starting-style:opacity-0 duration-200",
            className,
          )}
        >
          {children}
        </Combobox.Popup>
      </Combobox.Positioner>
    </Combobox.Portal>
  );
}
