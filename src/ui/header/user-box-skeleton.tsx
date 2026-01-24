import Button from "@/components/button";

export function UserBoxSkeleton() {
  return (
    <>
      <Button.Skeleton chars={29} />
      <Button.Skeleton chars={17} />
    </>
  );
}
