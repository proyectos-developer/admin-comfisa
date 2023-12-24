import { constantes } from "./constantes"

export const productosConstants = (id = 1, search = '', order_by = '', order = '', data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_producto: {
            path: `producto`,
            stateType: 'new_producto',
            data: data,
            reset: reset
        },
        update_producto: {
            path: `producto/${id}`,
            stateType: 'update_producto',
            data: data,
            reset: reset
        },
        get_productos_filtro_total: {
            path: `productos/buscar/${search}/order/${order_by}/${order}`,
            stateType: 'get_productos_filtro_total',
            reset: reset
        },
        get_productos: {
            path: `productos`,
            stateType: 'get_productos',
            reset: reset
        },
        get_producto: {
            path: `producto/${id}`,
            stateType: 'get_producto',
            reset: reset
        },
        delete_producto: {
            path: `delete/producto/${id}`,
            stateType: 'delete_producto',
            reset: reset
        }
    }
}