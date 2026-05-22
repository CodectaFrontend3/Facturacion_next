export interface Publico {
    item: number
    empresa: string
    ruc: string
    mtc: number
    estado: string
}

export interface PublicoProps {
    params: Promise<{
        item: string
    }>
}