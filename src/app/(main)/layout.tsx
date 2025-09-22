import type { PropsWithChildren } from "react";
import { Header } from "@/ui/header";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
