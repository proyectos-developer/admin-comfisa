import { constantes } from "./constantes"

export const proveedoresConstants = (id = 1, search = '', order_by = '', order = '', data = {}, reset = false) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        new_proveedor: {
            path: `proveedor`,
            stateType: 'new_proveedor',
            data: data,
            reset: reset
        },
        update_proveedor: {
            path: `proveedor/${id}`,
            stateType: 'update_proveedor',
            data: data,
            reset: reset
        },
        get_proveedores_filtro_total: {
            path: `proveedores/buscar/${search}/order/${order_by}/${order}`,
            stateType: 'get_proveedores_filtro_total',
            reset: reset
        },
        get_proveedores: {
            path: `proveedores`,
            stateType: 'get_proveedores',
            reset: reset
        },
        get_proveedor: {
            path: `proveedor/${id}`,
            stateType: 'get_proveedor',
            reset: reset
        },
        delete_proveedor: {
            path: `delete/proveedor/${id}`,
            stateType: 'delete_proveedor',
            reset: reset
        }
    }
}