import { menutypes } from "../actions/dataactions";

const initialState = {
    open_menu_izquierdo: false,
    open_menu_derecho: false
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
    }
    return state
}

export default datareducer