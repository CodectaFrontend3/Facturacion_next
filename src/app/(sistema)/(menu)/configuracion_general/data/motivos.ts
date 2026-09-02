import type { Motivo } from "../types/motivo";

export const motivoTipoOptions = [
  { value: "Compras", label: "Compras" },
  { value: "Ventas", label: "Ventas" },
  { value: "Salidas", label: "Salidas" },
] as const;

export const initialMotivos: Motivo[] = [
  {
    id: 1,
    nombre: "Compras Internacionales",
    tipo: "Compras",
    activo: true,
  },
  {
    id: 2,
    nombre: "Compras Locales",
    tipo: "Compras",
    activo: false,
  },
  {
    id: 3,
    nombre: "Devolucion Clientes",
    tipo: "Salidas",
    activo: true,
  },
  {
    id: 4,
    nombre: "Devolucion Guia/Remision",
    tipo: "Compras",
    activo: false,
  },
  {
    id: 5,
    nombre: "Inventario Inicial",
    tipo: "Sin Asignar",
    activo: true,
  },
  {
    id: 6,
    nombre: "Traslado de Almacen",
    tipo: "Sin Asignar",
    activo: true,
  },
];
