import { ConsultasGarantiaLayout } from "../_components/ConsultasGarantiaLayout";
import { mockGarantiaInformeTecnico } from "../_data/mockConsultasGarantia";

export default function GarantiasInformeTecnicoPage() {
  return (
    <ConsultasGarantiaLayout
      title="Informe Técnico"
      data={mockGarantiaInformeTecnico}
    />
  );
}
