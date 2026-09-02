export interface Privado {
    item: number
    placa: string
    marca: string
    modelo: string
    tipo: string
    año: number
    certificado: string
    estado: string
}

export interface PrivadoProps {
    params: Promise<{
        item: string
    }>
}