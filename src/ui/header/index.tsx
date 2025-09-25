import { BriefcaseIcon } from "@phosphor-icons/react/dist/ssr/Briefcase";
import { FilesIcon } from "@phosphor-icons/react/dist/ssr/Files";
import { KeyIcon } from "@phosphor-icons/react/dist/ssr/Key";
import { UserIcon } from "@phosphor-icons/react/dist/ssr/User";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/logo-icon.svg";
import Button from "@/components/button";
import { Routes } from "@/core/routes";
import NavbarItem from "./navbar-item";

export function Header() {
  const userIsLoggedIn = false;

  return (
    <header
      className={clsx(
        "flex bg-gray-100/70 px-6 py-2.5 border-b border-black/10",
        "backdrop-blur-md shadow-[inset_0_-1px_0] shadow-white/70 gap-3 items-stretch",
        "sticky",
      )}
    >
      <div className="full-width:flex-1 flex justify-start items-center">
        <Link href={Routes.home}>
          <Image
            src={Logo}
            alt="Logo do AQConnecta"
            width={48}
            height={48}
            className="max-small-width:size-[30px]"
          />
        </Link>
      </div>
      <div
        aria-hidden
        className="max-xs-width:hidden h-auto w-[1px] bg-gray-200 block"
      />
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
      <div className="flex-1 flex justify-end gap-2">
        {userIsLoggedIn ? (
          <span>foo</span>
        ) : (
          <>
            <Button.Root
              asChild
              className="text-nowrap"
              size="md"
              variant="primary"
            >
              <Link href={Routes.register}>
                <Button.Icon icon={UserIcon} />
                Registre-se
              </Link>
            </Button.Root>
            <Button.Root
              asChild
              className="text-nowrap"
              size="md"
              variant="ghost-primary"
            >
              <Link href={Routes.login}>
                <Button.Icon icon={KeyIcon} />
                Login
              </Link>
            </Button.Root>
          </>
        )}
      </div>
    </header>
  );
}
