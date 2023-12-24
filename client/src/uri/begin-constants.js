import { constantes } from "./constantes";

export const beginConstants = (data = {}, reset = false, id = 0) => {
    return {
        url: `${constantes().url_principal[0].url}`,
        login_user: {
            path: `signin`,
            stateType: 'login_user',
            reset: reset,
            data: data
        },
        register_user: {
            path: `signup`,
            stateType: 'register_user',
            data: data,
            reset: reset
        },
        log_out: {
            path: `logout`,
            stateType: 'log_out',
            reset: reset
        },
        forgot_password: {
            path: `update/password/${id}`,
            stateType: 'forgot_password',
            reset: reset,
            data: data
        },
        get_session: {
            path: `sessions`,
            stateType: 'get_session',
            reset: reset
        },
        get_session_id: {
            path: `session/${id}`,
            stateType: 'get_session_id',
            reset: reset
        },
        delete_session: {
            path: `session/delete/${id}`,
            stateType: 'delete_session',
            reset: reset
        }
    }
}