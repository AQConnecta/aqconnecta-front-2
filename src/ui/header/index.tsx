"use client";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo-icon.svg";
import { Routes } from "@/core/routes";
import { useAuth } from "@/stores/auth";
import Navbar from "../navbar";
import { LoggedUserBox } from "./logged-user-box";
import { SearchForm } from "./search-form";
import { UnloggedBox } from "./unlogged-user-box";
import { UserBoxSkeleton } from "./user-box-skeleton";

export function Header() {
  const isLoadingAuth = useAuth((state) => state.isLoadingAuth);
  const user = useAuth((state) => state.user);
  const userIsLoggedIn = user !== null;

  return (
    <header className="bg-white mb-6">
      <div
        className={clsx(
          "sticky px-6 py-2.5 border-b border-black/10",
          "backdrop-blur-md shadow-[inset_0_-1px_0] shadow-white/70 items-stretch",
          "grid gap-3 [grid-template-areas:'logo_search_btns'] grid-cols-[auto_1fr]",
          "max-small-width:[grid-template-areas:'logo_btns'_'search_search']",
        )}
      >
        <div className="flex justify-start items-stretch gap-3 [grid-area:logo] w-fit">
          <Link href={Routes.home} className="flex items-center">
            <Image
              src={Logo}
              alt="Logo do AQConnecta"
              width={32}
              height={32}
              className="max-small-width:size-7.5"
            />
          </Link>
          <div
            aria-hidden
            className="max-xs-width:hidden h-auto w-px bg-gray-200 block"
          />
        </div>

        <SearchForm className="[grid-area:search] small-width:max-w-80 w-full" />

        <div className="flex justify-end items-center gap-2 [grid-area:btns]">
          {isLoadingAuth ? (
            <UserBoxSkeleton />
          ) : userIsLoggedIn ? (
            <LoggedUserBox />
          ) : (
            <UnloggedBox />
          )}
        </div>
      </div>

      <Navbar.Desktop />
    </header>
  );
}
