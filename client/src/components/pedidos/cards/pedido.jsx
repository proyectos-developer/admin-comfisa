import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import axios from 'axios'
import { constantes } from '../../../uri/constantes'
import {pedidosdata} from '../../../redux/slice/pedidosdata'
import { pedidosConstants } from '../../../uri/pedidos-constants'
import { set_pedidos_cotizacion_usuario } from '../../../redux/actions/dataactions'

export default function CardPedido({pedido, index, proporcional}) {

    const dispatch = useDispatch ()
    const navigate = useNavigate()

    const [button, setButton] = useState (false)
    const [pedido_usuario, setPedidoUsuaruio] = useState ({})
    const [cliente, setCliente] = useState ({})
    const [total_productos, setTotalProductos] = useState (0)
    
    const [load_data, setLoadData] = useState (0)

    const {get_pedido_usuario} = useSelector (({pedidos}) => pedidos)

    useEffect(() => {
        setLoadData(1)
        axios.get (`${constantes().url_principal[0].url}/pedidos/usuario/${pedido.shop_id}`)
            .then ((res) => {
              setLoadData(2)
              setPedidoUsuaruio(res.data.pedidos)
              setCliente(res.data.cliente)
              setTotalProductos(res.data.total_productos)
            }).catch ((error) => {
              setLoadData(0)
                cconsole.log (error)
            })
    }, [])

    useEffect(() => {
      if (get_pedido_usuario && get_pedido_usuario.success === true && get_pedido_usuario.pedidos && get_pedido_usuario.usuario){
        dispatch (pedidosdata(pedidosConstants(0, 0, 0, 0, 0, 0, 0, {}, true).get_pedido_usuario))
        dispatch (set_pedidos_cotizacion_usuario({usuario: get_pedido_usuario.usuario, pedidos: get_pedido_usuario.pedidos}))
        navigate (`/home/pedidos/detalles/${pedido_usuario.id}`)
      }
    }, [get_pedido_usuario])

    const ver_detalles_cotizacion = () => {
      dispatch (pedidosdata(pedidosConstants(pedido_usuario.usuario, pedido_usuario.shop_id, 0, 0, 16, {}, false).get_pedido_usuario))
    }

    return (
        load_data === 2 ? (
            <div key={index} className='rounded shadow-lg' style={{width: '32%', height: '100%', padding: 10 / proporcional}}>
              <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 10 / proporcional}}>
                  <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0, fontWeight: 700, color: 'black'}}>
                    Nro pedido {pedido_usuario.nro_pedido}
                  </p>
                  <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0, fontWeight: 700, color: 'black'}}>
                    Fecha {pedido_usuario.created_at.split('T')[0]}
                  </p>
              </div>
              <p style={{fontSize: 18 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0, fontWeight: 700, color: 'rgb(56, 77, 167)', marginBottom: 10 / proporcional}}>
                Número de productos {total_productos}
              </p>
              <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 10 / proporcional}}>
                  <p style={{fontSize: 16 / proporcional, lineHeight: `${16 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121', marginRight: 10 / proporcional,
                            cursor: 'default'}}>
                    Cliente:
                  </p>
                  <p style={{fontSize: 18 / proporcional, lineHeight: `${16 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121', marginRight: 10 / proporcional,
                            cursor: 'default'}}>
                    {cliente.nombres} {cliente.apellidos}
                  </p>
              </div>
              <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 10 / proporcional}}>
                  <p style={{fontSize: 16 / proporcional, lineHeight: `${16 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121', marginRight: 10 / proporcional,
                            cursor: 'default'}}>
                    Coreo:
                  </p>
                  <p style={{fontSize: 18 / proporcional, lineHeight: `${16 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121', marginRight: 10 / proporcional,
                            cursor: 'default'}}>
                    {cliente.correo} 
                  </p>
              </div>
              <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 10 / proporcional}}>
                  <p style={{fontSize: 16 / proporcional, lineHeight: `${16 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121', marginRight: 10 / proporcional,
                            cursor: 'default'}}>
                    Teléfono:
                  </p>
                  <p style={{fontSize: 18 / proporcional, lineHeight: `${16 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121', marginRight: 10 / proporcional,
                            cursor: 'default'}}>
                    {cliente.nro_telefono}
                  </p>
              </div>
              <div style={{width: '100%', height: 30 / proporcional, marginBottom: 10 / proporcional}} className='d-flex justify-content-center'>
                <p style={{fontSize: 24 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 50, marginBottom: 0, 
                    color: pedido.estado === 'cancelado' ? 'red' : 'rgb(56, 77, 167', fontWeight: pedido.estado === 'cancelado' ? 700 : 600, textAlign: 'center'}}>{pedido.estado}</p>
              </div>
              <div style={{width: '100%', height: 30 / proporcional}} className='d-flex justify-content-center'>
                <div className='rounded' style={{width: button ? '100%' : '99%', background: 'rgb(56, 77, 167', height: 30 / proporcional,
                    cursor: 'pointer'}}
                    onClick={() => ver_detalles_cotizacion()}
                    onMouseOver={() => setButton(true)} onMouseLeave={() => setButton(false)}>
                    <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 50, marginBottom: 0 / proporcional, 
                        color: 'white', fontWeight: button ? 700 : 600, textAlign: 'center'}}>Ver detalles</p>
                  </div>
              </div>
            </div>
        ) : null
      )
}