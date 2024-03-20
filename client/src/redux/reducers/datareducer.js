import { menutypes } from "../actions/dataactions";

const initialState = {
    open_menu_izquierdo: false,
    open_menu_derecho: false,
    pedidos_cotizacion_usuario: {}
}

const datareducer = (state = initialState, action) => {
    if (action.type === menutypes.SET_OPEN_MENU_IZQUIERDO){
        const open_menu_izquierdo = action.open_menu_izquierdo
        return {
            ... state,
            open_menu_izquierdo
        }
    }else if (action.type === menutypes.SET_OPEN_MENU_DERECHO){
        const open_menu_derecho = action.open_menu_derecho
        return {
            ... state,
            open_menu_derecho
        }
    }else if (action.type === menutypes.SET_PEDIDOS_COTIZACION_USUARIO){
        const pedidos_cotizacion_usuario = action.pedidos_cotizacion_usuario
        return {
            ... state,
            pedidos_cotizacion_usuario
        }
    }
    return state
}

export default datareducer