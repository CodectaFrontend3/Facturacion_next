export interface Inactivos {
    id: number
    nombre: string
    apellido: string
    dni: number
    correo: string
    celular: string
    fecha_inicio: string
    cargo: string
}

export interface InactivosProps {
    params: Promise<{
        id: string
    }>
}