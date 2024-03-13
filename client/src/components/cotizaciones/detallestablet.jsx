import React, {useEffect, useState} from 'react'

import {useSelector} from 'react-redux'

import CardProductoCotizarTablet from './cards/productocotizartablet'

export default function DetalleCotizacionTablet({proporcional}) {

    const [lista_productos, setListaProductos] = useState ([])

    const [precio, setPrecio] = useState(0)

    const {get_cotizacion} = useSelector (({cotizaciones}) => cotizaciones)

    useEffect (() => {
        setListaProductos(get_cotizacion.cotizaciones)
    }, [])

    return (
        <div className='position-relative' 
            style={{width: '100%', paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='d' style={{width: '100%', height: 'auto', marginBottom: 20 / proporcional}}>
                <div className='d-flex rounded' style={{width: '100%', height: 50 / proporcional, marginBottom: 0.5 / proporcional,
                        border: '1px solid #f0f0f0', paddingTop: 12.5 / proporcional, paddingBottom: 12.5 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '5%', height: 25 / proporcional, borderRight: '1px solid #f0f0f0'}}/>
                    <div className='d-flex justify-content-start' style={{width: '35%', height: 25 / proporcional, borderRight: '1px solid #f0f0f0',
                        paddingLeft: 10 / proporcional}}>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${25 / proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                fontWeight: 700}}>
                            Proveedor, producto
                        </p>
                    </div>
                    <div className='d-flex justify-content-start' style={{width: '35%', height: 25 / proporcional, borderRight: '1px solid #f0f0f0',
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
                    <div className='d-flex justify-content-center' style={{width: '15%', height: 25 / proporcional, paddingLeft: 10 / proporcional}}>
                        <p style={{fontSize: 16 / proporcional, lineHeight: `${25 / proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                fontWeight: 700}}>
                            Precio
                        </p>
                    </div>
                </div>
                {
                    lista_productos && lista_productos.length > 0 ? (
                        lista_productos.map ((producto, index) => {
                            return (
                                <CardProductoCotizarTablet proporcional={proporcional} producto={producto} index={index}/>
                            )
                        })
                    ) : null
                } 
            </div>
        </div>
    )
}