export interface Egreso {
    id: number
    codigo: string
    equipo: string
    marca: string
    serie: string
    cliente: string
    ruc: string
    fecha: string
    estado: string
}

export interface EgresoProps {
    params: Promise<{
        id: string
    }>
}