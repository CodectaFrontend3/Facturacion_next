export interface Vendedores {
    item: number
    codigo_c: string
    codigo_bf: string
    tipo: string
    costo: number
    estado: string
    comision: number
    liquidacion: string
    observacion: string
}

export interface VendedoresProps {
    params: Promise<{
        item: string
    }>
}