type Props = {
  params: Promise<{
    vacancyId: string;
  }>;
};
export default async function Candidatar({ params }: Props) {
  const { vacancyId } = await params;
  return <h1>vaga: {vacancyId}</h1>;
}
