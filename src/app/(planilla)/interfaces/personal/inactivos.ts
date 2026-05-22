export interface Inactivos {
    id: number
    nombres_apellidos: string
    dni: number
    correo: string
    celular: string
    fecha_vinculacion: string
    cargo: string
}

export interface InactivosProps {
    params: Promise<{
        id: string
    }>
}