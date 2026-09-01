import { ConsultasGarantiaLayout } from "../_components/ConsultasGarantiaLayout";
import { mockGarantiaEgreso } from "../_data/mockConsultasGarantia";

export default function GarantiasGuiasEgresoPage() {
  return (
    <ConsultasGarantiaLayout
      title="Guías de Egreso"
      data={mockGarantiaEgreso}
    />
  );
}
