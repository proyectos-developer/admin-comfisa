import React, {useEffect, useState} from 'react'

import {useSelector} from 'react-redux'

export default function DetalleCotizacion({proporcional}) {

    const [lista_productos, setListaProductos] = useState ([])

    const {get_cotizacion} = useSelector (({cotizaciones}) => cotizaciones)

    useEffect (() => {
        console.log (get_cotizacion.cotizaciones)
        setListaProductos(get_cotizacion.cotizaciones)
    }, [])

    return (
        <div className='position-relative' 
            style={{width: '100%', paddingLeft: 350 / proporcional, paddingRight: 350 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='d' style={{width: '100%', height: 'auto', marginBottom: 20 / proporcional}}>
                {
                    lista_productos && lista_productos.length > 0 ? (
                        lista_productos.map ((producto, index) => {
                            return (
                                <div className='d-flex justify-content-between rounded' style={{width: '100%', height: 75 / proporcional, marginBottom: 0.5 / proporcional,
                                        border: '1px solid #f0f0f0', paddingTop: 12.5 / proporcional, paddingBottom: 12.5 / proporcional}}>
                                    <div className='d-flex justify-content-center' style={{width: '5%', height: 75 / proporcional}}>
                                        <p style={{fontSize: 16 / proporcional, lineHeight: `${50 / proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                                fontWeight: 600}}>
                                            {index + 1}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    ) : null
                } 
            </div>
        </div>
    )
}