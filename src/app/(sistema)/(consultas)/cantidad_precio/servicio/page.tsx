import { ResumenCantidadPrecio } from "../_components/ResumenCantidadPrecio";
import { CantidadPrecioTabla } from "../_components/CantidadPrecioTabla";

export default function ServicioPage() {
  return (
    <main className="min-h-screen bg-gray-100 space-y-6">
      <div className="pl-5 pr-5 mt-5 pb-5 space-y-6">
        <ResumenCantidadPrecio />
        <CantidadPrecioTabla />
      </div>
    </main>
  );
}
