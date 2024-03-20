import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {pedidosdata} from '../../redux/slice/pedidosdata.js'
import {pedidosConstants} from '../../uri/pedidos-constants.js'

import { set_filtro_pedidos_search_order_amount, set_limpiar_filtros } from '../../redux/actions/filtrosactions.js'
import { set_open_menu_derecho } from '../../redux/actions/dataactions.js'

import icono_clean from '../../assets/iconos/icono_clean_blue_96.png'
import icono_search from '../../assets/iconos/icono_search_blue_96.png'
import icono_add from '../../assets/iconos/icono_add_blue_96.png'

import CardPedido from './cards/pedido.jsx'

export default function ListaPedidos({proporcional}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [boton_filtro, setBotonFiltro] = useState (false)
    
    const [filtros, setFiltros] = useState ({})
    const [order_by, setOrderBy] = useState ('')
    const [pedidos, setPedidos] = useState ([])
    const [lista_pedidos, setListaPedidos] = useState ([])
    const [count_indice, setCountIndice] = useState (0)
    const [show_ordenar_por, setShowOrdenarPor] = useState (false)
    const [seleccionar_ordenarpor, setSeleccionarOrdenarPor] = useState (false)
    const [buscar_pedido, setBuscarPedido] = useState('')

    const {get_pedidos_filtro_total} = useSelector (({pedidos}) => pedidos)
    const {filtro_pedidos_search_order_amount} = useSelector(({filtros}) => filtros)
    const {open_menu_derecho} = useSelector(({data}) => data)

    useEffect (() => {
        const id = filtro_pedidos_search_order_amount.id
        const shop_id = filtro_pedidos_search_order_amount.shop_id
        const estado = filtro_pedidos_search_order_amount.estado
        const order_by = filtro_pedidos_search_order_amount.order_by
        const order = filtro_pedidos_search_order_amount.order
        dispatch(pedidosdata(pedidosConstants(id, shop_id, estado, order_by, order, 0, 16, {}, false).get_pedidos_filtro_total))
    }, [])

    useEffect(() => {
        setFiltros(filtro_pedidos_search_order_amount)
    }, [filtro_pedidos_search_order_amount])

    useEffect (() => {
        if (get_pedidos_filtro_total && get_pedidos_filtro_total.pedidos && get_pedidos_filtro_total.success === true){
            let data = get_pedidos_filtro_total.pedidos.length
            let lista = []
            let cuenta = data / 3 < 1 ? 1 : data % 3 !== 0 ? (data / 3) + 1 : data / 3
            for (let count = 0; count < cuenta; count ++){
                lista.push ({num: `${count + 1}`})
            }
            setPedidos (get_pedidos_filtro_total.pedidos)
            setListaPedidos (lista)
        }
    }, [get_pedidos_filtro_total])

    const seleccionar_ordenar_por = (value) => {
        if (value !== '0'){
            const id = filtros.id
            const shop_id = filtros.shop_id
            const estado = filtros.estado
            const order_by = value.split ('-')[0]
            const order = value.split ('-')[1]
            dispatch (set_filtro_pedidos_search_order_amount({pagina: 'pedidos', id: id, shop_id: shop_id, estado: estado, order_by: order_by, order: order}))
            dispatch(pedidosdata(pedidosConstants(id, shop_id, estado, value.split ('-')[0], value.split ('-')[1], 0, 16, {}, false).get_pedidos_filtro_total))
        }
    }

    const buscar_pedido_por = () => {
        const id = filtros.id
        const shop_id = filtros.shop_id
        const estado = filtros.estado
        dispatch (set_filtro_pedidos_search_order_amount({pagina: 'pedidos', id: id, shop_id: shop_id, sestado: estado }))
        dispatch(pedidosdata(pedidosConstants(id, shop_id, estado, 0, 16, {}, false ).get_pedidos_filtro_total))
    }

    const limpiar_filtros = () => {
        dispatch(set_filtro_pedidos_search_order_amount({pagina: 'pedidos', search: 0, estadp: 0}))
        dispatch (pedidosdata (pedidosConstants(0, 0, 0, 0, 16, {}, false).get_pedidos_filtro_total))
        dispatch (set_limpiar_filtros({limpiar_filtros: true}))
    }

    useEffect (() => {
        return () => {
        }
    }, [])

  return (
    <div className='position-relative' style={{width: '100%', paddingLeft: 350 / proporcional, paddingRight: 350 / proporcional}}>
        <div className='d-flex' style={{width: '100%', height: 50 / proporcional, marginBottom: 25 / proporcional }}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                <div className='' style={{width: '32%', height: 50 / proporcional}}>
                    <p className='mb-0' 
                        style={{fontSize: 20 / proporcional, lineHeight: `${25 / proporcional}px`, fontWeight: 400, color: '#212121', 
                                marginRight: 10 / proporcional, fontFamily: `'Lora', serif`}}>
                        PEDIDOS:
                    </p>
                    <p className='mb-0' 
                        style={{fontSize: 16 / proporcional, lineHeight: `${25 / proporcional}px`, fontWeight: 400, color: '#212121', 
                                marginRight: 10 / proporcional, fontFamily: `'Lora', serif`}}>
                        Aceptados o cancelados:
                    </p>
                </div>
                <div className='shadow-sm bg-white rounded' 
                    style={{width: '32%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional,
                            marginLeft: 5 / proporcional, marginRight: 5 / proporcional}}>
                    <select
                        style={{width: '100%', height: 48 / proporcional, fontSize: 18 / proporcional, fontWeight: 500, color: '#212121',
                                cursor: 'default', fontFamily: 'Mukta, sans-serif'}}
                        className='form-select fira-fans-sans-serif border-0'
                        onChange={(event) => seleccionar_ordenar_por(event.target.value)}
                    >
                        <option value='0'>Ordenar por:</option>
                        <option value='nro_pedido-ASC'>Nro pedido 0...</option>
                        <option value='nro_pedido-DESC'>Nro pedido 10000...</option>
                    </select>
                </div>
                <div className='d-flex shadow-sm bg-white rounded' 
                    style={{width: '32%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional, marginLeft: 10 / proporcional,
                            marginLeft: 10 / proporcional}}>
                    <input
                        style={{width: '80%', height: 48 / proporcional, fontSize: 18 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121',
                               fontFamily: 'Mukta, sans-serif'}}
                        className='form-control fira-fans-sans-serif border-0'
                        onChange={(event) => setBuscarPedido (event.target.value)}
                        value={buscar_pedido}
                        placeholder='Buscar cotización'
                    />
                    <div className='d-flex justify-content-between' style={{width: '20%', height: 24 / proporcional}}>
                        <img src={icono_search} style={{width: 24 / proporcional, height: 24 / proporcional, margin: 12 / proporcional, cursor: 'pointer'}} onClick={() => buscar_pedido_por ()}/>
                    </div>
                </div>
            </div>
        </div>
            
            <div style={{width: '100%', minHeight: 480 / proporcional}}>
                {
                    lista_pedidos && lista_pedidos.length > 0 ? (
                        lista_pedidos.map ((pedido, numcot) => {
                            return (
                                <div key={numcot} className='d-flex justify-content-between' 
                                    style={{marginBottom: 12.5 / proporcional}}>
                                    {
                                        pedidos[(3 *  numcot)] ? ( 
                                            <CardPedido pedido={pedidos[(3 *  numcot)]} key={(3 *  numcot)} index={(3 *  numcot)} proporcional={proporcional}/>
                                        ) : null
                                    }
                                    {
                                        pedidos[(3 *  numcot) + 1] ? ( 
                                            <CardPedido pedido={pedidos[(3 *  numcot) + 1]} key={(3 *  numcot) + 1} index={(3 *  numcot) + 1} proporcional={proporcional}/>
                                        ) : null
                                    }
                                    {
                                        pedidos[(3 *  numcot) + 2] ? ( 
                                            <CardPedido pedido={pedidos[(3 *  numcot) + 2]} key={(3 *  numcot) + 2} index={(3 *  numcot) + 2} proporcional={proporcional}/>
                                        ) : null
                                    }
                                </div>
                            )
                        })
                    ) : null
                }
            </div>
      </div>
  )
}