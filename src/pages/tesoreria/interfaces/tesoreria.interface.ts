// Interfaz para la tarjeta de Alertas
export interface IAlertaTesoreria {
    nombreEmpresa: string;
    direccion: string;
    descripcion: string;
    logoUrl: string;
}

// Interfaz para los montos de Compra/Venta
export interface IResumenKardex {
    mes: string;
    montoCompra: number;
    montoFacturas: number;
    montoBoletas: number;
}