import * as Slot from "@radix-ui/react-slot";
import clsx from "clsx";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import type { TButtonSize, TButtonVariant } from ".";

type ButtonCoreProps = PropsWithChildren<{
  className?: string;
  variant?: TButtonVariant;
  size?: TButtonSize;
}>;

type ButtonProps =
  | ({
      asChild?: false;
    } & ButtonCoreProps &
      ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ asChild: true } & ButtonCoreProps);

export function ButtonRoot({
  children,
  asChild,
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const Element = asChild ? Slot.Root : "button";
  return (
    <Element
      data-variant={variant}
      data-size={size}
      className={clsx(
        "group flex gap-3 items-center justify-center font-bold",
        "transition-all duration-100 cursor-default",
        size === "md" && [
          "px-8 py-3 rounded-xl text-lg",
          "max-medium-width:px-5 max-medium-width:py-2 max-medium-width:text-sm",
        ],
        size === "sm" && "px-5 py-2 rounded-xl",
        variant === "primary" && [
          "drop-shadow-[0_2px_0] drop-shadow-black/15 bg-primary-600 text-white",
          "hover:bg-primary-700 active:opacity-90",
        ],
        variant === "ghost-primary" && [
          // usar o before é necessário se quisermos evitar que o drop-shadow afete
          // o conteúdo dentro do botão devido a translucidez do background
          "before:absolute before:inset-0 relative before:rounded-xl",
          "before:bg-primary-600/25 text-primary-600",
          "hover:before:bg-primary-700/25 active:before:bg-primary-700/40",
          "before:drop-shadow-[0_2px_0] before:drop-shadow-black/15",
        ],
        className && className,
      )}
      {...props}
    >
      {children}
    </Element>
  );
}
