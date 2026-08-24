import { FamiliaDetailView } from "./_components/FamiliaDetailView";

interface FamiliaPageProps {
  params: Promise<{ id: string }>;
}

export default async function FamiliaPage({ params }: FamiliaPageProps) {
  const resolvedParams = await params;
  const familiaId = Number(resolvedParams.id) || 1;

  return <FamiliaDetailView familiaId={familiaId} />;
}
