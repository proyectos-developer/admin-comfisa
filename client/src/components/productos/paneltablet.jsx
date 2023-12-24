import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

export default function ProductosPanelTablet({proporcional}) {
  
  return (
    <div className='' style={{width: '100%', paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
      <Outlet/>
    </div>
  )
}
