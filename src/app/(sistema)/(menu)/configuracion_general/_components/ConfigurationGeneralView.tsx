"use client";

import { useWarehouseManager } from "../hooks/useWarehouseManager";
import { useGarantiaManager } from "../hooks/useGarantiaManager";
import { useUnitMeasureManager } from "../hooks/useUnitMeasureManager";
import { useMarcaManager } from "../hooks/useMarcaManager";
import { configurationSections } from "../data/images";
import { ConfigurationCard } from "./ConfigurationCard";

import { WarehouseModal } from "./warehouse/WarehouseModal";
import { GarantiaModal } from "./garantia/GarantiaModal";
import { UnitMeasureModal } from "./unit-measure/UnitMeasureModal";
import { MarcaModal } from "./marca/MarcaModal";

export function ConfigurationGeneralView() {
  const warehouseManager = useWarehouseManager();
  const garantiaManager = useGarantiaManager();
  const unitMeasureManager = useUnitMeasureManager();
  const marcaManager = useMarcaManager();

  const handleModalOpen = (modalId: string) => {
    if (modalId === "almacen") {
      warehouseManager.openModal();
    } else if (modalId === "garantia") {
      garantiaManager.openModal();
    } else if (modalId === "unidad-de-medida") {
      unitMeasureManager.openModal();
    } else if (modalId === "marcas") {
      marcaManager.openModal();
    }
  };

  return (
    <>
      <section
        aria-label="Configuración general"
        className="mx-auto w-full max-w-[1240px] px-4 py-6 sm:px-6 sm:py-8 lg:py-10"
      >
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 md:gap-x-12 md:gap-y-12 xl:grid-cols-4 xl:gap-x-14 xl:gap-y-14">
          {configurationSections.map((section) => (
            <ConfigurationCard
              key={section.id}
              section={section}
              onModalOpen={handleModalOpen}
            />
          ))}
        </div>
      </section>

      <WarehouseModal manager={warehouseManager} />
      <GarantiaModal manager={garantiaManager} />
      <UnitMeasureModal manager={unitMeasureManager} />
      <MarcaModal manager={marcaManager} />
    </>
  );
}
