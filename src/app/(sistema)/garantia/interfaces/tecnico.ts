export interface Tecnico {
    id: number
    codigo: string
    equipo: string
    marca: string
    serie: string
    cliente: string
    ruc: string
    fecha: string
}

export interface TecnicoProps {
    params: Promise<{
        id: string
    }>
}