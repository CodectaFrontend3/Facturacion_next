import { useState, useEffect, useRef } from 'react';

export const ButtonContact = () => {
    // Estado para controlar si el menú está abierto (true) o cerrado (false)
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Este efecto cierra el menú si el usuario hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="absolute bottom-6 right-6 z-50 flex flex-col items-end" ref={menuRef}>
            
            {/* Menú Desplegable */}
            <div className={`${isOpen ? 'flex' : 'hidden'} bg-white border border-gray-200 shadow-lg rounded-sm mb-2 w-[170px] flex-col text-[12.5px] text-gray-700 text-center transition-all duration-200`}>
                <a href="#" className="py-3 px-2 border-b border-gray-100 hover:bg-gray-50 transition block">+51 922 546 853</a>
                <a href="#" className="py-3 px-2 border-b border-gray-100 hover:bg-gray-50 transition block">info@codecta.pe</a>
                <a href="#" className="py-3 px-2 border-b border-gray-100 hover:bg-gray-50 transition block">+51 922 546 863</a>
                <a href="#" className="py-3 px-2 hover:bg-gray-50 transition block">Nuestras oficinas</a>
            </div>

            {/* Botón Principal */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={
                    isOpen 
                    ? "bg-[#10B981] border border-[#10B981] text-white px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-md transition duration-300"
                    : "border border-blue-600 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-blue-50 transition duration-300"
                }
            >
                Contáctanos
                <svg className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};