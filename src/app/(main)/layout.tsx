import type { PropsWithChildren } from "react";
import { Header } from "@/ui/header";
import Navbar from "@/ui/navbar";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Navbar.Mobile />
    </>
  );
}
