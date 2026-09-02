import type { Rol } from "../types/usuario";

export const initialRoles: Rol[] = [
  {
    id: "1",
    nombre: "Administrador",
    usuariosAsignados: 14,
    descripcion: "Rol de Administrador Total del Sistema",
    activo: true,
  },
  {
    id: "2",
    nombre: "Vendedor",
    usuariosAsignados: 1,
    descripcion: "Rol de Vendedor Total del Sistema",
    activo: true,
  },
  {
    id: "3",
    nombre: "Personalizado",
    usuariosAsignados: 0,
    descripcion: "Rol para Personalizar en el Sistema",
    activo: true,
  },
];
