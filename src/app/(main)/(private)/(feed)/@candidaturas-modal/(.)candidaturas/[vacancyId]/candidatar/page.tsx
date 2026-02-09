import { CandidatureDialog } from "./candidature-dialog";

type Props = {
  params: Promise<{
    vacancyId: string;
  }>;
};

export default async function Candidature({ params }: Props) {
  const { vacancyId } = await params;
  return <CandidatureDialog vacancyId={vacancyId} />;
}
