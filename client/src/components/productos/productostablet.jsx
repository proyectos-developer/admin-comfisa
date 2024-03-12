import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {productosdata} from '../../redux/slice/productosdata.js'
import {productosConstants} from '../../uri/productos-constants.js'

import { set_filtro_productos_search_order_amount, set_limpiar_filtros } from '../../redux/actions/filtrosactions.js'
import { set_open_menu_derecho } from '../../redux/actions/dataactions.js'

import icono_clean from '../../assets/iconos/icono_clean_blue_96.png'
import icono_search from '../../assets/iconos/icono_search_blue_96.png'
import icono_add from '../../assets/iconos/icono_add_blue_96.png'

import CardProductoTablet from './cards/productotablet.jsx'

export default function ListaProductosTablet({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [boton_filtro, setBotonFiltro] = useState (false)
    
    const [filtros, setFiltros] = useState ({})
    const [order_by, setOrderBy] = useState ('')
    const [productos, setProductos] = useState ([])
    const [lista_productos, seListaProductos] = useState ([])
    const [count_indice, setCountIndice] = useState (0)
    const [show_ordenar_por, setShowOrdenarPor] = useState (false)
    const [seleccionar_ordenarpor, setSeleccionarOrdenarPor] = useState (false)
    const [buscar_producto, setBuscarProducto] = useState('')

    const {get_productos_filtro_total} = useSelector (({productos}) => productos)
    const {filtro_productos_search_order_amount} = useSelector(({filtros}) => filtros)
    const {open_menu_derecho} = useSelector(({data}) => data)

    useEffect (() => {
        const id = filtro_productos_search_order_amount.id
        const search = filtro_productos_search_order_amount.search
        const order_by = filtro_productos_search_order_amount.order_by
        const order = filtro_productos_search_order_amount.order
        dispatch(productosdata(productosConstants(id, search, order_by, order, {}, false).get_productos_filtro_total))
    }, [])

    useEffect(() => {
        setFiltros(filtro_productos_search_order_amount)
    }, [filtro_productos_search_order_amount])

    useEffect (() => {
        if (get_productos_filtro_total && get_productos_filtro_total.productos && get_productos_filtro_total.success === true){
            let data = get_productos_filtro_total.productos.length
            let lista = []
            let cuenta = data / 2 < 1 ? 1 : data % 2 !== 0 ? (data / 2) + 1 : data / 2
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            setProductos (get_productos_filtro_total.productos)
            seListaProductos (lista)
        }
    }, [get_productos_filtro_total])

    const seleccionar_ordenar_por = (value) => {
        const id = filtros.id
        const search = filtros.search
        const order_by = value.split('-')[0]
        const order = value.split('-')[1]
        dispatch (set_filtro_productos_search_order_amount({pagina: 'productos', id: id, search: search, order_by: order_by, order: order}))
        dispatch(productosdata(productosConstants(id, search, order_by, order, {}, false).get_productos_filtro_total))
    }

    const buscar_producto_por = () => {
        const id = filtros.id
        const order_by = value.split('-')[0]
        const order = value.split('-')[1]
        dispatch (set_filtro_productos_search_order_amount({pagina: 'productos', id: id, search: buscar_producto, order_by: order_by, order: order}))
        dispatch(productosdata(productosConstants(id, buscar_producto, order_by, order, {}, false).get_productos_filtro_total))
    }

    const limpiar_filtros = () => {
        dispatch(set_filtro_productos_search_order_amount({pagina: 'productos', search: 0, order_by: 0, order: 0}))
        dispatch (productosdata (productosConstants(0, 0, 0, 0, {}, false).get_productos_filtro_total))
        dispatch (set_limpiar_filtros({limpiar_filtros: true}))
    }

    useEffect (() => {
        return () => {
        }
    }, [])

    return ( 
        <div className='position-relative' style={{width: '100%', paddingLeft: 60 / proporcional, paddingRight: 60 / proporcional}}>
            <div className='d-flex' style={{width: '100%', height: 50 / proporcional, marginBottom: 25 / proporcional }}>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                    <p className='mb-0' 
                        style={{width: '32%', fontSize: 24 / proporcional, lineHeight: `${50 / proporcional}px`, fontWeight: 400, color: '#212121', 
                                marginRight: 10 / proporcional, fontFamily: `'Lora', serif`}}>
                        TUS PRODUCTOS:
                    </p>
                    <div className='shadow-sm bg-white rounded' 
                        style={{width: '32%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional,
                                marginLeft: 5 / proporcional, marginRight: 5 / proporcional}}>
                        <select
                            style={{width: '100%', height: 48 / proporcional, fontSize: 18 / proporcional, fontWeight: 500, color: '#212121',
                                    cursor: 'default', fontFamily: 'Mukta, sans-serif'}}
                            className='form-select fira-fans-sans-serif border-0'
                            onChange={(event) => seleccionar_ordenar_por(event.targe.value)}
                        >
                            <option value='0'>Ordenar por:</option>
                            <option value='producto-ASC'>Nombre producto A-Z</option>
                            <option value='producto-DESC'>Nombre producto Z-A</option>
                            <option value='producto-ASC'>Nombre producto A-Z</option>
                            <option value='producto-DESC'>Nombre producto Z-A</option>
                        </select>
                    </div>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: '32%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional, marginLeft: 10 / proporcional,
                                marginLeft: 10 / proporcional}}>
                        <input
                            style={{width: '80%', height: 48 / proporcional, fontSize: 18 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121',
                                   fontFamily: 'Mukta, sans-serif'}}
                            className='form-control fira-fans-sans-serif border-0'
                            onChange={(event) => setBuscarProducto (event.target.value)}
                            value={buscar_producto}
                            placeholder='Buscar producto'
                        />
                        <div className='d-flex justify-content-between' style={{width: '20%', height: 24 / proporcional}}>
                            <img src={icono_search} style={{width: 24 / proporcional, height: 24 / proporcional, margin: 12 / proporcional, cursor: 'pointer'}}
                                onClick={() => buscar_producto_por()}/>
                        </div>
                    </div>
                </div>
            </div>
            
            <div style={{width: '100%', minHeight: 480 / proporcional}}>
                {
                    lista_productos && lista_productos.length > 0 ? (
                        lista_productos.map ((producto, numprov) => {
                            return (
                                <div key={numprov} className='d-flex justify-content-between' 
                                    style={{marginBottom: 12.5 / proporcional}}>
                                    {
                                        productos[(3 *  numprov)] ? ( 
                                            <CardProductoTablet producto={productos[(3 *  numprov)]} key={(3 *  numprov)} index={(3 *  numprov)} proporcional={proporcional}/>
                                        ) : null
                                    }
                                    {
                                        productos[(3 *  numprov) + 1] ? ( 
                                            <CardProductoTablet producto={productos[(3 *  numprov) + 1]} key={(3 *  numprov) + 1} index={(3 *  numprov) + 1} proporcional={proporcional}/>
                                        ) : null
                                    }
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
                            onClick={() => {navigate('/home/productos/nuevo-producto'); dispatch(set_open_menu_derecho(false))}}>
                            <img src={icono_add} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                            <p style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                                Nuevo producto
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
