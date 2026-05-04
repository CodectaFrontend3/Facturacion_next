export const Sidebar = () => {
    return (
        <aside className="w-[60px] bg-sidebar-bg h-full flex flex-col items-center py-3 overflow-y-auto z-20">
            {/* Logo Perro */}
            <div className="mb-6 w-10 h-10 bg-white rounded-full flex items-center justify-center p-1">
                <img src="http://jypsac.dyndns.org:190/facturacion_20522045773/public/img/login/leono%20soft.png" alt="Logo" className="w-full object-contain" />
            </div>

            {/* Íconos de navegación */}
            <nav className="flex flex-col gap-5 text-gray-400 text-lg">
                <a href="#" className="text-white hover:text-white transition"><i className="fas fa-home"></i></a>
                <a href="#" className="hover:text-white transition"><i className="fas fa-tags"></i></a>
                <a href="#" className="hover:text-white transition"><i className="fas fa-money-bill-wave"></i></a>
                <a href="#" className="hover:text-white transition"><i className="fas fa-file-alt"></i></a>
                <a href="#" className="hover:text-white transition"><i className="fas fa-check-square"></i></a>
                <a href="#" className="hover:text-white transition"><i className="fas fa-box"></i></a>
                <a href="#" className="hover:text-white transition"><i className="fas fa-credit-card"></i></a>
                <a href="#" className="hover:text-white transition"><i className="fas fa-wrench"></i></a>
                <a href="#" className="hover:text-white transition"><i className="fas fa-th"></i></a>
                <a href="#" className="hover:text-white transition"><i className="fas fa-comments"></i></a>
                <a href="#" className="hover:text-white transition"><i className="fas fa-registered"></i></a>
                <a href="#" className="hover:text-white transition"><i className="fas fa-th-large"></i></a>
                <a href="#" className="hover:text-white transition"><i className="fas fa-city"></i></a>
                <a href="#" className="hover:text-white transition"><i className="fas fa-cogs"></i></a>
            </nav>
        </aside>
    );
};