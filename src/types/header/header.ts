export interface TipoCambio {
    compra: string;
    venta: string;
    paralelo: string;
}

export interface NotificacionCarousel {
    count: number;
    label: string;
}

export interface NotificacionMensajes {
    count: number;
    total: number;
}

export interface HeaderData {
    tipoCambio: TipoCambio;
    notificacionesCarousel: NotificacionCarousel[];
    notificacionesMensajes: NotificacionMensajes;
}
