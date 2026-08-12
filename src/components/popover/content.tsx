import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import clsx from "clsx";

export function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={clsx(
            "card p-3 z-50 w-full max-w-72 origin-(--transform-origin) outline-hidden",
            "bg-white/70 backdrop-blur-lg text-gray-800 shadow-xl shadow-black/10",
            "transition-[transform,scale,opacity] data-ending-style:scale-95 data-ending-style:opacity-0",
            "data-starting-style:scale-95 data-starting-style:opacity-0 duration-200",

            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}
