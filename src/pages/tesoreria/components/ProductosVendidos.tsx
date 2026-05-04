export const ProductosVendidos = () => {
    return (
        <div className="bg-white border border-gray-200 shadow-sm flex flex-col">
            <div className="p-4 border-b border-gray-100 flex items-center gap-1">
                <h3 className="font-bold text-xs text-gray-700">Los 5 productos más vendidos del mes</h3>
                <span className="text-[9px] text-gray-400">Solo Facturas</span>
            </div>
            <div className="p-6">
                <p className="text-sm font-bold text-gray-600">No hay Facturas creadas este mes</p>
            </div>
        </div>
    );
};