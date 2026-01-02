"use client";

import { Avatar, type AvatarRootProps } from "@base-ui/react/avatar";
import clsx from "clsx";

type Props = AvatarRootProps;

export function AvatarRoot({ className, ...props }: Props) {
  return (
    <Avatar.Root
      className={clsx(
        "relative flex size-12 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}
