import { constantes } from "./constantes"

export const pedidosConstants= (id = 1, shop_id = '', estado = '', order_by = '', order = '', begin = '', amount = '', data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        get_pedidos: {
            path: `pedidos`,
            stateType: 'get_pedidos',
            reset: reset
        },
        get_pedidos_filtro_total: {
            path: `pedidos/shop_id/${shop_id}/estado/${estado}/order/${order_by}/${order}/${begin}/${amount}`,
            stateType: 'get_pedidos_filtro_total',
            reset: reset
        },
        get_pedido: {
            path: `pedido/${shop_id}`,
            stateType: 'get_pedido',
            reset: reset
        },
        get_pedido_usuario: {
            path: `pedido/shop_id/${shop_id}/usuario/${id}`,
            stateType: 'get_pedido_usuario',
            reset: reset
        }
    }
}