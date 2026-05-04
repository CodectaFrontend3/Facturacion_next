export const Header = () => {
    return (
        <header className="bg-white h-16 border-b border-gray-200 flex items-center justify-between px-6 z-10 shrink-0">
            
            {/* Izquierda: Tipo de Cambio */}
            <div className="flex gap-6 text-[11px] font-bold w-[250px]">
                <div className="text-center">Compra:<br/><span className="font-normal">12312.00</span></div>
                <div className="text-center">Venta:<br/><span className="font-normal">123123.00</span></div>
                <div className="text-center">Paralelo:<br/><span className="font-normal">12311.95</span></div>
            </div>

            {/* Centro: Botones de Acción (Facturas y Mensajes) */}
            <div className="flex-1 flex justify-center gap-4 lg:gap-10">
                
                {/* Botón 1: Facturas */}
                <div className="flex rounded-full border-[1.5px] border-sidebar-bg overflow-hidden text-[13px] h-9 shadow-sm">
                    <div className="bg-sidebar-bg text-white px-5 flex items-center gap-2">
                        <i className="fas fa-bell"></i> 
                        <span><span className="font-bold">7</span> Facturas</span>
                    </div>
                    <button className="bg-white text-sidebar-bg font-bold px-6 hover:bg-gray-100 transition">
                        Enviar a Sunat
                    </button>
                </div>

                {/* Botón 2: Mensajes */}
                <div className="flex rounded-full border-[1.5px] border-sidebar-bg overflow-hidden text-[13px] h-9 shadow-sm">
                    <div className="bg-sidebar-bg text-white px-5 flex items-center gap-2">
                        <i className="fas fa-exclamation-circle text-sm"></i> 
                        <span><span className="font-bold">0</span> de 0</span>
                    </div>
                    <button className="bg-white text-sidebar-bg font-bold px-6 hover:bg-gray-100 transition">
                        Mensajes
                    </button>
                </div>

            </div>

            {/* Derecha: Iconos Notificación */}
            <div className="flex items-center justify-end gap-6 text-sidebar-bg text-2xl w-[250px]">
                <div className="relative cursor-pointer">
                    <i className="far fa-calendar-alt"></i>
                    <span className="absolute -top-1 -right-2 bg-orange-400 text-white text-[9px] font-bold px-1 rounded">0</span>
                </div>
                <div className="cursor-pointer"><i className="fas fa-envelope"></i></div>
            </div>
            
        </header>
    );
};