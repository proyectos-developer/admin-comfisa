export const filtrostypes = {
    SET_FILTRO_PROVEEDORES_SEARCH_ORDER_AMOUNT:                 'SET_FILTRO_PROVEEDORES_SEARCH_ORDER_AMOUNT',
    SET_FILTRO_PRODUCTOS_SEARCH_ORDER_AMOUNT:                   'SET_FILTRO_PRODUCTOS_SEARCH_ORDER_AMOUNT',
    SET_LIMPIAR_FILTROS:                                        'SET_LIMPIAR_FILTROS',
}

export const set_filtro_proveedores_search_order_amount = filtro_proveedores_search_order_amount => {
    return {
        filtro_proveedores_search_order_amount,
        type: filtrostypes.SET_FILTRO_PROVEEDORES_SEARCH_ORDER_AMOUNT
    }
}

export const set_filtro_productos_search_order_amount = filtro_productos_search_order_amount => {
    return {
        filtro_productos_search_order_amount,
        type: filtrostypes.SET_FILTRO_PRODUCTOS_SEARCH_ORDER_AMOUNT
    }
}

export const set_limpiar_filtros = limpiar_filtros => {
    return {
        limpiar_filtros,
        type: filtrostypes.SET_LIMPIAR_FILTROS
    }
}