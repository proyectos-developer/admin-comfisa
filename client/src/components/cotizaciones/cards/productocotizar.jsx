import React, {useEffect, useState} from 'react'

import icono_guardar from '../../../assets/iconos/icono_guardar_blue_96.png'
import icono_update from '../../../assets/iconos/icono_update_blue_96.png'
import icono_check from '../../../assets/iconos/icono_check_blue_96.png'

import { useDispatch, useSelector } from 'react-redux'
import {cotizacionesdata} from '../../../redux/slice/cotizacionesdata'
import { cotizacionesConstants } from '../../../uri/cotizaciones-constants'

import axios from 'axios'
import { constantes } from '../../../uri/constantes'

export default function CardProductoCotizar({proporcional, producto, index}) {

    const dispatch = useDispatch()

    const [precio, setPrecio] = useState(producto.precio)
    const [observaciones, setObservaciones] = useState (producto.observaciones)
    const [foto_uno, setFotoUno] = useState(producto.foto_uno)
    const [nombre_producto, setNombreProducto] = useState(producto.producto)
    const [proveedor, setProveedor] = useState(producto.proveedor)
    const [descripcion, setDescripcion] = useState(producto.descripcion)
    const [comentarios, setComentarios] = useState(producto.comentarios)
    const [cantidad, setCantidad] = useState(producto.cantidad)
    const [guardado, setGuardado] = useState(false)
    const [message, setMessage] = useState ('')

    const actualizar_producto_cotizacion = () => {
        const data_update = {
            observaciones: observaciones,
            precio: precio
        }
        axios.post (`${constantes().url_principal[0].url}/cotizacion/observaciones/${producto.shop_id}/${producto.id_producto}`, data_update)
            .then ((res) => {
                setFotoUno(res.data.cotizacion.foto_uno)
                setNombreProducto(res.data.cotizacion.producto)
                setProveedor(res.data.cotizacion.proveedor)
                setDescripcion(res.data.cotizacion.descripcion)
                setComentarios(res.data.cotizacion.comentarios)
                setCantidad(res.data.cotizacion.cantidad)
                setPrecio(res.data.cotizacion.precio)
                setObservaciones(res.data.cotizacion.observaciones)
                setGuardado(true)
                setMessage('¡Se actualizo correctamente el precio y observaciones!')
            }).catch ((err) => {
                setMessage('¡Ocurrio un error, intentelo nuevamente!')
            })   
    }

    return (
        <div className='rounded shadow d-flex' style={{width: '100%', height: 'auto', marginBottom: 10 / proporcional, border: '1px solid #f0f0f0'}}>
            <div className='d-flex justify-content-center' style={{width: '5%', height: 'auto'}}>
                <p style={{fontSize: 16 / proporcional, lineHeight: `${175/ proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500}}>
                    {index + 1}
                </p>
            </div>
            <div style={{width: '95%', height: 'auto'}}>
                <div className='d-flex rounded' style={{width: '100%', height: 100 / proporcional,
                        borderBottom: '1px solid #f0f0f0', paddingTop: 12.5 / proporcional, paddingBottom: 12.5 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '10%', height: 75 / proporcional, borderRight: '1px solid #f0f0f0'}}>
                        <img src={foto_uno} style={{width: 75 / proporcional, height: 75 / proporcional}}/>    
                    </div>
                    <div className='d-flex justify-content-start' style={{width: '30%', height: 75 / proporcional, borderRight: '1px solid #f0f0f0'}}>
                        <div style={{width: '100%', height: 75 / proporcional, paddingLeft: 10 / proporcional, paddingRight: 10 / proporcional}}>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${18/ proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 600}}>
                                <span style={{fontSize: 16 / proporcional, fontWeight: 600}}>{proveedor}</span>
                            </p>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${18/ proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 500}}>
                                <span style={{fontSize: 16 / proporcional, fontWeight: 500}}>{nombre_producto}</span>
                            </p>
                            <p style={{fontSize: 14 / proporcional, lineHeight: `${19.5/ proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 400}}>
                                <span style={{fontSize: 16 / proporcional, fontWeight: 400}}>{descripcion.slice(0, 75)}...</span>
                            </p>
                        </div>
                    </div>
                    <div className='d-flex justify-content-start' style={{width: '50%', height: 75 / proporcional, borderRight: '1px solid #f0f0f0',
                        paddingLeft: 10 / proporcional, paddingRight: 10 / proporcional}}>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${18.75/ proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                fontWeight: 500}}>
                            <span style={{fontSize: 16 / proporcional, fontWeight: 500}}>{comentarios}</span>
                        </p>
                    </div>
                    <div className='d-flex justify-content-center' style={{width: '10%', height: 75 / proporcional, borderRight: '1px solid #f0f0f0',
                        paddingLeft: 10 / proporcional, paddingRight: 10 / proporcional}}>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${75/ proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                fontWeight: 500}}>
                            <span style={{fontSize: 16 / proporcional, fontWeight: 500}}>{cantidad}</span>
                        </p>
                    </div>
                </div>

                <div className='d-flex' style={{width: '100%', height: 74 / proporcional, padding: 12 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '15%', height: 50 / proporcional, borderRight: '1px solid #f0f0f0',
                        paddingLeft: 10 / proporcional, paddingRight: 10 / proporcional}}>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${50/ proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                fontWeight: 500, marginRight: 5 / proporcional}}>
                            S/.
                        </p>
                        <input 
                            type='number'
                            className='form-control'
                            style={{width: '60%', height: 50 / proporcional, fontSize: 16 / proporcional, color: '#212121', textAlign: 'center'}}
                            value={precio}
                            onChange={(event) => setPrecio(event.target.value)}
                            placeholder='0.0' />
                    </div>                
                    <div className='d-flex justify-content-center' style={{width: '80%', height: 50 / proporcional, borderRight: '1px solid #f0f0f0'}}>
                        <textarea
                            className='form-control rounded'
                            style={{width: '90%', border: '1px solid #efefef', height: 50 / proporcional, fontSize: 16 / proporcional, lineHeight: `${18 / proporcional}px`, color: '#212121'}}
                            rows={3}
                            value={observaciones}
                            onChange={(event) => setObservaciones(event.target.value)}
                            id='observaciones'
                            placeholder='Observciones'/>
                    </div>
                    <div className='d-flex justify-content-center' style={{width: '10%', height: 75 / proporcional}}>
                        {
                            guardado ? (
                                <div className='d-flex justify-content-center' style={{width: '100%', height: 50 / proporcional,
                                    paddingTop: 13 / proporcional, paddingBottom: 13 / proporcional}}>
                                    <img src={icono_check} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 20 / proporcional}}/>
                                    <img src={icono_update} style={{width: 24 / proporcional, height: 24 / proporcional}}/>
                                </div>
                            ) : (
                                <div className='d-flex justify-content-center' style={{width: '100%', height: 50 / proporcional,
                                        paddingTop: 13 / proporcional, paddingBottom: 13 / proporcional}}>
                                    <img src={icono_guardar} style={{width: 24 / proporcional, height: 24 / proporcional, cursor: 'pointer'}}
                                        onClick={() => actualizar_producto_cotizacion()}/>
                                </div>
                            )
                        }
                    </div>
                </div>
                {
                    message === '' ? (
                        null
                    ) : (
                        <div style={{width: '100%', height: 30 / proporcional}}>
                            <p style={{fontSize: 14 / proporcional, color: '#212121', lineHeight: `${30 / proporcional}px`, marginBottom: 0, fontWeight: 500}}>
                                {message}
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

