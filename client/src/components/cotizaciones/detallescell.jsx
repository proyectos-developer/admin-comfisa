import React from 'react'

export default function DetalleCotizacionCell({proporcional}) {

    return (
        <div className='position-relative' 
            style={{width: '100%', paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 20 / proporcional}}>
            </div>
        </div>
    )
}