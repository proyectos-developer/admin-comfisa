import React from 'react'

import icono_proveedores from '../../assets/iconos/icono_proveedores_282.png'
import icono_productos from '../../assets/iconos/icono_productos_282.png'
import icono_pedidos from '../../assets/iconos/icono_pedidos_282.png'
import icono_cotizar from '../../assets/iconos/icono_cotizar_282.png'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function HomeDashboard({proporcional}) {

  const navigate = useNavigate()

  const [opcion_menu, setOpcionMenu] = useState ('')

  return (
    <div className='position-relative' 
      style={{width: '100%', paddingLeft: 220 / proporcional, paddingRight: 220 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
        <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', paddingTop: 120 / proporcional, paddingBottom: 120 / proporcional}}>
          <div style={{width: '24%', height: 'auto'}}>
            <div className='d-flex justify-content-center' style={{width:'100%', height: 'auto'}}>
              <div className='shadow-lg rounded-circle position-relative' 
                  onMouseOver={() => setOpcionMenu('proveedores')} onMouseLeave={() => setOpcionMenu('')}
                  onClick={() => navigate ('proveedores')}
                  style={{cursor: 'pointer', width: 250 / proporcional, height: 250 / proporcional, padding: 50 / proporcional, border: '2px solid rgb(33,33,33, 0.6)'}}>
                  <img src={icono_proveedores} style={{width: 150 / proporcional, height: 150 / proporcional}}/>
                  {
                      opcion_menu === 'proveedores' ? (
                          <div style={{cursor: 'pointer', width: 248 / proporcional, height: 248 / proporcional, background: 'rgb(33,33,33, 0.6)'}} 
                              className='position-absolute top-0 start-0 rounded-circle shadow-sm'>
                          </div>
                      ) : null
                  }
              </div>
            </div>
            <p style={{fontSize: 24 / proporcional, lineHeight: `${50 / proporcional}px`, color: '#212121', fontWeight: 500, textAlign: 'center', cursor: 'default'}}>PROVEEDORES</p>
          </div>
          <div style={{width: '24%', height: 'auto'}}>
            <div className='d-flex justify-content-center' style={{width:'100%', height: 'auto'}}>
              <div className='shadow-lg rounded-circle position-relative' 
                  onMouseOver={() => setOpcionMenu('productos')} onMouseLeave={() => setOpcionMenu('')}
                  onClick={() => navigate ('productos')}
                  style={{cursor: 'pointer', width: 250 / proporcional, height: 250 / proporcional, padding: 50 / proporcional, border: '2px solid rgb(33,33,33, 0.6)'}}>
                  <img src={icono_productos} style={{width: 150 / proporcional, height: 150 / proporcional}}/>
                  {
                      opcion_menu === 'productos' ? (
                          <div style={{cursor: 'pointer', width: 248 / proporcional, height: 248 / proporcional, background: 'rgb(33,33,33, 0.6)'}} 
                              className='position-absolute top-0 start-0 rounded-circle shadow-sm'>
                          </div>
                      ) : null
                  }
              </div>
            </div>
              <p style={{fontSize: 24 / proporcional, lineHeight: `${50 / proporcional}px`, color: '#212121', fontWeight: 500, textAlign: 'center', cursor: 'default'}}>PRODUCTOS</p>
          </div>
          <div style={{width: '24%', height: 'auto'}}>
            <div className='d-flex justify-content-center' style={{width: '100%', height: 'auto'}}>
              <div className='d-flex justify-content-center' style={{width:'100%', height: 'auto'}}>
                <div className='shadow-lg rounded-circle position-relative' 
                    onMouseOver={() => setOpcionMenu('cotizaciones')} onMouseLeave={() => setOpcionMenu('')}
                    onClick={() => navigate ('cotizaciones')}
                    style={{cursor: 'pointer', width: 250 / proporcional, height: 250 / proporcional, padding: 50 / proporcional, border: '2px solid rgb(33,33,33, 0.6)'}}>
                    <img src={icono_cotizar} style={{width: 150 / proporcional, height: 150 / proporcional}}/>
                    {
                        opcion_menu === 'cotizaciones' ? (
                            <div style={{cursor: 'pointer', width: 248 / proporcional, height: 248 / proporcional, background: 'rgb(33,33,33, 0.6)'}} 
                                className='position-absolute top-0 start-0 rounded-circle shadow-sm'>
                            </div>
                        ) : null
                    }
                </div>
              </div>
            </div>
              <p style={{fontSize: 24 / proporcional, lineHeight: `${50 / proporcional}px`, color: '#212121', fontWeight: 500, textAlign: 'center', cursor: 'default'}}>COTIZACIONES</p>
          </div>
          <div style={{width: '24%', height: 'auto'}}>
            <div className='d-flex justify-content-center' style={{width:'100%', height: 'auto'}}>
              <div className='shadow-lg rounded-circle position-relative' 
                onMouseOver={() => setOpcionMenu('pedidos')} onMouseLeave={() => setOpcionMenu('')}
                onClick={() => navigate ('pedidos')}
                style={{cursor: 'pointer', width: 250 / proporcional, height: 250 / proporcional, padding: 50 / proporcional, border: '2px solid rgb(33,33,33, 0.6)'}}>
                <img src={icono_pedidos} style={{width: 150 / proporcional, height: 150 / proporcional}}/>
                {
                    opcion_menu === 'pedidos' ? (
                        <div style={{cursor: 'pointer', width: 248 / proporcional, height: 248 / proporcional, background: 'rgb(33,33,33, 0.6)'}} 
                            className='position-absolute top-0 start-0 rounded-circle shadow-sm'>
                        </div>
                    ) : null
                }
              </div>
            </div>
            <p style={{fontSize: 24 / proporcional, lineHeight: `${50 / proporcional}px`, color: '#212121', fontWeight: 500, textAlign: 'center', cursor: 'default'}}>PEDIDOS</p>
          </div>
        </div>
    </div>
  )
}