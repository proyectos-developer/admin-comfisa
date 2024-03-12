import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CardProductoTablet({producto, index,proporcional}) {

    const navigate = useNavigate()

    const [button, setButton] = useState (false)

    return (
        <div key={index} className='d-flex shadow rounded' style={{width: '49%', height: 'auto', padding: 10 / proporcional}}>
            <div style={{width: 156 / proporcional, height: 156 / proporcional, marginRight: 10 / proporcional}}>
              <img src={producto.foto_uno} style={{width: 156 / proporcional, height: 156 / proporcional}}/>
            </div>
            <div style={{width: 200 / proporcional, height: 156 / proporcional}}>
              <p style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0, fontWeight: 700, color: 'rgb(56, 77, 167)'}}>
                {producto.proveedor}
              </p>
              <div style={{width: 200 / proporcional, height: 96 / proporcional}}>
                <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121', cursor: 'default'}}>
                  {producto.producto}
                </p>
                <p style={{fontSize: 16 / proporcional, lineHeight: `${20 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121', cursor: 'default'}}>
                  {producto.nombre_tipo + ' ' + producto.medida}
                </p>
              </div>
              <div style={{width: 200 / proporcional, height: 30 / proporcional}} className='d-flex justify-content-end'>
                <div className='rounded' style={{width: button ? 110 / proporcional : 100 / proporcional, marginLeft: 10 / proporcional, background: 'rgb(56, 77, 167', height: 30 / proporcional,
                    cursor: 'pointer'}}
                    onClick={() => navigate (`/home/productos/detalles-producto/${producto.id}`)}
                    onMouseOver={() => setButton(true)} onMouseLeave={() => setButton(false)}>
                    <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 50, marginBottom: 0 / proporcional, 
                        color: 'white', fontWeight: button ? 700 : 600, textAlign: 'center'}}>Ver más</p>
                  </div>
              </div>
            </div>
        </div>
      )
}