"use client";

import { useParams } from "next/navigation";
import type { ReactElement } from "react";
import { Alert } from "@/components/alert";
import { Main } from "@/components/main";
import { useGetUserProfile } from "@/hooks/users/get-user-profile";
import { useAuth } from "@/stores/auth";
import { AboutSection } from "./about";
import { AcademicTrainingSection } from "./academic-training";
import { CompetencesSection } from "./competences";
import { ExperiencesSection } from "./experiences";
import { Skeleton } from "./skeleton";
import { SummarySection } from "./summary";

type Params = {
  path: string;
};

export default function PerfilUsuario() {
  const authUser = useAuth((state) => state.user);
  const { path } = useParams<Params>();
  const {
    data: response,
    status,
    error,
  } = useGetUserProfile({
    userUrl: path,
  });

  let content: ReactElement;

  switch (status) {
    case "error":
      content = <Alert variant="danger" content={error.message} />;
      break;
    case "pending":
      content = <Skeleton />;
      break;
    case "success": {
      const completeUser = response.data!;
      const userOwnsProfile = authUser?.id === completeUser.id;

      content = (
        <div className="flex gap-4 max-small-width:flex-col">
          <div className="w-full medium-width:max-w-3xs flex flex-col gap-4 min-w-0">
            <SummarySection
              authUser={authUser}
              completeUser={completeUser}
              userOwnsProfile={userOwnsProfile}
            />
            <CompetencesSection
              authUser={authUser}
              completeUser={completeUser}
              userOwnsProfile={userOwnsProfile}
            />
          </div>

          <div className="flex flex-col w-full gap-4 min-w-0">
            <AboutSection
              authUser={authUser}
              completeUser={completeUser}
              userOwnsProfile={userOwnsProfile}
            />
            <AcademicTrainingSection
              completeUser={completeUser}
              userOwnsProfile={userOwnsProfile}
              authUser={authUser}
            />
            <ExperiencesSection
              authUser={authUser}
              completeUser={completeUser}
              userOwnsProfile={userOwnsProfile}
            />
          </div>
        </div>
      );

      break;
    }
  }

  return <Main className="max-w-medium-area!">{content}</Main>;
}
