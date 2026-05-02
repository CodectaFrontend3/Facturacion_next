"use client";
export type TableType = "ingreso" | "egreso" | "tecnico";
import ingresoData from "@/data/ingreso.json";
import egresoData from "@/data/egreso.json";
import tecnicoData from "@/data/tecnico.json";

type Garantia = {
    id: number;
    codigo?: string;
    producto?: string;
    equipo?: string;
    marca?: string;
    serie?: string;
    cliente?: string;
    ruc?: string;
    fecha?: string;
};

type GarantiaKey = keyof Garantia;

export default function DataTable({ type }: { type: TableType }) {

    const columnsByType: Record<TableType, GarantiaKey[]> = {
        ingreso: ["id", "codigo", "producto", "marca", "serie", "cliente", "ruc", "fecha"],
        egreso: ["id", "codigo", "equipo", "ruc", "marca", "serie", "cliente", "fecha"],
        tecnico: ["id", "codigo", "equipo", "marca", "serie", "cliente", "ruc", "fecha"],
    };

    const columnLabels: Record<GarantiaKey, string> = {
        id: "ID",
        codigo: "Código Interno",
        producto: "Producto",
        equipo: "Equipo",
        marca: "Marca",
        serie: "Serie",
        cliente: "Cliente",
        ruc: "RUC",
        fecha: "Fecha",
    };

    const data: Record<TableType, Garantia[]> = {
        egreso: egresoData as Garantia[],
        ingreso: ingresoData as Garantia[],
        tecnico: tecnicoData as Garantia[],
    };

    const columns = columnsByType[type];
    const rows = data[type];

    return (
        <div className="w-full space-y-4 font-sans border-b border-l border-r border-gray-200 p-5 mt-0">
            <div className="border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="bg-white text-gray-500">
                            <th className="bg-[#F2F2F2] border-r border-gray-200 p-3">
                                <input type="checkbox" />
                            </th>
                            {columns.map((col) => (
                                <th
                                key={col}
                                className="border-r last:border-r-0 border-gray-200 text-[13px] font-bold p-3 text-left"
                                >
                                {columnLabels[col]}
                                </th>
                            ))}
                            <th className="p-3">Ver</th>
                            <th className="p-3">Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.length ? (
                        rows.map((item, index) => (
                            <tr key={item.id} className={` text-gray-500 border-b border-gray-200 transition-colors 
                                ${index % 2 === 0 ? "bg-[#F2F2F2]" : "bg-white"} hover:bg-[#ECECEC]`}>
                                <td className="border-r border-gray-200 p-3 text-center">
                                    <input type="checkbox" />
                                </td>
                                {columns.map((col) => (
                                    <td key={col} className="p-3">
                                    {item[col] ?? "-"}
                                    </td>
                                ))}
                                <td className="p-3 text-center">
                                    <button className="view-btn bg-blue-700 text-white p-2 rounded hover:bg-blue-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                        </svg>
                                    </button>
                                </td>
                                <td className="flex justify-center gap-5">
                                    <button className="trash-btn bg-amber-400 text-white p-2 mt-3 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5 v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                    </button>
                                    <button className="sign-btn bg-teal-400 text-white p-2 mt-3 rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                                            <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan={columns.length + 3} className="text-center p-6 text-gray-500">Sin resultados</td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}