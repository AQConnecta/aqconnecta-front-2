import { ViewCandidaturesDialog } from "./view-candidatures-dialog";

type Props = {
  params: Promise<{
    vacancyId: string;
  }>;
};

export default async function ViewCandidatures({ params }: Props) {
  const { vacancyId } = await params;
  return <ViewCandidaturesDialog vacancyId={vacancyId} />;
}
