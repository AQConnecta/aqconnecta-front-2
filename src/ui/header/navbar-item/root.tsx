"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

type NavbarItemProps = PropsWithChildren<{
  href: string;
}>;

export function NavbarItemRoot({ href, children }: NavbarItemProps) {
  const isActive = usePathname() === href;
  return (
    <Link
      href={href}
      data-current={isActive || undefined}
      className={clsx(
        "px-6 py-3 gap-3 rounded-2xl flex items-center justify-center relative",
        "hover:bg-primary-600/10 text-black not-data-[current]:active:bg-primary-600/20",
        "data-[current]:bg-primary-600/10 before:w-[calc(100%_-_24px)] not-data-[current]:before:w-0",
        "before:h-[5px] before:absolute before:bg-primary-600 before:rounded-full before:-bottom-[7px]",
        "before:inset-x-3 before:transition-[width] before:duration-150",
        "transition-all duration-100",
      )}
    >
      {children}
    </Link>
  );
}
