import { filtrostypes } from "../actions/filtrosactions";

const initialState = {
    filtro_proveedores_search_order_amount:               {pagina: '', id: 0, search: 0, order_by: 0, order: 0},
    filtro_productos_search_order_amount:                 {pagina: '', id: 0, search: 0, order_by: 0, order: 0},
    filtro_cotizaciones_search_order_amount:              {pagina: '', id: 0, shop_id: 0, estado: 0, order_by: 0, order: 0},
    filtro_pedidos_search_order_amount:                   {pagina: '', id: 0, shop_id: 0, estado: 0, order_by: 0, order: 0},
    limpiar_filtros: {}
}

const filtrosreducer = (state = initialState, action) => {
    if (action.type === filtrostypes.SET_FILTRO_PROVEEDORES_SEARCH_ORDER_AMOUNT){
        const filtro_proveedores_search_order_amount = action.filtro_proveedores_search_order_amount
        return {
            ... state,
            filtro_proveedores_search_order_amount
        }
    }else if (action.type === filtrostypes.SET_FILTRO_PRODUCTOS_SEARCH_ORDER_AMOUNT){
        const filtro_productos_search_order_amount = action.filtro_productos_search_order_amount
        return {
            ... state,
            filtro_productos_search_order_amount
        }
    }else if (action.type === filtrostypes.SET_FILTRO_COTIZACIONES_SEARCH_ORDER_AMOUNT){
        const filtro_cotizaciones_search_order_amount = action.filtro_cotizaciones_search_order_amount
        return {
            ... state,
            filtro_cotizaciones_search_order_amount
        }
    }else if (action.type === filtrostypes.SET_FILTRO_PEDIDOS_SEARCH_ORDER_AMOUNT){
        const filtro_pedidos_search_order_amount = action.filtro_pedidos_search_order_amount
        return {
            ... state,
            filtro_pedidos_search_order_amount
        }
    }else if (action.type === filtrostypes.SET_LIMPIAR_FILTROS){
        const limpiar_filtros = action.limpiar_filtros
        return {
            ... state,
            limpiar_filtros
        }
    }
    return state
}

export default filtrosreducer