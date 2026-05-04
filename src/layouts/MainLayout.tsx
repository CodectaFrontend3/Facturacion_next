import { Outlet } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';

export const MainLayout = () => {
    return (
        <div className="bg-bg-gray h-screen w-full flex font-sans overflow-hidden text-gray-700">
            {/* 1. Nuestro Sidebar Fijo */}
            <Sidebar />

            <div className="flex-1 flex flex-col h-full overflow-hidden">
                {/* 2. Nuestro Header Fijo */}
                <Header />

                {/* 3. El contenido Dinámico (Aquí se inyectará la página de Inicio, Reportes, etc.) */}
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                </main>

                {/* 4. El Footer Fijo */}
                <footer className="bg-white border-t border-gray-200 py-3 px-6 text-xs text-gray-500 flex justify-between items-center shrink-0">
                    <div>
                        <span className="font-bold">Copyright</span> <a href="#" className="text-blue-500 hover:underline">JyP Periféricos</a> © 2019-2026
                    </div>
                    <div className="flex items-center gap-2">
                        Visítanos: 
                        <a href="#" className="text-blue-600 text-lg hover:text-blue-800"><i className="fab fa-facebook-square"></i></a>
                        <a href="#" className="text-green-500 text-lg hover:text-green-700"><i className="fab fa-whatsapp"></i></a>
                    </div>
                </footer>
            </div>
        </div>
    );
};