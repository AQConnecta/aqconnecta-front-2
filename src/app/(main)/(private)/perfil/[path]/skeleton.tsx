import clsx from "clsx";

export function Skeleton() {
  return (
    <div className="flex gap-4" inert>
      <div className="w-full medium-width:max-w-3xs">
        <SummarySkeleton />
        <SectionSkeleton className="h-14" titleChars={15} />
      </div>
      <div className="w-full">
        <SectionSkeleton className="h-20" titleChars={20} />
        <SectionSkeleton className="h-14" titleChars={60} />
        <SectionSkeleton className="h-36" titleChars={30} />
      </div>
    </div>
  );
}

function SectionSkeleton({
  className,
  titleChars = 24,
}: {
  className?: string;
  titleChars?: number;
}) {
  return (
    <div className="card-skeleton mb-4 flex flex-col p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="size-5 rounded-full bg-gray-300 animate-pulse" />
        <TextSkeleton chars={titleChars} className="text-lg!" />
      </div>

      <div
        className={clsx("card-skeleton bg-black/3 border-none", className)}
      />
    </div>
  );
}

function TextSkeleton({
  chars,
  className,
}: {
  chars: number;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "bg-gray-300 animate-pulse wrap-anywhere rounded-2xl text-xl select-none",
        className,
      )}
    >
      {"\u00A0".repeat(chars)}
    </div>
  );
}

function SummarySkeleton() {
  return (
    <div className="card-skeleton p-6 mb-4 flex flex-col items-center gap-4">
      <div className="size-32 rounded-full bg-primary-700/50 animate-pulse" />
      <TextSkeleton chars={60} />
      <div className="flex flex-col items-center gap-2">
        <TextSkeleton chars={40} className="text-base!" />
        <TextSkeleton chars={25} className="text-base!" />
      </div>
      <hr className="w-full animate-pulse" />
      <div className="flex gap-1">
        <div className="rounded-full size-6 bg-gray-300 animate-pulse" />
        <div className="rounded-full size-6 bg-gray-300 animate-pulse" />
        <div className="rounded-full size-6 bg-gray-300 animate-pulse" />
      </div>
    </div>
  );
}
