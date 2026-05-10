export const UsuarioActivo = () => {
    return (
        <div className="bg-white border border-gray-200 shadow-sm flex flex-col">
            <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-xs text-gray-700">Usuario Activo</h3>
            </div>
            <div className="p-4 flex-1">
                <div className="bg-turquoise text-white rounded p-4 text-center mb-4">
                    <h4 className="font-bold text-sm mb-1">Administrador Web Administrador Web</h4>
                    <p className="text-[10px] mb-4">Usuario interactuando en el sistema</p>

                    <div className="w-12 h-12 bg-white rounded-full mx-auto mb-4 flex items-center justify-center text-gray-300 shadow-inner">
                        <img src="http://jypsac.dyndns.org:190/facturacion_20522045773/public/profile/images/1755289690profile" alt="Perfil Usuario" className="w-full h-full rounded-full object-cover" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                            <p className="font-bold">2000-01-01</p>
                            <p className="text-[9px]">F.Nacimiento</p>
                        </div>
                        <div>
                            <p className="font-bold">000000000</p>
                            <p className="text-[9px]">Celular</p>
                        </div>
                        <div>
                            <p className="font-bold">0000000</p>
                            <p className="text-[9px]">Telefono</p>
                        </div>
                    </div>
                </div>

                <div className="px-2">
                    <h4 className="font-bold text-sm text-gray-700">Administrador Web</h4>
                    <p className="text-xs text-gray-500 mt-1">Usuario Activo en la Empresa Demo.</p>
                </div>
            </div>
        </div>
    );
};