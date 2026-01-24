"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

type NavbarItemProps = PropsWithChildren<{
  href: string;
  mobile?: boolean;
}>;

export function NavbarItemRoot({
  href,
  children,
  mobile = false,
}: NavbarItemProps) {
  const isActive = usePathname() === href;
  return (
    <Link
      href={href}
      data-current={isActive || undefined}
      className={clsx(
        "before:h-1.25 before:absolute before:bg-primary-600 before:rounded-full",
        "before:inset-x-3 before:transition-[width] before:duration-150 not-data-current:before:w-0",
        "before:w-[calc(100%-24px)] transition-all duration-100 relative gap-2",
        "data-current:cursor-default",

        !mobile && [
          "px-5 py-3 rounded-2xl flex items-center justify-center",
          "not-data-current:hover:bg-primary-600/10 text-black not-data-current:active:bg-primary-600/20",
          "before:-bottom-1.75",
        ],

        mobile && [
          "px-4 py-1 flex flex-1 flex-col items-center justify-center rounded-2xl",
          "bg-transparent not-data-current:active:bg-primary-600/20",
          "before:-top-1.75",
        ],
      )}
    >
      {children}
    </Link>
  );
}
