export const CompraVentas = () => {
    return (
        <div className="bg-white border border-gray-200 shadow-sm p-6 mb-6">
            <div className="grid grid-cols-2 gap-8 divide-x divide-gray-200">
                {/* COMPRA */}
                <div className="pr-8">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="font-bold text-sm text-gray-700">Compra</h3>
                        <span className="bg-[#1067b8] text-white text-[10px] font-bold px-2 py-0.5 rounded">Mayo</span>
                    </div>
                    <div className="text-center">
                        <p className="text-xs font-bold text-gray-600">Entrada por kardex</p>
                        <p className="text-3xl font-light text-gray-400 mt-1">S/ 0.00</p>
                    </div>
                </div>

                {/* VENTAS */}
                <div className="pl-8">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="font-bold text-sm text-[#e63946] flex items-center gap-2">
                            <img src="http://jypsac.dyndns.org:190/facturacion_20522045773/public/sunat.png" alt="Logo Sunat" className="h-4 object-contain" /> Ventas
                        </h3>
                        <span className="bg-[#1067b8] text-white text-[10px] font-bold px-2 py-0.5 rounded">Mayo</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                            <p className="text-xs font-bold text-gray-600">Facturas</p>
                            <p className="text-3xl font-light text-gray-400 mt-1">S/ 0.00</p>
                            <p className="text-[9px] text-gray-400 mt-1">*Incluye Facturas Manuales</p>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-600">Boletas</p>
                            <p className="text-3xl font-light text-gray-400 mt-1">S/ 0.00</p>
                            <p className="text-[9px] text-gray-400 mt-1">*Incluye Boletas Manuales</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};