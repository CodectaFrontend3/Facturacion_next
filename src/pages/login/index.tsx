import React, { useState } from 'react'; // <-- Asegúrate de importar React
import { useNavigate } from 'react-router-dom';
import { CustomInput, ButtonContact, ModalConsulta } from '../../components/ui';

export const LoginPage = () => {
    const navigate = useNavigate(); 
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); 
    const [errorMsg, setErrorMsg] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault(); 
        if (username === 'desarrollo@jypsac.com' && password === '@G^e^Fet&VGTsUBqLekW') {
            setErrorMsg(false);
            navigate('/inicio'); 
        } else {
            setErrorMsg(true);
        }
    };

    return (
        <div className="w-full max-w-[360px] px-6">

            <div className="flex flex-col items-center mb-10">
                <img src="http://jypsac.dyndns.org:190/facturacion_20522045773/public/img/login/leono%20soft.png" alt="Logo LeonoSoft" className="h-14 w-auto mb-1" />
                <p className="text-gray-500 text-xl font-medium">Facturador Electrónico</p>
            </div>

            <form onSubmit={handleLogin}>
                {/* Campo Usuario */}
                <div className="mb-4">
                    <CustomInput 
                        label="Usuario"
                        type="text"
                        placeholder="Ingresa tu usuario"
                        value={username}
                        // CORRECCIÓN AQUÍ: React.ChangeEvent<HTMLInputElement>
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>}
                    />
                </div>

                {/* Campo Contraseña */}
                <div className="mb-5">
                    <CustomInput 
                        label="Contraseña"
                        type={showPassword ? "text" : "password"}
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        // CORRECCIÓN AQUÍ: React.ChangeEvent<HTMLInputElement>
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>}
                        rightElement={
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className={`text-${showPassword ? 'blue-600' : 'gray-400'} hover:text-gray-600 transition`}>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </button>
                        }
                    />
                </div>

                {/* Mensaje de Error */}
                {errorMsg && (
                    <p className="text-red-500 text-xs font-semibold text-center mb-3">Usuario o contraseña incorrectos.</p>
                )}

                <button type="submit" className="w-full bg-leonosoft-btn hover:bg-blue-800 text-white font-semibold py-3 rounded transition duration-200 shadow-md">
                    Ingresar
                </button>
            </form>

            <div className="mt-8 text-center text-[13px] text-gray-500">
                ¿Quieres consultar un comprobante?<br />
                {/* CORRECCIÓN AQUÍ: React.MouseEvent<HTMLAnchorElement> */}
                <a href="#" onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); setIsModalOpen(true); }} className="text-[#00A1FF] font-bold hover:underline">Consultar</a>
            </div>

            {/* Insertamos los componentes flotantes */}
            <ButtonContact />
            <ModalConsulta isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};