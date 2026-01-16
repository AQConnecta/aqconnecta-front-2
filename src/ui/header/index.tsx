"use client";

import { BriefcaseIcon } from "@phosphor-icons/react/dist/ssr/Briefcase";
import { FilesIcon } from "@phosphor-icons/react/dist/ssr/Files";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo-icon.svg";
import { Routes } from "@/core/routes";
import { useAuth } from "@/stores/auth";
import NavbarItem from "../navbar-item";
import { LoggedUserBox } from "./logged-user-box";
import { UnloggedBox } from "./unlogged-user-box";
import { UserBoxSkeleton } from "./user-box-skeleton";

export function Header() {
  const isLoadingAuth = useAuth((state) => state.isLoadingAuth);
  const user = useAuth((state) => state.user);
  const userIsLoggedIn = user !== null;

  return (
    <header
      className={clsx(
        "flex bg-gray-100/70 mb-6 px-6 py-2.5 border-b border-black/10",
        "backdrop-blur-md shadow-[inset_0_-1px_0] shadow-white/70 gap-3 items-stretch",
        "sticky",
      )}
    >
      <div className="full-width:flex-1 flex justify-start items-stretch gap-3">
        <Link href={Routes.home} className="flex items-center">
          <Image
            src={Logo}
            alt="Logo do AQConnecta"
            width={48}
            height={48}
            className="max-small-width:size-[30px]"
          />
        </Link>
        <div
          aria-hidden
          className="max-xs-width:hidden h-auto w-[1px] bg-gray-200 block"
        />
      </div>
      <nav
        className={clsx(
          "full-width:flex-2 max-full-width:flex-1 flex gap-2",
          "full-width:justify-center items-center",
          "max-medium-width:hidden",
        )}
      >
        <NavbarItem.Root href={Routes.vacancies}>
          <NavbarItem.Icon icon={BriefcaseIcon} />
          <NavbarItem.Label>Vagas</NavbarItem.Label>
        </NavbarItem.Root>

        <NavbarItem.Root href={Routes.userSubmits}>
          <NavbarItem.Icon icon={FilesIcon} />
          <NavbarItem.Label>Minhas candidaturas</NavbarItem.Label>
        </NavbarItem.Root>
      </nav>
      <div className="flex-1 flex justify-end items-center gap-2">
        {isLoadingAuth ? (
          <UserBoxSkeleton />
        ) : userIsLoggedIn ? (
          <LoggedUserBox />
        ) : (
          <UnloggedBox />
        )}
      </div>
    </header>
  );
}
