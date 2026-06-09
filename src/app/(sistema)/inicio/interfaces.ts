export interface IAlertaTesoreria {
    nombreEmpresa: string;
    direccion: string;
    descripcion: string;
    logoUrl: string;
}

export interface IResumenKardex {
    mes: string;
    montoCompra: number;
    montoFacturas: number;
    montoBoletas: number;
}