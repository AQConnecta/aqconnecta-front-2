export function CandidatureFormSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      {new Array(3).map((_, index) => (
        <div
          className="rounded-xl bg-black/10 animate-pulse"
          key={`candidature-resume-skeleton-${index + 1}`}
        />
      ))}
    </div>
  );
}
