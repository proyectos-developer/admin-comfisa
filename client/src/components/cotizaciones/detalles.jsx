import React from 'react'

export default function DetalleCotizacion({proporcional}) {

    return (
        <div className='position-relative' 
            style={{width: '100%', paddingLeft: 500 / proporcional, paddingRight: 500 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 20 / proporcional}}>
            </div>
        </div>
    )
}