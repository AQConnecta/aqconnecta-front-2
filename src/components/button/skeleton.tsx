import clsx from "clsx";

type Props = {
  className?: string;
  chars?: number;
};

export function ButtonSkeleton({ className, chars = 20 }: Props) {
  return (
    <div
      aria-hidden
      className={clsx(
        "bg-gray-200 animate-pulse rounded-2xl text-transparent",
        "px-2.5 py-2 rounded-lg gap-2 font-semibold text-sm",
        className,
      )}
    >
      {"\u00A0".repeat(chars)}
    </div>
  );
}
