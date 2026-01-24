import clsx from "clsx";
import { NavbarRoutes } from ".";
import NavbarItem from "./item";

export function MobileNavbar() {
  return (
    <nav
      className={clsx(
        "small-width:hidden p-2.5 flex justify-center items-stretch",
        "fixed bottom-0 inset-x-0 bg-gray-100/70 border-t border-black/10",
        "backdrop-blur-md shadow-[inset_0_-1px_0] shadow-white/70 gap-3 items-stretch",
      )}
    >
      {NavbarRoutes.map(({ icon, label, route }) => (
        <NavbarItem.Root href={route} key={`navbar-item-${route}`} mobile>
          <NavbarItem.Icon icon={icon} />
          <NavbarItem.Label>{label}</NavbarItem.Label>
        </NavbarItem.Root>
      ))}
    </nav>
  );
}
