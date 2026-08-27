export interface PermissionAction {
  id: string;
  label: string;
  description?: string;
}

export interface PermissionSection {
  id: string;
  label: string;
  actions: PermissionAction[];
}

export interface PermissionModule {
  id: string;
  title: string;
  sections: PermissionSection[];
}

export interface RolePermissionsState {
  id?: string;
  nombre: string;
  descripcion: string;
  selectedActions: Record<string, boolean>;
  expandedModules: Record<string, boolean>;
  expandedSections: Record<string, boolean>;
  isMainCardOpen: boolean;
}

export interface RoleFormValues {
  nombre: string;
  descripcion: string;
}
