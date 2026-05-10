import { IAlertaTesoreria, IResumenKardex } from '../interfaces';

export const alertaDemo: IAlertaTesoreria = {
    nombreEmpresa: "Demo",
    direccion: "Johan strauus 388",
    descripcion: "Empresa dedicada en optimización de energías y eficiencia energética",
    logoUrl: "http://jypsac.dyndns.org:190/facturacion_20522045773/public/img/logos/logooooooooooo.png"
};

export const resumenDemo: IResumenKardex = {
    mes: "Mayo",
    montoCompra: 0.00,
    montoFacturas: 0.00,
    montoBoletas: 0.00
};