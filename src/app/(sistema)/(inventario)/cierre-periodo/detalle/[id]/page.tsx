"use client";

import { useParams, useRouter } from "next/navigation";
import CierrePeriodoData from "../../../data/CierrePeriodo.json";
import { CierrePeriodo } from "../../../types/CierrePeriodo";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";

const data: CierrePeriodo[] = CierrePeriodoData as CierrePeriodo[];

function Page() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const registro = data.find((item) => item.id === parseInt(id));

  if (!registro) {
    return (
      <div className="p-6 text-center text-muted-foreground font-sans">
        Registro no encontrado.
      </div>
    );
  }

  const fecha = new Date(registro.fecha_cierre.replace(/-/g, "\/"));
  const mesAnioLabel = `${fecha.getMonth() + 1}/${fecha.getFullYear()}`;

  const valorizacionSoles = registro.monto * registro.precioUnitario;
  const tipoCambio = 3.723;
  const valorizacionDolares = valorizacionSoles / tipoCambio;

  return (
    <div className="w-full bg-white p-4 font-sans text-[#334155] relative">
      {/* Botones de navegación superiores */}
      <div className="max-w-[95%] mx-auto flex justify-between items-center mb-2">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200/50 transition-colors font-medium text-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Regresar
        </Button>

        <Button
          size="icon"
          variant="destructive"
          className="h-9 w-9 bg-[#E14D57] hover:bg-[#c83c45] shadow-sm rounded-md"
        >
          <FileText className="h-5 w-5 text-white" />
        </Button>
      </div>

      {/* Contenedor Principal en Blanco (Simulando la hoja del reporte) */}
      <div className="max-w-[95%] mx-auto bg-white border border-gray-200 rounded-sm p-8 shadow-sm space-y-8">
        {/* Encabezados del Título */}
        <div className="text-center space-y-1">
          <p className="text-[13px] font-semibold text-gray-800 tracking-wide">
            Demo
          </p>
          <h1 className="text-xl md:text-2xl font-light text-[#9CA3AF] uppercase tracking-[0.2em]">
            Reporte de Stock Valorizado
          </h1>
          <p className="text-[12px] font-bold text-gray-800 pt-4 tracking-wider">
            AL: {mesAnioLabel}
          </p>
        </div>

        {/* Estructura de Tabla Calcada */}
        <div className="border border-[#D1D5DB] rounded-sm overflow-x-auto">
          <Table className="w-full border-collapse text-[12px]">
            <TableHeader className="bg-[#F9FAFB]">
              {/* Fila Superior de la Cabecera */}
              <TableRow className="hover:bg-transparent border-b border-[#D1D5DB]">
                <TableHead className="font-bold text-gray-900 border-r border-[#D1D5DB] text-center h-11 w-[12%]">
                  Almacen
                </TableHead>
                <TableHead className="text-gray-900 font-medium border-r border-[#D1D5DB] text-center w-[25%]">
                  Almacen Central
                </TableHead>
                <TableHead className="font-bold text-gray-900 border-r border-[#D1D5DB] text-center w-[15%]">
                  Stock Actual
                </TableHead>
                <TableHead className="border-r border-[#D1D5DB] w-[10%]"></TableHead>
                <TableHead className="font-bold text-gray-900 border-r border-[#D1D5DB] text-center w-[6%]">
                  S/
                </TableHead>
                <TableHead className="font-bold text-gray-900 border-r border-[#D1D5DB] text-center w-[15%]">
                  Costo
                </TableHead>
                <TableHead className="text-gray-900 font-bold border-r border-[#D1D5DB] text-center w-[12%]">
                  Tipo Cambio:
                </TableHead>
                <TableHead className="text-gray-900 text-center font-bold w-[12%]">
                  {tipoCambio.toFixed(3)}
                </TableHead>
              </TableRow>

              {/* Fila Inferior de la Cabecera */}
              <TableRow className="hover:bg-transparent border-b border-[#D1D5DB]">
                <TableHead className="font-bold text-gray-900 border-r border-[#D1D5DB] text-center h-11">
                  Cod. Anexo
                </TableHead>
                <TableHead className="font-bold text-gray-900 border-r border-[#D1D5DB] text-center">
                  Nombre del Artículo
                </TableHead>
                <TableHead className="border-r border-[#D1D5DB]"></TableHead>
                <TableHead className="font-bold text-gray-900 border-r border-[#D1D5DB] text-center">
                  Monto
                </TableHead>
                <TableHead className="border-r border-[#D1D5DB]"></TableHead>
                <TableHead className="font-bold text-gray-900 border-r border-[#D1D5DB] text-center">
                  Precio Unitario
                </TableHead>

                {/* Bloque Coordinado de Valorización */}
                <TableHead className="p-0 text-center" colSpan={2}>
                  <div className="w-full text-center py-1.5 font-bold text-gray-900 border-b border-[#D1D5DB]">
                    Valorizacion
                  </div>
                  <div className="flex w-full text-center">
                    <span className="w-1/2 py-1 font-bold text-gray-900 border-r border-[#D1D5DB]">
                      soles (S/)
                    </span>
                    <span className="w-1/2 py-1 font-bold text-gray-900">
                      Dolares ($)
                    </span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>

            {/* Cuerpo de la Tabla */}
            <TableBody>
              <TableRow className="hover:bg-transparent h-11">
                <TableCell className="border-r border-[#D1D5DB] text-center text-gray-800">
                  {registro.codAnexo}
                </TableCell>
                <TableCell className="border-r border-[#D1D5DB] px-4 text-gray-800">
                  {registro.nombreArticulo}
                </TableCell>
                <TableCell className="border-r border-[#D1D5DB]"></TableCell>
                <TableCell className="border-r border-[#D1D5DB] text-center text-gray-800 font-medium">
                  {registro.monto}
                </TableCell>
                <TableCell className="border-r border-[#D1D5DB]"></TableCell>
                <TableCell className="border-r border-[#D1D5DB] text-center text-gray-800">
                  {registro.precioUnitario.toFixed(2)}
                </TableCell>
                <TableCell className="border-r border-[#D1D5DB] text-center text-gray-800">
                  {valorizacionSoles.toLocaleString("es-PE", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </TableCell>
                <TableCell className="text-center text-gray-800">
                  {valorizacionDolares.toLocaleString("en-US", {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Page;
