import clsx from "clsx";

export function FormInputSkeleton() {
  return (
    <div
      className={clsx("input-wrapper animate-pulse text-transparent min-h-9")}
    />
  );
}
