import type { PropsWithChildren } from "react";

export function DialogActionsContainer({ children }: PropsWithChildren) {
  return (
    <>
      <hr className="my-6" />

      <div className="grid grid-flow-col gap-2">{children}</div>
    </>
  );
}

export namespace DialogActionsContainer {
  export function RightArea({ children }: PropsWithChildren) {
    return (
      <div className="self-start flex items-center justify-start gap-2">
        {children}
      </div>
    );
  }

  export function LeftArea({ children }: PropsWithChildren) {
    return (
      <div className="self-end flex items-center justify-end gap-2">
        {children}
      </div>
    );
  }
}
