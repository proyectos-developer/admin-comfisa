import React, {useState} from 'react'

import icono_guardar from '../../../assets/iconos/icono_guardar_blue_96.png'
import icono_check from '../../../assets/iconos/icono_check_blue_96.png'

export default function CardProductoCotizarCell({proporcional, producto, index}) {

    const [precio, setPrecio] = useState(0)
    const [observaciones, setObservaciones] = useState ('')
    const [guardado, setGuardado] = useState(false)

    return (
        <div className='rounded' style={{width: '100%', height: 'auto', marginBottom: 10 / proporcional, border: '1px solid #f0f0f0'}}>
            <div className='d-flex' style={{width: '100%', height: 100 / proporcional,
                    borderBottom: '1px solid #f0f0f0', paddingTop: 12.5 / proporcional, paddingBottom: 12.5 / proporcional}}>
                <div className='d-flex justify-content-center' style={{width: '10%', height: 75 / proporcional, borderRight: '1px solid #f0f0f0'}}>
                    <p style={{fontSize: 16 / proporcional, lineHeight: `${75 / proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500, textAlign: 'center'}}>
                        {index + 1}
                    </p>
                </div>
                <div className='d-flex justify-content-start' style={{width: '90%', height: 75 / proporcional, borderRight: '1px solid #f0f0f0'}}>
                    <div style={{width: '100%', height: 75 / proporcional, paddingLeft: 10 / proporcional, paddingRight: 10 / proporcional}}>
                        <p style={{fontSize: 14 / proporcional, lineHeight: `${18/ proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                fontWeight: 500}}>
                            <span style={{fontSize: 16 / proporcional, fontWeight: 500}}>{producto.proveedor}</span>
                        </p>
                        <p style={{fontSize: 14 / proporcional, lineHeight: `${18/ proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                fontWeight: 500}}>
                            <span style={{fontSize: 16 / proporcional, fontWeight: 500}}>{producto.producto}</span>
                        </p>
                        <p style={{fontSize: 14 / proporcional, lineHeight: `${19.5/ proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                                fontWeight: 500}}>
                            <span style={{fontSize: 16 / proporcional, fontWeight: 500}}>{producto.descripción}</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className='d-flex' style={{width: '100%', height: 100 / proporcional,
                    borderBottom: '1px solid #f0f0f0', paddingTop: 12.5 / proporcional, paddingBottom: 12.5 / proporcional}}>
                <div className='d-flex justify-content-start' style={{width: '80%', height: 75 / proporcional, borderRight: '1px solid #f0f0f0',
                    paddingLeft: 10 / proporcional, paddingRight: 10 / proporcional}}>
                    <p style={{fontSize: 16 / proporcional, lineHeight: `${18.75/ proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500}}>
                        <span style={{fontSize: 16 / proporcional, fontWeight: 500}}>{producto.comentarios}</span>
                    </p>
                </div>
                <div className='' style={{width: '20%', height: 75 / proporcional, borderRight: '1px solid #f0f0f0',
                    paddingLeft: 10 / proporcional, paddingRight: 10 / proporcional}}>
                    <p style={{fontSize: 16 / proporcional, lineHeight: `${37.5/ proporcional}px`, color: 'black', marginBottom: 0, fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500, textAlign: 'center'}}>Cant. <br/>
                        <span style={{fontSize: 16 / proporcional, fontWeight: 600}}>{producto.cantidad}</span>
                    </p>
                </div>
            </div>
            <div className='d-flex' style={{width: '100%', height: 'auto',
                    borderBottom: '1px solid #f0f0f0', paddingTop: 12.5 / proporcional, paddingBottom: 12.5 / proporcional}}>
                <div className='d-flex justify-content-center' style={{width: '30%', height: 75 / proporcional, borderRight: '1px solid #f0f0f0',
                    paddingLeft: 10 / proporcional, paddingRight: 10 / proporcional, paddingTop: 12.5 / proporcional, paddingBottom: 12.5 / proporcional}}>
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
                <div className='d-flex' style={{width: '100%', height: 74 / proporcional, padding: 12 / proporcional}}>
                    <div className='d-flex justify-content-center' style={{width: '70%', height: 50 / proporcional, borderRight: '1px solid #f0f0f0'}}>
                        <textarea
                            className='form-control rounded'
                            style={{width: '95%', border: '1px solid #efefef', height: 50 / proporcional, fontSize: 16 / proporcional, lineHeight: `${18 / proporcional}px`, color: '#212121'}}
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
                                <img src={icono_guardar} style={{width: 24 / proporcional, height: 24 / proporcional}}/>
                            </div>
                        ) : (
                            <div className='d-flex justify-content-center' style={{width: '100%', height: 50 / proporcional,
                                    paddingTop: 13 / proporcional, paddingBottom: 13 / proporcional}}>
                                <img src={icono_guardar} style={{width: 24 / proporcional, height: 24 / proporcional}}/>
                            </div>
                        )
                    }
                </div>
                </div>
            </div>
        </div>
    )
}

