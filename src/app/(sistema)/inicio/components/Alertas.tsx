import { alertaDemo } from '../data/tesoreria.mock'; // <-- Importamos nuestros datos de prueba

export const Alertas = () => {
    return (
        <div className="bg-white border border-gray-200 shadow-sm flex flex-col">
            <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-xs text-gray-700">Alertas</h3>
            </div>
            <div className="p-6 flex flex-col items-center flex-1">
                {/* Usamos las variables en lugar de texto fijo */}
                <img src={alertaDemo.logoUrl} alt={`Logo ${alertaDemo.nombreEmpresa}`} className="h-10 mb-6 object-contain" />
                <div className="w-full text-left">
                    <h4 className="font-bold text-sm text-gray-800">{alertaDemo.nombreEmpresa}</h4>
                    <p className="text-xs text-gray-500 mt-1"><i className="fas fa-map-marker-alt mr-1"></i>{alertaDemo.direccion}</p>
                    <p className="text-xs font-bold text-gray-700 mt-4 mb-1">Sobre mi:</p>
                    <p className="text-xs text-gray-500">{alertaDemo.descripcion}</p>
                </div>
            </div>
        </div>
    );
};