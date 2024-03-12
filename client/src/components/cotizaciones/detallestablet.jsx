import React from 'react'

export default function DetalleCotizacionTablet({proporcional}) {

    return (
        <div className='position-relative' 
            style={{width: '100%', paddingLeft: 60 / proporcional, paddingRight: 60 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 20 / proporcional}}>
            </div>
        </div>
    )
}