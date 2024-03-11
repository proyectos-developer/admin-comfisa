import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CardProveedor({proveedor, index,proporcional}) {

    const navigate = useNavigate()

    const [button, setButton] = useState (false)

    return (
        <div key={index} className='d-flex shadow rounded' style={{width: '32%', height: '100%', padding: 10 / proporcional}}>
            <div style={{width: '100%', height: 'auto', marginRight: 10 / proporcional}}>
              <img src={proveedor.logo} style={{width: '100%', height: 'auto'}}/>
            </div>
            <div style={{width: '100%', height: 'auto'}}>
              <p style={{fontSize: 20 / proporcional, lineHeight: `${30 / proporcional}px`, marginBottom: 0, fontWeight: 700, color: 'rgb(56, 77, 167)'}}>
                {proveedor.proveedor}
              </p>
              <div style={{width: '100%', height: 96 / proporcional}}>
                <p style={{fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121', marginRight: 10 / proporcional,
                          cursor: 'default'}}>
                  {proveedor.descripcion.slice (0, 100)}... 
                </p>
              </div>
              <div style={{width: '100%', height: 30 / proporcional}} className='d-flex justify-content-end'>
                <div className='rounded' style={{width: button ? '100%' : '99%', marginLeft: 10 / proporcional, background: 'rgb(56, 77, 167', height: 30 / proporcional,
                    cursor: 'pointer'}}
                    onClick={() => navigate (`/home/proveedores/detalles-proveedor/${proveedor.id}`)}
                    onMouseOver={() => setButton(true)} onMouseLeave={() => setButton(false)}>
                    <p style={{fontSize: 16 / proporcional, lineHeight: `${30 / proporcional}px`, fontWeight: 50, marginBottom: 0 / proporcional, 
                        color: 'white', fontWeight: button ? 700 : 600, textAlign: 'center'}}>Ver más</p>
                  </div>
              </div>
            </div>
        </div>
      )
}