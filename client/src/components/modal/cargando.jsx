import React from 'react'
import { useSelector } from 'react-redux'

export default function ModalCargando({loading}) {

    return (
        <div className={`position-fixed top-0 w-100 vh-100`} style={{ display: loading ? 'block' : 'none', zIndex: '99999', background: 'rgba(39, 39, 39, 0.4)' }} id='modal'>
            <div id='modalcargando' className={`position-fixed top-50 start-50 translate-middle`}
                style={{background: 'transparent', borderRadius: 4}}>
                <div className="spinner-border" role="status" style={{margin: '10px'}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    )
}
