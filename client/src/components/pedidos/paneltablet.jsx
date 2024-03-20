import React from 'react'
import { Outlet } from 'react-router-dom'

export default function PedidosPanelTablet({proporcional}) {

  return (
    <div className='' style={{width: '100%', paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
      <Outlet/>
    </div>
  )
}