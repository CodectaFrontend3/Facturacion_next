export interface IUser {
    id: string | number;
    nombre: string;
    rol: string;
    fechaNacimiento: string;
    celular: string;
    telefono: string;
    empresa: string;
    fotoUrl?: string; // El signo de interrogación indica que es opcional (puede no tener foto)
}