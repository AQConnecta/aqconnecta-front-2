import "@/app/globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ServerEnv } from "@/config/env/server";
import { resolveTitle } from "@/core/metadata";
import { ReactQueryProvider } from "@/libs/react-query/provider";
import { ToasterProvider } from "@/libs/toaster";
import { PrefetchAuthUser } from "./prefetch-auth-user";

const montserrat = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
  preload: true,
  style: ["italic", "normal"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: resolveTitle(ServerEnv.appName),
  description:
    "Encontre projetos de extensão na sua universidade em poucos cliques.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} antialiased`}>
        <ReactQueryProvider>
          <PrefetchAuthUser />
          <ToasterProvider>{children}</ToasterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
