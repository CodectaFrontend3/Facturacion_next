import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importamos nuestros Layouts (las plantillas base)
import { AuthLayout, MainLayout } from '../layouts';

// Importamos nuestras Páginas
import { LoginPage } from '../pages/login';
import { TesoreriaPage } from '../pages/tesoreria';

// Importamos el Guardia
import { ProtectedRoute } from './protected';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                {/* ===============================
                    RUTAS PÚBLICAS (routers-public)
                    =============================== */}
                {/* Todo lo que esté dentro de este Route tendrá el fondo azul dividido del AuthLayout */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                </Route>


                {/* ===============================
                    RUTAS PRIVADAS (routers-priv)
                    =============================== */}
                {/* Primero pasan por el guardia de seguridad (ProtectedRoute) */}
                <Route element={<ProtectedRoute />}>
                    {/* Si pasan, se les aplica el MainLayout (Sidebar azul y Header blanco) */}
                    <Route element={<MainLayout />}>
                        <Route path="/inicio" element={<TesoreriaPage />} />
                        {/* Si el día de mañana creas páginas de clientes o reportes, las pones aquí abajo */}
                    </Route>
                </Route>


                {/* REDIRECCIÓN POR DEFECTO */}
                {/* Si alguien entra a la raíz "localhost:5173/", lo mandamos al login */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                {/* Si alguien inventa una URL que no existe, lo mandamos al login */}
                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    );
};