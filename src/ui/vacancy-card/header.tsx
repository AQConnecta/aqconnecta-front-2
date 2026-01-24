import Link from "next/link";
import Avatar from "@/components/avatar";

type Props = {
  isUserThePublisher: boolean;
  title: string;
  publisherProfilePicutreUrl?: string;
  publisherName: string;
};

export function VacancyCardHeader({
  isUserThePublisher,
  publisherName,
  title,
  publisherProfilePicutreUrl: profilePicutreUrl,
}: Props) {
  return (
    <header className="mb-10 flex gap-3 items-start">
      <Link href={"#"}>
        <Avatar.Root>
          {profilePicutreUrl && <Avatar.Image src={profilePicutreUrl} />}
          <Avatar.Fallback name={publisherName} />
        </Avatar.Root>
      </Link>
      <div className="flex flex-col gap-1">
        <span className="font-medium text-base">{title}</span>
        <span className="text-sm text-gray-750">
          Criado por{" "}
          <Link href={"#"}>{isUserThePublisher ? "você" : publisherName}</Link>
        </span>
        {/* TODO: add context menu */}
      </div>
    </header>
  );
}
