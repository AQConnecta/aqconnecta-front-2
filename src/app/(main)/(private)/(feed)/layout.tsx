import type { ReactElement } from "react";
import { SidebarAuthUserProfile } from "@/ui/sidebar-profile";
import { HotCompetences } from "./hot-competences";

type Props = { children: ReactElement };

export default function FeedLayout({ children }: Props) {
  return (
    <div className="flex justify-center items-start gap-6 w-full-with-margins mx-auto">
      <aside>
        <HotCompetences />
      </aside>
      {children}
      <aside className="flex flex-col gap-4 w-fit">
        <SidebarAuthUserProfile />
      </aside>
    </div>
  );
}
