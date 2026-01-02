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
      <DialogPrimitive.Popup
        className={clsx(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 card transition-all duration-150",
          "data-ending-style:opacity-0 data-ending-style:scale-90",
          "data-starting-style:opacity-0 data-starting-style:scale-90",
          className && className,
        )}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}
