import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import { ServerEnv } from "@/config/env/server";
import { resolveTitle } from "@/core/metadata";

export const metadata = {
  title: resolveTitle("Candidate-se", ServerEnv.appName),
} satisfies Metadata;

type Props = PropsWithChildren;

export default function CandidatureLayout({ children }: Props) {
  return children;
}
