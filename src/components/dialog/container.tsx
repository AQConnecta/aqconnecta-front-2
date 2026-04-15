import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import clsx from "clsx";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  className?: string;
}>;

export function DialogContainer({ children, className }: Props) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop className="fixed inset-0 bg-black/40" />
      <DialogPrimitive.Viewport
        className={clsx("fixed inset-0 flex justify-center items-center p-6")}
      >
        <DialogPrimitive.Popup
          className={clsx(
            "relative card transition-all duration-150",
            "data-ending-style:opacity-0 data-ending-style:scale-90",
            "data-starting-style:opacity-0 data-starting-style:scale-90",
            "w-full-with-margins max-w-2xl max-h-full min-h-0",
            className && className,
          )}
        >
          {children}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  );
}
