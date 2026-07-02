"use client";

import BoletasManualTabs from "../../../components/boletas_manuales/BoletasManual";

function page() {
  return (
    <main className="min-h-screen bg-[#f8fafc] p-4 lg:p-6 flex flex-col justify-between">
      <div className="w-full">
        <BoletasManualTabs>
          {/* Todo tu contenido interno (Filtros, Tabla, etc.) */}
          <div className="space-y-4">
            {/* Aquí van tus componentes de filtros y la tabla tal cual los tienes en la imagen */}
            <div>Filtros...</div>
            <div>Tabla de registros...</div>
          </div>
        </BoletasManualTabs>
      </div>
    </main>
  );
}

export default page;
