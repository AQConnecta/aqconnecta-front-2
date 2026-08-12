import type { PropsWithChildren } from "react";
import { Footer } from "@/ui/footer";
import { Header } from "@/ui/header";
import Navbar from "@/ui/navbar";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Navbar.Mobile />
    </>
  );
}
