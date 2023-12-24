import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'
import {Provider} from 'react-redux'
import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'

import datareducer from './redux/reducers/datareducer'
import filtrosreducer from './redux/reducers/filtrosreducer'
import begindata from './redux/slice/begindata'
import proveedoresdata from './redux/slice/proveedoresdata.js'
import productosdata from './redux/slice/productosdata'

const store = configureStore({
    reducer: ({
      data: datareducer,
      filtros: filtrosreducer,
      begin: begindata,
      proveedores: proveedoresdata,
      productos: productosdata,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
         immutableCheck: false,
         serializableCheck: false,
    })
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
