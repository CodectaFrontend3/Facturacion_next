import { Outlet } from 'react-router-dom';
import { CarouselLogin } from '../pages/login/components/CarouselLogin'; // <-- Lo importamos aquí

export const AuthLayout = () => {
    return (
        <div className="h-screen w-full flex font-sans text-gray-800 overflow-hidden">
            
            {/* Lado Izquierdo (Carrusel) */}
            <div className="hidden md:flex w-[55%] xl:w-[60%] bg-leonosoft-blue text-white flex-col relative overflow-hidden h-full">
                <CarouselLogin /> {/* <-- Renderizamos el carrusel */}
            </div>

            {/* Lado Derecho (Formularios dinámicos) */}
            <div className="w-full md:w-[45%] xl:w-[40%] bg-white flex flex-col justify-center items-center relative">
                {/* El Outlet inyectará aquí el componente LoginPage */}
                <Outlet />
            </div>

        </div>
    );
};