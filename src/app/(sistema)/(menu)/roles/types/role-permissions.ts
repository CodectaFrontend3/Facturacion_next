export interface PermissionItem {
  id: string;
  label: string;
}

export interface PermissionModule {
  id: string;
  title: string;
  permissions: PermissionItem[];
}

export interface RolePermissionsState {
  id?: string;
  nombre: string;
  descripcion: string;
  selectedPermissions: Record<string, boolean>;
  isMainCardOpen: boolean;
}

export interface RoleFormValues {
  nombre: string;
  descripcion: string;
}
