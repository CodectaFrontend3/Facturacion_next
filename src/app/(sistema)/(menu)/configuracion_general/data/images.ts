import type { ConfigurationSection } from "../types/configuration-section";

const IMG_BACKGROUND_CARD =
  "https://img.magnific.com/fotos-premium/abstract-background-images-wallpaper-ai-generated_643360-68582.jpg";

export const configurationSections = [
  {
    id: "almacen",
    label: "Almacen",
    backgroundImage: IMG_BACKGROUND_CARD,
    image:
      "https://png.pngtree.com/png-vector/20240314/ourmid/pngtree-warehouse-flat-composition-png-image_11961969.png",
    action: { type: "modal", modalId: "almacen" },
  },
  {
    id: "apariencia",
    label: "Apariencia",
    backgroundImage: IMG_BACKGROUND_CARD,
    image:
      "https://www.gsmarketing.com/hubfs/New%20Website%20Images/illustrations%20/digital%20solutions-display.png",
    action: { type: "route", href: "/apariencia" },
  },
  {
    id: "familias",
    label: "Familias",
    backgroundImage: IMG_BACKGROUND_CARD,
    image:
      "https://cdn3d.iconscout.com/3d/premium/thumb/producto-10808619-8687861.png",
    action: { type: "modal", modalId: "familias" },
  },
  {
    id: "garantia",
    label: "Garantia",
    backgroundImage: IMG_BACKGROUND_CARD,
    image:
      "https://static.vecteezy.com/system/resources/previews/047/649/375/original/3d-golden-shield-icon-isolated-on-transparent-background-png.png",
    action: { type: "modal", modalId: "garantia" },
  },
  {
    id: "marcas",
    label: "Marcas",
    backgroundImage: IMG_BACKGROUND_CARD,
    image:
      "https://static.vecteezy.com/system/resources/previews/015/329/405/original/brand-3d-illustration-icon-png.png",
    action: { type: "modal", modalId: "marcas" },
  },
  {
    id: "motivos",
    label: "Motivos",
    backgroundImage: IMG_BACKGROUND_CARD,
    image:
      "https://static.vecteezy.com/system/resources/previews/028/272/877/original/puzzle-3d-rendering-isometric-icon-png.png",
    action: { type: "modal", modalId: "motivos" },
  },
  {
    id: "tipo-de-cambio",
    label: "Tipo De Cambio",
    backgroundImage: IMG_BACKGROUND_CARD,
    image:
      "https://cdn3d.iconscout.com/3d/premium/thumb/tipo-de-cambio-8578991-6805151.png",
    action: { type: "modal", modalId: "tipo-de-cambio" },
  },
  {
    id: "unidad-de-medida",
    label: "U. De Medida",
    backgroundImage: IMG_BACKGROUND_CARD,
    image:
      "https://cdn3d.iconscout.com/3d/premium/thumb/measuring-3d-icon-download-in-png-blend-fbx-gltf-file-formats--rulerbow-compass-navigation-office-pack-tools-equipment-icons-10967888.png",
    action: { type: "modal", modalId: "unidad-de-medida" },
  },
  {
    id: "usuarios",
    label: "Usuarios",
    backgroundImage: IMG_BACKGROUND_CARD,
    image:
      "https://static.vecteezy.com/system/resources/previews/060/498/831/non_2x/fascinating-acclaimed-facial-recognition-software-icon-with-transparent-background-free-png.png",
    action: { type: "route", href: "/usuario" },
  },
  {
    id: "validez",
    label: "Validez",
    backgroundImage: IMG_BACKGROUND_CARD,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/048/721/469/small_2x/a-green-check-mark-the-check-mark-is-a-symbol-of-approval-or-satisfaction-png.png",
    action: { type: "modal", modalId: "validez" },
  },
] satisfies ConfigurationSection[];
