export const menutypes = {
    SET_OPEN_MENU_IZQUIERDO: 'SET_OPEN_MENU_IZQUIERDO',
    SET_OPEN_MENU_DERECHO: 'SET_OPEN_MENU_DERECHO',
    SET_PEDIDOS_COTIZACION_USUARIO: 'SET_PEDIDOS_COTIZACION_USUARIO'
}

export const set_pedidos_cotizacion_usuario = pedidos_cotizacion_usuario => {
    return {
        pedidos_cotizacion_usuario,
        type: menutypes.SET_PEDIDOS_COTIZACION_USUARIO
    }
}

export const set_open_menu_izquierdo = open_menu_izquierdo => {
    return {
        open_menu_izquierdo,
        type: menutypes.SET_OPEN_MENU_IZQUIERDO
    }
}

export const set_open_menu_derecho = open_menu_derecho => {
    return {
        open_menu_derecho,
        type: menutypes.SET_OPEN_MENU_DERECHO
    }
}