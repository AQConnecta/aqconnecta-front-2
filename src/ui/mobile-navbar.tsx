import { BriefcaseIcon } from "@phosphor-icons/react/dist/ssr/Briefcase";
import { FilesIcon } from "@phosphor-icons/react/dist/ssr/Files";
import { HouseIcon } from "@phosphor-icons/react/dist/ssr/House";
import clsx from "clsx";
import { Routes } from "@/core/routes";
import NavbarItem from "./navbar-item";

export function MobileNavbar() {
  return (
    <nav
      className={clsx(
        "medium-width:hidden p-2.5 flex justify-center items-stretch",
        "fixed bottom-0 inset-x-0 bg-gray-100/70 border-t border-black/10",
        "backdrop-blur-md shadow-[inset_0_-1px_0] shadow-white/70 gap-3 items-stretch",
      )}
    >
      <NavbarItem.Root href={Routes.home} mobile>
        <NavbarItem.Icon icon={HouseIcon} />
        <NavbarItem.Label>Início</NavbarItem.Label>
      </NavbarItem.Root>
      <NavbarItem.Root href={Routes.vacancies} mobile>
        <NavbarItem.Icon icon={BriefcaseIcon} />
        <NavbarItem.Label>Vagas</NavbarItem.Label>
      </NavbarItem.Root>
      <NavbarItem.Root href={Routes.userSubmits} mobile>
        <NavbarItem.Icon icon={FilesIcon} />
        <NavbarItem.Label>Minhas Candidaturas</NavbarItem.Label>
      </NavbarItem.Root>
    </nav>
  );
}
