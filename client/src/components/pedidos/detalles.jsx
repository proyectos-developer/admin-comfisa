import React, {useEffect, useState} from 'react'

import {useDispatch, useSelector} from 'react-redux'

import CardProductoCotizar from './cards/productocotizar.jsx'
import { useNavigate } from 'react-router-dom'
import {cotizacionesdata} from '../../redux/slice/cotizacionesdata.js'
import { cotizacionesConstants } from '../../uri/cotizaciones-constants.js'

export default function DetallesPedido({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [usuario, setUsuario] = useState ({})
    const [lista_productos, setListaProductos] = useState ([])

    const {pedidos_cotizacion_usuario} = useSelector (({data}) => data)

    useEffect (() => {
        setUsuario (pedidos_cotizacion_usuario.usuario)
        setListaProductos(pedidos_cotizacion_usuario.pedidos)
    }, [])

    const volver_pedidos = () => {
        navigate ('/home/pedidos')
    }

    return (
        <div className='position-relative' 
            style={{width: '100%', paddingLeft: 250 / proporcional, paddingRight: 250 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 30 / proporcional}}>
                <p style={{fontSize: 30 / proporcional, lineHeight: `${40 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                    Estado pedido: <span style={{fontSize: 34 / proporcional, fontWeight: 600,
                        color: (lista_productos && lista_productos.length > 0 && lista_productos[0].estado  === 'cancelado') ? 'red' : 
                                (lista_productos && lista_productos.length > 0 && lista_productos[0].estado === 'aceptado') ? 'rgb(56, 77, 167)' : ''}}>{lista_productos && lista_productos.length > 0 ? lista_productos[0].estado : ''}</span>
                </p>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 20 / proporcional}}>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${25 / proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500}}>
                    Número de pedido: <span style={{fontSize: 20 / proporcional, fontWeight: 600}}>{lista_productos && lista_productos.length > 0 ? lista_productos[0].nro_pedido :''}</span>
                </p>
                <p style={{fontSize: 20 / proporcional, lineHeight: `${25 / proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500}}>
                    Fecha:: <span style={{fontSize: 20 / proporcional, fontWeight: 600}}></span>{lista_productos && lista_productos.length > 0 ? lista_productos[0].created_at.split('T')[0] :''}
                </p>
            </div>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 20 / proporcional}}>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${25 / proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500}}>
                    Cliente: <span style={{fontSize: 20 / proporcional, fontWeight: 600}}>{usuario.nombres} {usuario.apellidos}</span>
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${25 / proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500}}>
                    Teléfono: <span style={{fontSize: 20 / proporcional, fontWeight: 600}}>{usuario.nro_telefono}</span>
                </p>
                <p style={{fontSize: 18 / proporcional, lineHeight: `${25 / proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500}}>
                    Correo electrónico: <span style={{fontSize: 20 / proporcional, fontWeight: 600}}>{usuario.correo}</span> 
                </p>
            </div>
            <div className='' style={{width: '100%', height: 'auto', marginBottom: 20 / proporcional}}>
                <div className='d-flex rounded' style={{width: '100%', height: 50 / proporcional, marginBottom: 0.5 / proporcional,
                        border: '1px solid #f0f0f0', paddingTop: 12.5 / proporcional, paddingBottom: 12.5 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '5%', height: 25 / proporcional, borderRight: '1px solid #f0f0f0'}}/>
                    <div className='d-flex justify-content-center' style={{width: '10%', height: 25 / proporcional, borderRight: '1px solid #f0f0f0'}}>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${25 / proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                fontWeight: 700}}>
                            Imagen
                        </p>
                    </div>
                    <div className='d-flex justify-content-start' style={{width: '30%', height: 25 / proporcional, borderRight: '1px solid #f0f0f0',
                        paddingLeft: 10 / proporcional}}>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${25 / proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                fontWeight: 700}}>
                            Proveedor, producto
                        </p>
                    </div>
                    <div className='d-flex justify-content-start' style={{width: '45%', height: 25 / proporcional, borderRight: '1px solid #f0f0f0',
                        paddingLeft: 10 / proporcional}}>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${25 / proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                fontWeight: 700}}>
                            Información adicional
                        </p>
                    </div>
                    <div className='d-flex justify-content-center' style={{width: '10%', height: 25 / proporcional, borderRight: '1px solid #f0f0f0',
                        paddingLeft: 10 / proporcional}}>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${25 / proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                fontWeight: 700}}>
                            Cant.
                        </p>
                    </div>
                </div>
                {
                    lista_productos && lista_productos.length > 0 ? (
                        lista_productos.map ((producto, index) => {
                            return (
                                <CardProductoCotizar proporcional={proporcional} producto={producto} index={index} />
                            )
                        })
                    ) : null
                } 
            </div>
            <div className='d-flex justify-content-end' style={{width: '100%', height: 50 / proporcional}}>
                <button className='btn' style={{width: 300 / proporcional, height: 50 / proporcional, color: 'white', background: 'rgb(56, 77, 167)', fontWeight: 600}}
                    onClick={() => {volver_pedidos()}}>
                    VOLVER
                </button>
            </div>
        </div>
    )
}