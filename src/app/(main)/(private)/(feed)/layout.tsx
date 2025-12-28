import type { ReactElement } from "react";

type Props = {
  children: ReactElement;
  "candidatar-se-modal": ReactElement;
};

export default function FeedLayout({
  children,
  "candidatar-se-modal": candidateModal,
}: Props) {
  return (
    <>
      {children}
      {candidateModal}
    </>
  );
}
