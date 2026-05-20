import { useState } from "react";

import { Egreso } from "@/app/servicio-tecnico/types/servicios/Egreso";

export function useEgresoTable(data: Egreso[]) {
  const [selectedEgreso, setSelectedEgreso] = useState<Egreso | null>(null);
  const [isRepararModalOpen, setIsRepararModalOpen] = useState(false);

  const openRepararModal = (egreso: Egreso) => {
    setSelectedEgreso(egreso);
    setIsRepararModalOpen(true);
  };

  const closeRepararModal = () => {
    setIsRepararModalOpen(false);
    setSelectedEgreso(null);
  };

  return {
    data,
    selectedEgreso,
    isRepararModalOpen,
    openRepararModal,
    closeRepararModal,
  };
}
