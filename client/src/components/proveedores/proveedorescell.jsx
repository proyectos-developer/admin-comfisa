import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {proveedoresdata} from '../../redux/slice/proveedoresdata'
import {proveedoresConstants} from '../../uri/proveedores-constatns.js'

import { set_filtro_proveedores_search_order_amount, set_limpiar_filtros } from '../../redux/actions/filtrosactions.js'
import { set_open_menu_derecho } from '../../redux/actions/dataactions'

import icono_clean from '../../assets/iconos/icono_clean_blue_96.png'
import icono_search from '../../assets/iconos/icono_search_blue_96.png'
import icono_add from '../../assets/iconos/icono_add_blue_96.png'

import CardProveedorCell from './cards/proveedorcell.jsx'

export default function ListaProveedoresCell({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [boton_filtro, setBotonFiltro] = useState (false)
    
    const [filtros, setFiltros] = useState ({})
    const [order_by, setOrderBy] = useState ('')
    const [proveedores, setProveedores] = useState ([])
    const [lista_proveedores, setListaProveedores] = useState ([])
    const [count_indice, setCountIndice] = useState (0)
    const [show_ordenar_por, setShowOrdenarPor] = useState (false)
    const [seleccionar_ordenarpor, setSeleccionarOrdenarPor] = useState (false)
    const [buscar_proveedor, setBuscarProveedor] = useState('')

    const {get_proveedores_filtro_total} = useSelector (({proveedores}) => proveedores)
    const {filtro_proveedores_search_order_amount} = useSelector(({filtros}) => filtros)
    const {open_menu_derecho} = useSelector(({data}) => data)

    useEffect (() => {
        const id = filtro_proveedores_search_order_amount.id
        const search = filtro_proveedores_search_order_amount.search
        const order_by = filtro_proveedores_search_order_amount.order_by
        const order = filtro_proveedores_search_order_amount.order
        dispatch(proveedoresdata(proveedoresConstants(id, search, order_by, order, {}, false).get_proveedores_filtro_total))
    }, [])

    useEffect(() => {
        setFiltros(filtro_proveedores_search_order_amount)
    }, [filtro_proveedores_search_order_amount])

    useEffect (() => {
        if (get_proveedores_filtro_total && get_proveedores_filtro_total.proveedores && get_proveedores_filtro_total.success === true){
            setProveedores (get_proveedores_filtro_total.proveedores)
            setListaProveedores (get_proveedores_filtro_total.proveedores)
        }
    }, [get_proveedores_filtro_total])

    const seleccionar_ordenar_por = (value) => {
        const id = filtros.id
        const search = filtros.search
        const order_by = value.split('-')[0]
        const order = value.split('-')[1]
        dispatch (set_filtro_proveedores_search_order_amount({pagina: 'proveedores', id: id, search: search, order_by: order_by, order: order}))
        dispatch(proveedoresdata(proveedoresConstants(id, search, order_by, order, {}, false).get_proveedores_filtro_total))
    }

    const buscar_proveedor_por = () => {
        console.log ('buscar', buscar_proveedor)
        const id = filtros.id
        const order_by = filtros.order_by
        const order = filtros.order
        dispatch (set_filtro_proveedores_search_order_amount({pagina: 'proveedores', id: id, search: buscar_proveedor, order_by: order_by, order: order}))
        dispatch(proveedoresdata(proveedoresConstants(id, buscar_proveedor, order_by, order, {}, false).get_proveedores_filtro_total))
    }

    const limpiar_filtros = () => {
        dispatch(set_filtro_proveedores_search_order_amount({pagina: 'proveedores', search: 0, order_by: 0, order: 0}))
        dispatch (proveedoresdata (proveedoresConstants(0, 0, 0, 0, {}, false).get_proveedores_filtro_total))
        dispatch (set_limpiar_filtros({limpiar_filtros: true}))
    }

    useEffect (() => {
        return () => {
        }
    }, [])

    return ( 
        <div className='position-relative' style={{width: '100%', paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional}}>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 25 / proporcional }}>
                <div style={{width: '100%', height: 'auto'}}>
                    <p className='mb-0' 
                        style={{fontSize: 24 / proporcional, lineHeight: `${50 / proporcional}px`, fontWeight: 400, color: '#212121', 
                                ontFamily: `'Lora', serif`}}>
                        TUS PROVEEDORES:
                    </p>
                </div>
                <div className='shadow-sm' 
                    style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional, background: 'white',
                        marginBottom: 20 / proporcional}}>
                    <select
                        style={{width: '100%', height: 18 / proporcional, fontSize: 18 / proporcional, fontWeight: 500, color: '#212121', marginTop: 16 / proporcional, 
                                marginBottom: 16 / proporcional, cursor: 'pointer', fontFamily: 'Mukta, sans-serif', background: 'white', paddingLeft: 15 / proporcional,
                                paddingRight: 15 / proporcional}}
                        className='form-select border-0'
                        onChange={(event) => seleccionar_ordenar_por(event.target.value)}
                    >
                        <option defaultValue='0'>Ordenar por:</option>
                        <option value='proveedor-ASC'>Nombre proveedor A-Z</option>
                        <option value='proveedor-DESC'>Nombre proveedor Z-A</option>
                    </select>
                </div>
                <div className='d-flex shadow-sm bg-white rounded' 
                    style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional}}>
                    <input
                        style={{width: '80%', height: 18 / proporcional, fontSize: 18 / proporcional, fontWeight: 500, color: '#212121', marginTop: 16 / proporcional,
                                marginBottom: 16 / proporcional, paddingLeft: 15 / proporcional, paddingRight: 15 / proporcional, fontFamily: 'Mukta, sans-serif'}}
                        className='form-control border-0'
                        onChange={(event) => setBuscarProveedor (event.target.value)}
                        value={buscar_proveedor}
                        placeholder='Buscar proveedor'
                    />
                    <div className='d-flex justify-content-center' style={{width: '20%', height: '100%' / proporcional}}>
                        <img src={icono_search} style={{width: 24 / proporcional, height: 24 / proporcional, margin: 12 / proporcional, cursor: 'pointer'}}
                            onClick={() => buscar_proveedor_por()}/> 
                    </div>
                </div>
            </div>
            
            <div style={{width: '100%', minHeight: 480 / proporcional}}>
                {
                    lista_proveedores && lista_proveedores.length > 0 ? (
                        lista_proveedores.map ((proveedor, numprov) => {
                            return (
                                <div key={numprov} className='d-flex justify-content-center' 
                                    style={{marginBottom: 12.5 / proporcional}}>
                                    <CardProveedorCell proveedor={proveedor} key={numprov} index={numprov} proporcional={proporcional}/>
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
                            onClick={() => {navigate('/home/proveedores/nuevo-proveedor'); dispatch(set_open_menu_derecho(false))}}>
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
