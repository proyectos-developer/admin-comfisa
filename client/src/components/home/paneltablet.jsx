import React, { useEffect } from 'react'

import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { set_open_menu_derecho, set_open_menu_izquierdo } from '../../redux/actions/dataactions'
import { useDispatch, useSelector } from 'react-redux'

import icono_menu_left     from '../../assets/iconos/menu_left.png'
import icono_menu_right    from '../../assets/iconos/menu_right.png'

import menu_home           from '../../assets/iconos/icono_menu_home.png'
import icono_proveedores   from '../../assets/iconos/icono_proveedores_white_96.png'
import icono_productos     from '../../assets/iconos/icono_productos_white_96.png'
import icono_pedidos       from '../../assets/iconos/icono_pedidos_white_96.png'
import icono_cotizar       from '../../assets/iconos/icono_cotizar_white_96.png'
import menu_cerrar_sesion  from '../../assets/iconos/icono_menu_cerrar_sesion.png'

import {begindata} from '../../redux/slice/begindata'
import { beginConstants } from '../../uri/begin-constants'
import ModalCargando from '../modal/cargando'

export default function HomePanelTablet({proporcional}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const [open_derecho, setOpenDerecho] = useState (false)
  
  const {log_out} = useSelector(({begin}) => begin)
  const proveedores = useSelector (({proveedores}) => proveedores)

  const [open, setOpen] = useState (false)
  
    useEffect (() => {
        if (log_out && log_out.success === true){
            borrar_datos_sesion()
        }
    }, [log_out])

    const borrar_datos_sesion = async() => {
            window.localStorage.removeItem('correo')
            window.localStorage.removeItem('session_id')
            dispatch (begindata(beginConstants({}, true, 0).log_out))
            navigate('/')
    }

    const cerrar_sesion = () => {
        dispatch (begindata(beginConstants({}, false, 0).log_out))
    }

  return (
    <div style={{width: '100%'}}>
        <div className='position-relative' style={{width: '100%', height: 75 / proporcional, background: 'rgb(56, 77, 167)', paddingTop: 12.5 / proporcional,
            paddingBottom: 12.5 / proporcional, paddingLeft: 50 / proporcional, paddingRight: 50 / proporcional, borderBottom: '1px solid #212121'}}>
            <img src={icono_menu_left} style={{width: 40 / proporcional, height: 40 / proporcional, marginLeft: 20 / proporcional, marginTop: 5 / proporcional,
                  cursor: 'pointer'}} onClick={() => {setOpen (!open); dispatch(set_open_menu_izquierdo(!open))}}
                className='position-absolute start-0'/>
            <p onClick={() => navigate ('/home')} className='position-absolute top-50 start-50 translate-middle'
              style={{fontSize: 42 / proporcional, lineHeight: `${52 / proporcional}px`, color: 'rgba(189, 189, 189, 0.6)', fontWeight: 700 / proporcional, cursor: 'pointer',
                     height: 62 / proporcional, padding: 5 / proporcional}}>
                GRUPO COMFISA
            </p>
            <p onClick={() => navigate ('/home')} className='position-absolute top-50 start-50 translate-middle'
              style={{fontSize: 40 / proporcional, lineHeight: `${50 / proporcional}px`, color: 'white', fontWeight: 700 / proporcional, cursor: 'pointer',
                     height: 60 / proporcional, padding: 5 / proporcional, marginTop: 2 / proporcional}}>
                GRUPO COMFISA
            </p>
            <img src={icono_menu_right} style={{width: 40 / proporcional, height: 40 / proporcional, marginRight: 40 / proporcional, marginTop: 5 / proporcional,
                  cursor: 'pointer'}} onClick={() => {setOpenDerecho (!open_derecho); dispatch(set_open_menu_derecho(!open_derecho))}}
                className='position-absolute end-0'/>
        </div>
        {
          open ? (
            <div style={{width: 300 / proporcional, background: 'rgba(56, 77, 167, 0.9)', height: '100%', padding: 20 / proporcional, top: 75 / proporcional,
                zIndex: 99999}} 
                className='shadow-sm position-absolute start-0'>
                <div style={{width: 260 / proporcional, height: 57 / proporcional, marginBottom: 20 / proporcional}}>
                    <div className='d-flex' style={{width: 260 / proporcional, height: 35 / proporcional, marginBottom: 10 / proporcional, cursor: 'pointer'}} 
                                                    onClick={() => {navigate(''); setOpen(!open)}}>
                    <img src={menu_home} style={{width: 25 / proporcional, height: 25 / proporcional, marginLeft: 5 / proporcional, marginRight: 15 / proporcional,
                        marginTop: 5 / proporcional, marginBottom: 5 / proporcional}}/>
                    <p style={{fontSize: 20 / proporcional, color: 'white', lineHeight: `${35 / proporcional}px`, fontWeight: 500, cursor: 'pointer',
                                marginBottom: 0}}>Inicio</p>
                    </div>
                    <div style={{width: 260 / proporcional, height: 2 / proporcional, background: 'white'}}/>
                </div>
                <div style={{width: 260 / proporcional, height: 57 / proporcional, marginBottom: 20 / proporcional}}>
                    <div className='d-flex' style={{width: 260 / proporcional, height: 35 / proporcional, marginBottom: 10 / proporcional, cursor: 'pointer'}}
                    onClick={() => {navigate('proveedores'); setOpen(!open)}}>
                    <img src={icono_proveedores} style={{width: 25 / proporcional, height: 25 / proporcional, marginLeft: 5 / proporcional, marginRight: 15 / proporcional,
                        marginTop: 5 / proporcional, marginBottom: 5 / proporcional}}/>
                    <p style={{fontSize: 20 / proporcional, color: 'white', lineHeight: `${35 / proporcional}px`, fontWeight: 500, cursor: 'pointer',
                                marginBottom: 0}}>Proveedores</p>
                    </div>
                    <div style={{width: 260 / proporcional, height: 2 / proporcional, background: 'white'}}/>
                </div>
                <div style={{width: 260 / proporcional, height: 57 / proporcional, marginBottom: 20 / proporcional}}>
                    <div className='d-flex' style={{width: 260 / proporcional, height: 35 / proporcional, marginBottom: 10 / proporcional, cursor: 'pointer'}}
                    onClick={() => {navigate('productos'); setOpen(!open)}}>
                    <img src={icono_productos} style={{width: 25 / proporcional, height: 25 / proporcional, marginLeft: 5 / proporcional, marginRight: 15 / proporcional,
                        marginTop: 5 / proporcional, marginBottom: 5 / proporcional}}/>
                    <p style={{fontSize: 20 / proporcional, color: 'white', lineHeight: `${35 / proporcional}px`, fontWeight: 500, cursor: 'pointer',
                                marginBottom: 0}}>Productos</p>
                    </div>
                    <div style={{width: 260 / proporcional, height: 2 / proporcional, background: 'white'}}/>
                </div>
                <div style={{width: 260 / proporcional, height: 57 / proporcional, marginBottom: 20 / proporcional}}>
                    <div className='d-flex' style={{width: 260 / proporcional, height: 35 / proporcional, marginBottom: 10 / proporcional, cursor: 'pointer'}}
                    onClick={() => {navigate('pedidos'); setOpen(!open)}}>
                    <img src={icono_pedidos} style={{width: 25 / proporcional, height: 25 / proporcional, marginLeft: 5 / proporcional, marginRight: 15 / proporcional,
                        marginTop: 5 / proporcional, marginBottom: 5 / proporcional}}/>
                    <p style={{fontSize: 20 / proporcional, color: 'white', lineHeight: `${35 / proporcional}px`, fontWeight: 500, cursor: 'pointer',
                                marginBottom: 0}}>Pedidos</p>
                    </div>
                    <div style={{width: 260 / proporcional, height: 2 / proporcional, background: 'white'}}/>
                </div>
                <div style={{width: 260 / proporcional, height: 57 / proporcional, marginBottom: 20 / proporcional}}>
                    <div className='d-flex' style={{width: 260 / proporcional, height: 35 / proporcional, marginBottom: 10 / proporcional, cursor: 'pointer'}}
                    onClick={() => {navigate('cotizaciones'); setOpen(!open)}}>
                    <img src={icono_cotizar} style={{width: 25 / proporcional, height: 25 / proporcional, marginLeft: 5 / proporcional, marginRight: 15 / proporcional,
                        marginTop: 5 / proporcional, marginBottom: 5 / proporcional}}/>
                    <p style={{fontSize: 20 / proporcional, color: 'white', lineHeight: `${35 / proporcional}px`, fontWeight: 500, cursor: 'pointer',
                                marginBottom: 0}}>Cotizaciones</p>
                    </div>
                    <div style={{width: 260 / proporcional, height: 2 / proporcional, background: 'white'}}/>
                </div>
                <div style={{width: 260 / proporcional, height: 57 / proporcional, marginBottom: 20 / proporcional}}>
                    <div className='d-flex' style={{width: 260 / proporcional, height: 35 / proporcional, marginBottom: 10 / proporcional, cursor: 'pointer'}}
                    onClick={() => {cerrar_sesion(); setOpen(!open)}}>
                    <img src={menu_cerrar_sesion} style={{width: 25 / proporcional, height: 25 / proporcional, marginLeft: 5 / proporcional, marginRight: 15 / proporcional,
                        marginTop: 5 / proporcional, marginBottom: 5 / proporcional}}/>
                    <p style={{fontSize: 20 / proporcional, color: 'white', lineHeight: `${35 / proporcional}px`, fontWeight: 500, cursor: 'pointer',
                                marginBottom: 0}}>Cerrar sesión</p>
                    </div>
                    <div style={{width: 260 / proporcional, height: 2 / proporcional, background: 'white'}}/>
                </div>
            </div>
          ) : null
        }   
        <Outlet/>  
        <ModalCargando loading={proveedores.loading}/>   
    </div>
  )
}