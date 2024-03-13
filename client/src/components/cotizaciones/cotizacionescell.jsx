import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {cotizacionesdata} from '../../redux/slice/cotizacionesdata'
import {cotizacionesConstants} from '../../uri/cotizaciones-constants.js'

import { set_filtro_cotizaciones_search_order_amount, set_limpiar_filtros } from '../../redux/actions/filtrosactions.js'
import { set_open_menu_derecho } from '../../redux/actions/dataactions'

import icono_clean from '../../assets/iconos/icono_clean_blue_96.png'
import icono_search from '../../assets/iconos/icono_search_blue_96.png'
import icono_add from '../../assets/iconos/icono_add_blue_96.png'

import CardCotizacionCell from './cards/cotizacioncell.jsx'

export default function ListaCotizacionesCell({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [boton_filtro, setBotonFiltro] = useState (false)
    
    const [filtros, setFiltros] = useState ({})
    const [order_by, setOrderBy] = useState ('')
    const [cotizaciones, setCotizaciones] = useState ([])
    const [lista_cotizaciones, setListaCotizaciones] = useState ([])
    const [count_indice, setCountIndice] = useState (0)
    const [show_ordenar_por, setShowOrdenarPor] = useState (false)
    const [seleccionar_ordenarpor, setSeleccionarOrdenarPor] = useState (false)
    const [buscar_cotizacion, setBuscarCotizacion] = useState('')

    const {get_cotizaciones_filtro_total} = useSelector (({cotizaciones}) => cotizaciones)
    const {filtro_cotizaciones_search_order_amount} = useSelector(({filtros}) => filtros)
    const {open_menu_derecho} = useSelector(({data}) => data)

    useEffect (() => {
        const id = filtro_cotizaciones_search_order_amount.id
        const shop_id = filtro_cotizaciones_search_order_amount.shop_id
        const estado = filtro_cotizaciones_search_order_amount.estado
        dispatch(cotizacionesdata(cotizacionesConstants(id, shop_id, estado, 0, 16, {}, false).get_cotizaciones_filtro_total))
    }, [])

    useEffect(() => {
        setFiltros(filtro_cotizaciones_search_order_amount)
    }, [filtro_cotizaciones_search_order_amount])

    useEffect (() => {
        if (get_cotizaciones_filtro_total && get_cotizaciones_filtro_total.cotizaciones && get_cotizaciones_filtro_total.success === true){
            setListaCotizaciones (get_cotizaciones_filtro_total.cotizaciones)
        }
    }, [get_cotizaciones_filtro_total])

    const seleccionar_ordenar_por = (value) => {
        const id = filtros.id
        const shop_id = filtros.shop_id
        const estado = filtros.estado
        dispatch (set_filtro_cotizaciones_search_order_amount({pagina: 'cotzaciones', id: id, shop_id: shop_id, estado: estado}))
        dispatch(cotizacionesdata(cotizacionesConstants(id, shop_id, estado, 0, 16, {}, false).get_cotizaciones_filtro_total))
    }

    const buscar_cotizacion_por = () => {
        const id = filtros.id
        const shop_id = filtros.shop_id
        const estado = filtros.estado
        dispatch (set_filtro_cotizaciones_search_order_amount({pagina: 'cotizaciones', id: id, shop_id: shop_id, sestado: estado }))
        dispatch(cotizacionesdata(cotizacionesConstants(id, shop_id, estado, 0, 16, {}, false ).get_cotizaciones_filtro_total))
    }

    const limpiar_filtros = () => {
        dispatch(set_filtro_cotizaciones_search_order_amount({pagina: 'cotizaciones', search: 0, estadp: 0}))
        dispatch (cotizacionesdata (cotizacionesConstants(0, 0, 0, 0, 16, {}, false).get_cotizaciones_filtro_total))
        dispatch (set_limpiar_filtros({limpiar_filtros: true}))
    }

    useEffect (() => {
        return () => {
        }
    }, [])

  return (
    <div className='position-relative' style={{width: '100%', paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto'}}>
                <p className='mb-0' 
                    style={{width: '100%', fontSize: 24 / proporcional, lineHeight: `${50 / proporcional}px`, fontWeight: 400, color: '#212121', 
                            marginBottom: 20 / proporcional, fontFamily: `'Lora', serif`}}>
                    COTIZACIONES:
                </p>
                <div className='shadow-sm bg-white rounded' 
                    style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional,
                            marginBottom: 20 / proporcional}}>
                    <select
                        style={{width: '100%', height: 48 / proporcional, fontSize: 18 / proporcional, fontWeight: 500, color: '#212121',
                                cursor: 'default', fontFamily: 'Mukta, sans-serif'}}
                        className='form-select fira-fans-sans-serif border-0'
                        onChange={(event) => seleccionar_ordenar_por(event.target.value)}
                    >
                        <option value='0'>Ordenar por:</option>
                        <option value='producto-ASC'>Nombre producto A-Z</option>
                        <option value='producto-DESC'>Nombre producto Z-A</option>
                        <option value='producto-ASC'>Nombre producto A-Z</option>
                        <option value='producto-DESC'>Nombre producto Z-A</option>
                    </select>
                </div>
                <div className='d-flex shadow-sm bg-white rounded' 
                    style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional, marginBottom: 20 / proporcional}}>
                    <input
                        style={{width: '80%', height: 48 / proporcional, fontSize: 18 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121',
                               fontFamily: 'Mukta, sans-serif'}}
                        className='form-control fira-fans-sans-serif border-0'
                        onChange={(event) => setBuscarCotizacion (event.target.value)}
                        value={buscar_cotizacion}
                        placeholder='Buscar cotización'
                    />
                    <div className='d-flex justify-content-between' style={{width: '20%', height: 24 / proporcional}}>
                        <img src={icono_search} style={{width: 24 / proporcional, height: 24 / proporcional, margin: 12 / proporcional, cursor: 'pointer'}} onClick={() => buscar_cotizacion_por ()}/>
                    </div>
                </div>
            </div>
            
            <div style={{width: '100%', minHeight: 480 / proporcional}}>
                {
                    lista_cotizaciones && lista_cotizaciones.length > 0 ? (
                        lista_cotizaciones.map ((cotizacion, numcot) => {
                            return (
                                <div key={numcot} className='d-flex justify-content-center' 
                                    style={{marginBottom: 12.5 / proporcional}}>
                                    <CardCotizacionCell cotizacion={cotizacion} key={numcot} index={numcot} proporcional={proporcional}/>
                                </div>
                            )
                        })
                    ) : null
                }
            </div>
            {
                open_menu_derecho ? ( 
                    <div className='position-absolute shadow rounded' 
                            style={{width: 330 / proporcional, padding: 30 / proporcional, top: -60 / proporcional, right: 20 / proporcional, background: 'white'}}>
                        <div className='d-flex' style={{width: 270 / proporcional, height: 'auto', marginBottom: 10 / proporcional, cursor: 'pointer'}}
                            onClick={() => {navigate('/home/cotizaciones/nuevo-proveedor'); dispatch(set_open_menu_derecho(false))}}>
                            <img src={icono_add} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                            <p style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                                Nuevo proveedor
                            </p>
                        </div>
                        <div className='rounded-pill' style={{width: 270 / proporcional, height: 2 / proporcional, background: '#e29022', marginBottom: 10 / proporcional}}/>
                        <div className='d-flex' style={{width: 270 / proporcional, height: 'auto', marginBottom: 10 / proporcional, cursor: 'pointer'}}
                            onClick={() => {limpiar_filtros(); dispatch(set_open_menu_derecho(false))}}>
                            <img src={icono_clean} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                            <p style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                                Limpiar filtros
                            </p>
                        </div>
                        <div className='rounded-pill' style={{width: 270 / proporcional, height: 2 / proporcional, background: '#e29022', marginBottom: 10 / proporcional}}/>
                    </div>
                ) : null
            }
      </div>
  )
}