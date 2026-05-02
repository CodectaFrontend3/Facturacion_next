import CarruselPagination from "@/components/comprobantes/carrusel/carruselPagination";

export default function Page() {
  return (
    <main className="min-h-screen bg-white p-6">
      <h2 className="text-xl font-semibold text-black">Factura</h2>
      <div>
        <CarruselPagination />
      </div>
    </main>
  );
}
