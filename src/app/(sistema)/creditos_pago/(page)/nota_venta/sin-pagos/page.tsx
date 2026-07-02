"use client";

import NotaVentaTabs from "../../../components/nota_venta/NotaVentaTabs";

function page() {
  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 lg:p-6 flex flex-col justify-between">
      <div className="w-full">
        <NotaVentaTabs>
          {/* Todo tu contenido interno (Filtros, Tabla, etc.) */}
          <div className="space-y-4">
            {/* Aquí van tus componentes de filtros y la tabla tal cual los tienes en la imagen */}
            <div>Filtros...</div>
            <div>Tabla de registros...</div>
          </div>
        </NotaVentaTabs>
      </div>
    </main>
  );
}

export default page;
