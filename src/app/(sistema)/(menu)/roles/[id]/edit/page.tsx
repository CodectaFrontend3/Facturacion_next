import { RolePermissionsForm } from "../../_components/RolePermissionsForm";

interface EditRolePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditRolePage({ params }: EditRolePageProps) {
  const resolvedParams = await params;
  const roleId = resolvedParams.id || "1";

  return <RolePermissionsForm roleId={roleId} />;
}
