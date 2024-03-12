import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import './styles.css'

import PanelBegin from './components/begin/panel.jsx'
import PanelBeginTablet from './components/begin/paneltablet.jsx'
import PanelBeginCell from './components/begin/panelcell.jsx'

import Home from './components/home/panel.jsx'
import HomeTablet from './components/home/paneltablet.jsx'
import HomeCell from './components/home/panelcell.jsx'

import HomeDashboard from './components/home/dashboard.jsx'
import HomeDashboardTablet from './components/home/dashboardtablet.jsx'
import HomeDashboardCell from './components/home/dashboardcell.jsx'

import ProveedoresPanel from './components/proveedores/panel.jsx'
import ProveedoresPanelTablet from './components/proveedores/paneltablet.jsx'
import ProveedoresPanelCell from './components/proveedores/panelcell.jsx'

import ListaProveedores from './components/proveedores/proveedores.jsx'
import ListaProveedoresTablet from './components/proveedores/proveedorestablet.jsx'
import ListaProveedoresCell from './components/proveedores/proveedorescell.jsx'

import NuevoProveedor from './components/proveedores/nuevo.jsx'
import NuevoProveedorTablet from './components/proveedores/nuevotablet.jsx'
import NuevoProveedorCell from './components/proveedores/nuevocell.jsx'

import DetallesProveedor from './components/proveedores/detalles.jsx'
import DetallesProveedorTablet from './components/proveedores/detallestablet.jsx'
import DetallesProveedorCell from './components/proveedores/detallescell.jsx'

import ProductosPanel from './components/productos/panel.jsx'
import ProductosPanelTablet from './components/productos/paneltablet.jsx'
import ProductosPanelCell from './components/productos/panelcell.jsx'

import ListaProductos from './components/productos/productos.jsx'
import ListaProductosTablet from './components/productos/productostablet.jsx'
import ListaProductosCell from './components/productos/productoscell.jsx'

import NuevoProducto from './components/productos/nuevo.jsx'
import NuevoProductoTablet from './components/productos/nuevotablet.jsx'
import NuevoProductoCell from './components/productos/nuevocell.jsx'

import DetallesProducto from './components/productos/detalles.jsx'
import DetallesProductoTablet from './components/productos/detallestablet.jsx'
import DetallesProductoCell from './components/productos/detallescell.jsx'

import CotizacionesPanel from './components/Cotizaciones/panel.jsx'
import CotizacionesPanelTablet from './components/cotizaciones/paneltablet.jsx'
import CotizacionesPanelCell from './components/cotizaciones/panelcell.jsx'

import ListaCotizaciones from './components/cotizaciones/cotizaciones.jsx'
import ListaCotizacionesTablet from './components/cotizaciones/cotizacionestablet.jsx'
import ListaCotizacionesCell from './components/cotizaciones/cotizacionescell.jsx'

import DetallesCotizacion from './components/cotizaciones/detalles.jsx'
import DetallesCotizacionTablet from './components/cotizaciones/detallestablet.jsx'
import DetallesCotizacionCell from './components/cotizaciones/detallescell.jsx'

function App() {
  const [width, setWidth] = useState (window.outerWidth)

  useEffect(() => {
    window.addEventListener('resize', handle_resize)

    return () => {
      window.removeEventListener('resize', handle_resize)
    }
  }, [])

  const handle_resize = () => {
    setWidth(window.outerWidth)
  }

  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={width < 500 ? <PanelBeginCell proporcional={499 / width}/> : 
                                     width < 991 ? <PanelBeginTablet proporcional={991 / width}/> : 
                                                   <PanelBegin proporcional={1920 / width} />}/>
            <Route path='home' element={width < 500 ? <HomeCell proporcional={499 / width}/> : 
                                        width < 991 ? <HomeTablet proporcional={991 / width}/> : 
                                                      <Home proporcional={1920 / width} />}>                                         
                  <Route index element={width < 500 ? <HomeDashboardCell proporcional={499 / width}/> : 
                                        width < 991 ? <HomeDashboardTablet proporcional={991 / width}/> : 
                                                      <HomeDashboard proporcional={1920 / width} />}/>

                  <Route path='proveedores' element={width < 500 ? <ProveedoresPanelCell proporcional={499 / width}/> : 
                                                     width < 991 ? <ProveedoresPanelTablet proporcional={991 / width}/> : 
                                                                   <ProveedoresPanel proporcional={1920 / width} />}>
                        <Route index element={width < 500 ? <ListaProveedoresCell proporcional={499 / width}/> : 
                                              width < 991 ? <ListaProveedoresTablet proporcional={991 / width}/> : 
                                                            <ListaProveedores proporcional={1920 / width} />}/>
                                                            
                        <Route path='nuevo-proveedor' element={width < 500 ? <NuevoProveedorCell proporcional={499 / width}/> : 
                                                               width < 991 ? <NuevoProveedorTablet proporcional={991 / width}/> : 
                                                                             <NuevoProveedor proporcional={1920 / width} />}/>
                        
                        <Route path='detalles-proveedor/:id_proveedor' element={width < 500 ? <DetallesProveedorCell proporcional={499 / width}/> : 
                                                                                width < 991 ? <DetallesProveedorTablet proporcional={991 / width}/> : 
                                                                                              <DetallesProveedor proporcional={1920 / width} />}/>
                                                                      
                  </Route>
                  

                  <Route path='productos' element={width < 500 ? <ProductosPanelCell proporcional={499 / width}/> : 
                                                   width < 991 ? <ProductosPanelTablet proporcional={991 / width}/> : 
                                                                 <ProductosPanel proporcional={1920 / width} />}>
                        <Route index element={width < 500 ? <ListaProductosCell proporcional={499 / width}/> : 
                                              width < 991 ? <ListaProductosTablet proporcional={991 / width}/> : 
                                                            <ListaProductos proporcional={1920 / width} />}/>
                                                            
                        <Route path='nuevo-producto' element={width < 500 ? <NuevoProductoCell proporcional={499 / width}/> : 
                                                              width < 991 ? <NuevoProductoTablet proporcional={991 / width}/> : 
                                                                            <NuevoProducto proporcional={1920 / width} />}/>
                        
                        <Route path='detalles-producto/:id_producto' element={width < 500 ? <DetallesProductoCell proporcional={499 / width}/> : 
                                                                              width < 991 ? <DetallesProductoTablet proporcional={991 / width}/> : 
                                                                                            <DetallesProducto proporcional={1920 / width} />}/>
                                                                      
                  </Route>
                  
                  <Route path='cotizaciones' element={width < 500 ? <CotizacionesPanelCell proporcional={499 / width}/> : 
                                                      width < 991 ? <CotizacionesPanelTablet proporcional={991 / width}/> : 
                                                                    <CotizacionesPanel proporcional={1920 / width} />}>

                        <Route index element={width < 500 ? <ListaCotizacionesCell proporcional={499 / width}/> : 
                                              width < 991 ? <ListaCotizacionesTablet proporcional={991 / width}/> : 
                                                            <ListaCotizaciones proporcional={1920 / width} />}/>
                                                            
                        <Route path='detalles/:id_cotizacion' element={width < 500 ? <DetallesCotizacionCell proporcional={499 / width}/> : 
                                                                       width < 991 ? <DetallesCotizacionTablet proporcional={991 / width}/> : 
                                                                                     <DetallesCotizacion proporcional={1920 / width} />}/>
                                                                      
                  </Route>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App