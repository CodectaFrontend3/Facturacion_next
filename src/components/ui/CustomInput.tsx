import { InputHTMLAttributes, ReactNode } from 'react';

// Definimos qué "propiedades" puede recibir nuestro input personalizado
interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;           // El texto de arriba (ej: "Usuario" o "DNI")
    icon?: ReactNode;         // Un ícono SVG opcional para acompañar al label
    rightElement?: ReactNode; // Un elemento a la derecha dentro del input (ej: el botón del "ojito" de la contraseña)
}

export const CustomInput = ({ label, icon, rightElement, className = '', ...props }: CustomInputProps) => {
    return (
        <div className={`w-full ${className}`}>
            {/* Si enviamos un label, lo dibuja */}
            {label && (
                <label className="text-sm font-bold text-gray-600 mb-1.5 flex items-center gap-1">
                    {icon}
                    {label}
                </label>
            )}
            
            {/* Contenedor del input */}
            <div className="relative">
                <input
                    // Aquí centralizamos todas las clases de Tailwind de tus inputs
                    className="w-full border border-gray-200 rounded px-3 py-2.5 text-[13px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 pr-10"
                    {...props} // Pasa automáticamente type, placeholder, value, onChange, etc.
                />
                
                {/* Si le pasamos un botón extra (como el ojito), lo coloca a la derecha */}
                {rightElement && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {rightElement}
                    </div>
                )}
            </div>
        </div>
    );
};