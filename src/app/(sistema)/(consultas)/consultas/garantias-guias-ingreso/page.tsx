import { ConsultasGarantiaLayout } from "../_components/ConsultasGarantiaLayout";
import { mockGarantiaIngreso } from "../_data/mockConsultasGarantia";

export default function GarantiasGuiasIngresoPage() {
  return (
    <ConsultasGarantiaLayout
      title="Guías de Ingreso"
      data={mockGarantiaIngreso}
    />
  );
}
