import { UsuarioDetailView } from "./_components/UsuarioDetailView";

interface UsuarioDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function UsuarioDetailPage({
  params,
}: UsuarioDetailPageProps) {
  const resolvedParams = await params;
  const userId = resolvedParams.id || "1";

  return <UsuarioDetailView userId={userId} />;
}
