import { constantes } from "./constantes"

export const cotizacionesConstants= (id = 1, shop_id = '', estado = '', begin = '', amount = '', data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        update_cotizacion: {
            path: `cotizacion/observaciones/${shop_id}/${id}`,
            stateType: 'update_cotizacion',
            data: data,
            reset: reset
        },
        get_cotizaciones: {
            path: `cotizaciones`,
            stateType: 'get_cotizaciones',
            reset: reset
        },
        get_cotizaciones_filtro_total: {
            path: `cotizaciones/shop_id/${shop_id}/estado/${estado}/${begin}/${amount}`,
            stateType: 'get_cotizaciones_filtro_total',
            reset: reset
        },
        get_cotizacion: {
            path: `cotizacion/${shop_id}`,
            stateType: 'get_cotizacion',
            reset: reset
        },
    }
}