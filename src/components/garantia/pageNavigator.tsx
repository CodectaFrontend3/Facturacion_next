export default function PageNavigator() {
    return (
        <div className="bg-white p-4 rounded shadow flex gap-4">  
            <h3 className="text-xs text-gray-500 pb-2 mb-4">Ver 1 a 1 de 1 entradas</h3>

            <div className="flex-1 flex justify-center">
                <div className="grid grid-cols-3 gap-4">
                    <p className="nav text-xs text-gray-500 rounded p-3 text-center">Anterior</p>
                    <button className="page-nav bg-blue-700 text-white rounded">1</button>
                    <p className="nav text-xs text-gray-500 rounded p-3 text-center">Siguiente</p>
                </div>
            </div>
        </div>
    );
}