import type { Virtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import type { CSSProperties, PropsWithChildren, Ref } from "react";

type Props = PropsWithChildren<{
  ref: Ref<HTMLDivElement>;
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  className?: string;
  style?: CSSProperties;
}>;

export function ComboboxVirtualizerListWrapper({
  ref,
  children,
  virtualizer,
  style,
  className,
}: Props) {
  const totalSize = virtualizer.getTotalSize();
  return (
    <div
      role="presentation"
      ref={ref}
      className={clsx(
        "h-[min(--spacing(92),var(--total-size))] max-h-(--available-height)",
        "overflow-auto overscroll-contain scroll-p-2 p-1 box-content",
        className,
      )}
      style={{ "--total-size": `${totalSize}px`, ...style } as CSSProperties}
    >
      <div role="presentation" className="relative w-full h-(--total-size)">
        {children}
      </div>
    </div>
  );
}
