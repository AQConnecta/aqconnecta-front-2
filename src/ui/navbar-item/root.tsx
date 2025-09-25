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
        "before:h-[5px] before:absolute before:bg-primary-600 before:rounded-full",
        "before:inset-x-3 before:transition-[width] before:duration-150 not-data-[current]:before:w-0",
        "before:w-[calc(100%_-_24px)] transition-all duration-100 relative",

        !mobile && [
          "px-6 py-3 gap-3 rounded-2xl flex items-center justify-center",
          "hover:bg-primary-600/10 text-black not-data-[current]:active:bg-primary-600/20",
          "data-[current]:bg-primary-600/10 before:-bottom-[7px]",
        ],

        mobile && [
          "px-4 py-1 flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl",
          "bg-transparent not-data-[current]:active:bg-primary-600/20",
          "data-[current]:bg-primary-600/10 before:-top-[7px]",
        ],
      )}
    >
      {children}
    </Link>
  );
}
