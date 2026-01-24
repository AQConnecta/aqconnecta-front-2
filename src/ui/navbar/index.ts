import { BriefcaseIcon } from "@phosphor-icons/react/dist/ssr/Briefcase";
import { FilesIcon } from "@phosphor-icons/react/dist/ssr/Files";
import { Routes } from "@/core/routes";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";

export const NavbarRoutes = [
  {
    route: Routes.vacancies,
    icon: BriefcaseIcon,
    label: "Feed",
  },
  {
    route: Routes.userSubmits,
    icon: FilesIcon,
    label: "Minhas candidaturas",
  },
] as const;

export default {
  Mobile: MobileNavbar,
  Desktop: DesktopNavbar,
};
