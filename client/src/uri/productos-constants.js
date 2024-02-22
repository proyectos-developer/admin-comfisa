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
        },
        new_tipo_producto: {
            path: 'tipo_producto',
            stateType: 'new_tipo_producto',
            data: data, 
            reset: reset
        },
        update_tipo_producto: {
            path: `tipo_producto/${id}`,
            stateType: 'update_tipo_producto',
            data: data, 
            reset: reset
        },
        get_tipo_producto: {
            path: `tipo_producto/${id}`,
            stateType: 'get_tipo_producto',
            reset: reset
        },
        get_tipo_productos_proveedor: {
            path: `tipo_productos/${id}`,
            stateType: 'get_tipo_productos_proveedor',
            reset: reset
        },
        delete_tipo_producto: {
            path: `delete/tipo_producto/${id}`,
            stateType: 'delete_tipo_producto',
            reset: reset
        },
        new_medida: {
            path: 'medida',
            stateType: 'new_medida',
            data: data, 
            reset: reset
        },
        update_medida: {
            path: `medida/${id}`,
            stateType: 'update_medida',
            data: data, 
            reset: reset
        },
        get_medida: {
            path: `medida/${id}`,
            stateType: 'get_medida',
            reset: reset
        },
        get_medidas_tipo: {
            path: `medidas/${id}`,
            stateType: 'get_medidas_tipo',
            reset: reset
        },
        delete_medida: {
            path: `delete/medida/${id}`,
            stateType: 'delete_medida',
            reset: reset
        }
    }
}