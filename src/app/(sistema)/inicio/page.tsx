import { CompraVentas } from './components/CompraVentas';
import { Alertas } from './components/Alertas';
import { ProductosVendidos } from './components/ProductosVendidos';
import { UsuarioActivo } from './components/UsuarioActivo';

export default function InicioPage() {
    return (
        <div className="w-full">
            <h2 className="text-[#1067b8] font-bold text-sm mb-4">Control de Eventos</h2>
            
            {/* Fila 1: Tarjetas de Compra y Ventas */}
            <CompraVentas />

            {/* Fila 2: Tres Columnas con las proporciones exactas que ajustamos (30% - 30% - 40%) */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_3fr_4fr] gap-6">
                <Alertas />
                <ProductosVendidos />
                <UsuarioActivo />
            </div>
        </div>
    );
}