import type {
  AparienciaOption,
  ColorSwatchItem,
  ComprobanteToggleItem,
} from "../types/apariencia";

export const fondoPerfilOptions: AparienciaOption[] = [
  { value: "noche_oscura.png", label: "noche_oscura.png" },
  { value: "fondo_claro.png", label: "fondo_claro.png" },
  { value: "fondo_azul.png", label: "fondo_azul.png" },
  { value: "fondo_moderno.png", label: "fondo_moderno.png" },
];

export const bordePerfilOptions: AparienciaOption[] = [
  { value: "0px", label: "0px" },
  { value: "1px", label: "1px" },
  { value: "2px", label: "2px" },
  { value: "3px", label: "3px" },
  { value: "4px", label: "4px" },
];

export const colorSwatches: ColorSwatchItem[] = [
  { id: "coral", color: "#ed5565", label: "Coral / Rojo" },
  { id: "orange", color: "#f8ac59", label: "Naranja" },
  { id: "teal", color: "#1ab394", label: "Verde / Turquesa" },
  { id: "blue", color: "#2386db", label: "Azul" },
];

export const comprobanteItems: ComprobanteToggleItem[] = [
  {
    id: "guia_remision",
    label: "Mostrar firma en Guía de Remisión",
    enabled: true,
  },
  {
    id: "cotizacion",
    label: "Mostrar firma en Cotización",
    enabled: true,
  },
  {
    id: "nota_venta",
    label: "Mostrar firma en Nota Venta",
    enabled: true,
  },
];

export const fuenteOptions: AparienciaOption[] = [
  { value: "Times New Roman", label: "Times New Roman" },
  { value: "Arial", label: "Arial" },
  { value: "Roboto", label: "Roboto" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Open Sans", label: "Open Sans" },
];

export const colorFondoOptions: AparienciaOption[] = [
  { value: "Claro", label: "Claro" },
  { value: "Oscuro", label: "Oscuro" },
  { value: "Gris", label: "Gris" },
  { value: "Automático", label: "Automático" },
];
