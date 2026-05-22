export interface Vendedores {
    item: number
    codigo_c: string
    codigo_bf: string
    estado: string
    costo: number
    comision: number
    liquidacion: string
    observacion: string
}

export interface VendedoresProps {
    params: Promise<{
        item: string
    }>
}