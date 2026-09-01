import { ConsultaGarantiaRow } from "../_components/consultasGarantiaColumns";
import ingresoRaw from "./garantia-ingreso-mock.json";
import egresoRaw from "./garantia-egreso-mock.json";
import informeRaw from "./garantia-informe-mock.json";

export const mockGarantiaIngreso: ConsultaGarantiaRow[] = ingresoRaw as ConsultaGarantiaRow[];
export const mockGarantiaEgreso: ConsultaGarantiaRow[] = egresoRaw as ConsultaGarantiaRow[];
export const mockGarantiaInformeTecnico: ConsultaGarantiaRow[] = informeRaw as ConsultaGarantiaRow[];
