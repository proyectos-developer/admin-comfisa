import React, { useState } from 'react'

import icono_clean from '../../assets/iconos/icono_clean_blue_96.png'
import icono_search from '../../assets/iconos/icono_search_blue_96.png'
import icono_add from '../../assets/iconos/icono_add_blue_96.png'

export default function ListaCotizacionesTablet({proporcional}) {

  const [buscar_cotizacion, setBuscarCotizacion] = useState('')

  const seleccionar_ordenar_por = () => {

  }

  const buscar_cotizacion_por = () => {

  }

  return (
    <div className='position-relative' style={{width: '100%', paddingLeft: 60 / proporcional, paddingRight: 60 / proporcional}}>
        <div className='d-flex' style={{width: '100%', height: 50 / proporcional, marginBottom: 25 / proporcional }}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 50 / proporcional}}>
                <p className='mb-0' 
                    style={{width: '32%', fontSize: 24 / proporcional, lineHeight: `${50 / proporcional}px`, fontWeight: 400, color: '#212121', 
                            marginRight: 10 / proporcional, fontFamily: `'Lora', serif`}}>
                    COTIZACIONES:
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
                        onChange={(event) => setBuscarCotizacion (event.target.value)}
                        value={buscar_cotizacion}
                        placeholder='Buscar cotización'
                    />
                    <div className='d-flex justify-content-between' style={{width: '20%', height: 24 / proporcional}}>
                        <img src={icono_search} style={{width: 24 / proporcional, height: 24 / proporcional, margin: 12 / proporcional, cursor: 'pointer'}} onClik={() => buscar_cotizacion_por ()}/>
                    </div>
                </div>
            </div>
        </div>
      </div>
  )
}