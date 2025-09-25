import type { PropsWithChildren } from "react";
import { Header } from "@/ui/header";
import { MobileNavbar } from "@/ui/mobile-navbar";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <MobileNavbar />
    </>
  );
}
