interface ModalConsultaProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ModalConsulta = ({ isOpen, onClose }: ModalConsultaProps) => {
    // Si isOpen es falso, el componente devuelve 'null' (no renderiza nada en pantalla)
    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-[100] flex justify-center items-start pt-16 md:pt-24 px-4"
            onClick={onClose} // Cierra al hacer clic en el fondo oscuro
        >
            <div 
                className="bg-white w-full max-w-[850px] rounded-sm shadow-2xl relative" 
                onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic dentro del cuadro blanco
            >
                {/* Cabecera del modal */}
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                    <h3 className="text-gray-600 font-bold text-[14px]">Consulta de Comprobante</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700 font-bold text-xl leading-none">&times;</button>
                </div>
                
                {/* Cuerpo del modal (Formulario) */}
                <div className="p-6">
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                            <div>
                                <label className="block text-[13px] font-bold text-gray-600 mb-1.5">Comprobante:</label>
                                <select className="w-full border border-gray-200 rounded px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white">
                                    <option>Boleta</option>
                                    <option>Factura</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-gray-600 mb-1.5">Emisión:</label>
                                <input type="date" className="w-full border border-gray-200 rounded px-3 py-2 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-gray-600 mb-1.5">DNI-RUC Receptor:</label>
                                <input type="text" placeholder="Ingrese DNI o RUC del receptor" className="w-full border border-gray-200 rounded px-3 py-2 text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-gray-600 mb-1.5">Monto total:</label>
                                <input type="text" placeholder="Monto Total solo numerico" className="w-full border border-gray-200 rounded px-3 py-2 text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-gray-600 mb-1.5">Serie:</label>
                                <input type="text" placeholder="Ingrese Serie" className="w-full border border-gray-200 rounded px-3 py-2 text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-[13px] font-bold text-gray-600 mb-1.5">Correlativo:</label>
                                <input type="text" placeholder="Ingrese Correlativo" className="w-full border border-gray-200 rounded px-3 py-2 text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
                            </div>
                        </div>
                        
                        <div className="mt-6">
                            <button type="button" className="bg-[#1C61A8] hover:bg-blue-800 text-white font-semibold py-2 px-10 rounded text-[13px] transition duration-200">
                                Consultar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};