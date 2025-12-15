"use client";

import { type AvatarProps, Root } from "@radix-ui/react-avatar";
import clsx from "clsx";

type Props = AvatarProps;

export function AvatarRoot({ className, ...props }: Props) {
  return (
    <Root
      className={clsx(
        "relative flex size-12 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}
