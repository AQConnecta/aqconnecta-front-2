import Button from "@/components/button";

export function SidebarAuthUserProfileSkeleton() {
  return (
    <div className="card animate-pulse flex flex-col items-center">
      <div className="size-20 mb-4 rounded-full bg-gray-300 animate-pulse" />
      <div className="rounded-full text-base mb-1 bg-gray-200 animate-pulse">
        {"\u00A0".repeat(25)}
      </div>
      <div className="rounded-full bg-gray-200 animate-pulse">
        {"\u00A0".repeat(40)}
      </div>

      <div className="mt-6 rounded-lg bg-gray-200 w-full h-20"></div>
      <div className="mt-4 w-full flex flex-col gap-2">
        <Button.Skeleton chars={30} className="w-full"></Button.Skeleton>
        <Button.Skeleton chars={25} className="w-full"></Button.Skeleton>
      </div>
    </div>
  );
}
