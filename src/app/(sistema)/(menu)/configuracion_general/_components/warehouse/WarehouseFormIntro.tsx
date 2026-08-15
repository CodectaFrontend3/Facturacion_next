import Image from "next/image";

import { ActionButton } from "@/components/common/ActionButton";

import { WAREHOUSE_IMAGE } from "../../data/images";
import type { WarehouseFormMode } from "../../types/warehouse";

interface WarehouseFormIntroProps {
  mode: WarehouseFormMode;
  onCancel: () => void;
}

const titles: Record<WarehouseFormMode, string> = {
  create: "Crear Almacen",
  edit: "Editar Almacen",
  view: "Detalle Almacen",
};

export function WarehouseFormIntro({
  mode,
  onCancel,
}: WarehouseFormIntroProps) {
  return (
    <aside className="flex min-h-[370px] w-full shrink-0 flex-col items-center border-b border-gray-200 px-4 py-4 lg:w-[250px] lg:border-r lg:border-b-0">
      <h3 className="text-[21px] font-light text-[#6d7073]">{titles[mode]}</h3>
      <div className="relative mt-2 size-28">
        <Image
          src={WAREHOUSE_IMAGE}
          alt="Almacén nuevo"
          fill
          unoptimized
          sizes="112px"
          className="object-contain"
        />
      </div>
      <span className="text-[15px] font-bold text-[#676a6c]">
        Almacen Nuevo
      </span>

      <ActionButton
        text={mode === "view" ? "Cerrar" : "Cancelar"}
        variant="outline"
        onClick={onCancel}
        className="mt-auto h-9 w-full rounded-[2px] border-gray-300 bg-white text-[12px] font-medium text-[#676a6c] hover:bg-gray-50"
      />
    </aside>
  );
}
