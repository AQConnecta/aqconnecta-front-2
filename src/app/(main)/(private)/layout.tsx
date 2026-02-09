import type { ReactElement } from "react";

type Props = {
  children: ReactElement;
  "candidaturas-modal": ReactElement;
};

export default function FeedLayout({
  children,
  "candidaturas-modal": candidateModal,
}: Props) {
  return (
    <>
      {children}
      {candidateModal}
    </>
  );
}
