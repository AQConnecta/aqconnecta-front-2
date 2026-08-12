import { TrashIcon } from "@phosphor-icons/react/dist/ssr/Trash";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import type * as React from "react";
import IconButton from "./icon-button";

const badgeVariants = cva(
  [
    "rounded-xl border",
    "text-xs font-semibold w-fit whitespace-nowrap shrink-0 focus-visible:border-ring",
    "focus-visible:ring-4 transition-[color,box-shadow] overflow-hidden",
    "[&>svg]:size-3 gap-1 [&>svg]:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        default:
          "border-gray-200 bg-gray-200 [a&]:hover:bg-gray-400 ring-primary-600/25",
        primary:
          "border-primary-300 bg-primary-200 text-primary-700 [a&]:hover:bg-primary-200/90 ring-primary-600/40",
        blue: "border-royal-blue-300 bg-royal-blue-100 text-royal-blue-700 [a&]:hover:bg-royal-blue-300/80",
        green:
          "border-jade-300 bg-jade-100 text-jade-500 [a&]:hover:bg-jade-300/90 ring-jade-500/40",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type Props = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    asChild?: boolean;
    onDelete?: React.MouseEventHandler;
  };

function Badge({
  className,
  variant,
  asChild = false,
  children,
  onDelete,
  ...props
}: Props) {
  const Comp = asChild ? Slot : "span";

  let deleteButton = null;

  if (onDelete)
    deleteButton = (
      <IconButton.Root onClick={onDelete} size="sm" title="Remover">
        <IconButton.Label>Remover</IconButton.Label>
        <IconButton.Icon icon={TrashIcon} weight="fill" />
      </IconButton.Root>
    );

  return (
    <Comp
      data-slot="badge"
      className={clsx(
        "inline-flex items-center justify-center px-2 py-0.5",
        onDelete && "pr-0.5",
        badgeVariants({ variant }),
        className,
      )}
      {...props}
    >
      {onDelete ? (
        children
      ) : (
        <span className="inline-flex items-center justify-center gap-1">
          {children}
        </span>
      )}
      {deleteButton}
    </Comp>
  );
}

export { Badge, badgeVariants };
