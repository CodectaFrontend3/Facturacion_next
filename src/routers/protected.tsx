import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
    // Aquí, en el futuro, verificarás si hay un "token" de inicio de sesión real en el navegador.
    // Por ahora, simularemos que el usuario SIEMPRE está autorizado poniéndolo en true.
    const isAuth = true; 

    // Si no está autenticado, lo redirige al login inmediatamente
    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    // Si está autenticado, el <Outlet /> permite que se cargue el MainLayout y la página de Inicio
    return <Outlet />;
};