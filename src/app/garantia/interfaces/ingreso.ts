export interface Ingreso {
    id: number
    codigo: string
    producto: string
    marca: string
    serie: string
    cliente: string
    ruc: string
    fecha: string
}

export interface IngresoProps {
    params: Promise<{
        id: string
    }>
}

