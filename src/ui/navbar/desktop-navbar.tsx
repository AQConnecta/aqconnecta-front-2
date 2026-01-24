import clsx from "clsx";
import { NavbarRoutes } from ".";
import NavbarItem from "./item";

export function DesktopNavbar() {
  return (
    <nav
      className={clsx(
        "full-width:flex-2 max-full-width:flex-1 flex gap-1",
        "items-center px-6 py-1 border-b border-black/10 max-small-width:hidden",
      )}
    >
      {NavbarRoutes.map(({ icon, label, route }) => (
        <NavbarItem.Root href={route} key={`navbar-item-${route}`}>
          <NavbarItem.Icon icon={icon} />
          <NavbarItem.Label>{label}</NavbarItem.Label>
        </NavbarItem.Root>
      ))}
    </nav>
  );
}
