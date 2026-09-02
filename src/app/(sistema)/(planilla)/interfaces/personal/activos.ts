export interface Activos {
    id: number
    nombre: string
    apellido: string
    dni: number
    correo: string
    celular: string
    fecha_vinculacion: string
    cargo: string
}

export interface ActivosProps {
    params: Promise<{
        id: string
    }>
}