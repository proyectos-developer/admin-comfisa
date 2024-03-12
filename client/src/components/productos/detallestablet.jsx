import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AvatarEditor from 'react-avatar-editor'

import icono_add from '../../assets/iconos/icono_add_blue_96.png'
import icono_editar from '../../assets/iconos/icono_editar_blue_96.png'
import icono_cancelar from '../../assets/iconos/icono_cancelar_blue_96.png'
import icono_volver from '../../assets/iconos/icono_volver_blue_96.png'
import icono_actualizar from '../../assets/iconos/icono_actualizar_blue_96.png'
import icono_camera from '../../assets/iconos/icono_camera_blue_96.png'
import icono_toggle_on from '../../assets/iconos/icono_toggle_black_96.png'
import icono_toggle_off from '../../assets/iconos/icono_toggle_blue_96.png'

import icono_guardar from '../../assets/iconos/icono_guardar_blue_96.png'

import { set_open_menu_derecho } from '../../redux/actions/dataactions'
import { useLocation, useNavigate } from 'react-router-dom'
import {productosdata} from '../../redux/slice/productosdata'
import { productosConstants } from '../../uri/productos-constants'
import {proveedoresdata} from '../../redux/slice/proveedoresdata'
import { proveedoresConstants } from '../../uri/proveedores-constatns'

export default function DetallesProductoTablet({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [lista_proveedores, setListaProveedores] = useState([])
    const [lista_tipo_productos, setListaTipoProductos] = useState([])
    const [lista_medidas, setListaMedidas] = useState([])

    const [proveedor, setProveedor] = useState ('')
    const [id_proveedor, setIdProveedor] = useState('')
    const [tipo_producto, setTipoProducto] = useState ('')
    const [id_tipo_producto, setIdTipoProducto] = useState('')
    const [medida, setMedida] = useState ('')
    const [id_medida, setIdMedida] = useState('')

    const [foto_uno, setFotoUno] = useState('')
    const [foto_dos, setFotoDos] = useState('')
    const [foto_tres, setFotoTres] = useState('')
    const [foto_cuatro, setFotoCuatro] = useState('')
    const [foto_cinco, setFotoCinco] = useState('')
    const [foto_seis, setFotoSeis] = useState('')
    const [foto_siete, setFotoSiete] = useState('')
    const [foto_ocho, setFotoOcho] = useState('')
    const [foto_nueve, setFotoNueve] = useState('')
    const [foto_diez, setFotoDiez] = useState('')
    const [nombre_producto, setNombreProducto] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [caracteristicas_uno, setCaracteristicaUno] = useState('')
    const [caracteristicas_dos, setCaracteristicaDos] = useState('')
    const [caracteristicas_tres, setCaracteristicaTres] = useState('')
    const [caracteristicas_cuatro, setCaracteristicaCuatro] = useState('')
    const [caracteristicas_cinco, setCaracteristicaCinco] = useState('')
    const [count_descripcion, setCountDescripcion] = useState(250)
    const [count_caracteristica_uno, setCountCaracteristicaUno] = useState(250)
    const [count_caracteristica_dos, setCountCaracteristicaDos] = useState(250)
    const [count_caracteristica_tres, setCountCaracteristicaTres] = useState(250)
    const [count_caracteristica_cuatro, setCountCaracteristicaCuatro] = useState(250)
    const [count_caracteristica_cinco, setCountCaracteristicaCinco] = useState(250)
    const [cantidad, setCantidad] = useState('')
    const [unidad, setUnidad] = useState(true)
    const [mostrar, setMostrar] = useState(true)
    
    const [editar, setEditar] = useState(false)
    const [nuevo_tipo_producto, setNuevoTipoProducto] = useState (false)
    const [nueva_medida, setNuevaMedida] = useState (false)

    const [efoto_uno, setEFotoUno] = useState('')
    const [enombre_producto, setENombreProducto] = useState('')
    const [edescripcion, setEDescripcion] = useState('')

    const {update_producto, get_producto, get_tipo_productos_proveedor, get_medidas_tipo, new_tipo_producto, new_medida} = useSelector(({productos}) => productos)
    const {get_proveedores} = useSelector(({proveedores}) => proveedores)
    const {open_menu_derecho} = useSelector(({data}) => data)

    useEffect (() => {
        dispatch(productosdata(productosConstants(location.pathname.split ('/')[4], 0, 0, 0, {}, false).get_producto))
    }, [])

    useEffect(() => {
        if (get_producto && get_producto.success === true && get_producto.producto){
            setIdProveedor(get_producto.producto.id_proveedor)
            setProveedor(get_producto.producto.proveedor)
            setIdTipoProducto(get_producto.producto.id_tipo)
            setTipoProducto(get_producto.producto.nombre_tipo)
            setIdMedida(get_producto.producto.id_medida)
            setMedida(get_producto.producto.medida)
            setNombreProducto(get_producto.producto.producto)
            setDescripcion(get_producto.producto.descripcion)
            setCaracteristicaUno(get_producto.producto.caracteristica_uno)
            setCaracteristicaDos(get_producto.producto.caracteristica_dos)
            setCaracteristicaTres(get_producto.producto.caracteristica_tres)
            setCaracteristicaCuatro(get_producto.producto.caracteristica_cuatro)
            setCaracteristicaCinco(get_producto.producto.caracteristica_cinco)
            setFotoUno(get_producto.producto.foto_uno)
            setFotoDos(get_producto.producto.foto_dos)
            setFotoTres(get_producto.producto.foto_tres)
            setFotoCuatro(get_producto.producto.foto_cuatro)
            setFotoCinco(get_producto.producto.foto_cinco)
            setFotoSeis(get_producto.producto.foto_seis)
            setFotoSiete(get_producto.producto.foto_siete)
            setFotoOcho(get_producto.producto.foto_ocho)
            setFotoNueve(get_producto.producto.foto_nueve)
            setFotoDiez(get_producto.producto.foto_diez)
            setCantidad(get_producto.producto.cantidad)
            setMostrar(get_producto.producto.mostrar)
            setUnidad(get_producto.producto.unidad)
        }
    }, [get_producto])

    useEffect (() => {
        if (get_proveedores && get_proveedores.success === true && get_proveedores.proveedores){
            setListaProveedores(get_proveedores.proveedores)
        }
    }, [get_proveedores])

    useEffect (() => {
        if (update_producto && update_producto.success === true && update_producto.producto){
            dispatch(productosdata(productosConstants(0, 0, 0, 0, {}, true).update_producto))
            setEditar (false)
        }
    }, [update_producto])

    const buscar_datos_proveeodor = () => {
        setIdProveedor(value.split('-')[0]) 
        setProveedor(value.split('-')[1])
        dispatch (productosdata(productosConstants(value.split('-')[0], 0, 0, 0, {}, false).get_tipo_productos_proveedor))
    }

    useEffect (() => {
        if (get_tipo_productos_proveedor && get_tipo_productos_proveedor.success === true && get_tipo_productos_proveedor.tipo_productos){
            setListaTipoProductos(get_tipo_productos_proveedor.tipo_productos)
        }
    }, [get_tipo_productos_proveedor])

    const buscar_datos_tipo_proucto = (value) => {
        if (value !== '0' && value !== '00'){
            setIdTipoProducto(value.split('-')[0])
            setTipoProducto(value.split('-')[1])
            setNombreProducto(value.split('-')[1])
            dispatch(productosdata(productosConstants(value.split('-')[0], 0, 0, 0, {}, false).get_medidas_tipo))
        }else if (value === '00'){
            setNuevoTipoProducto(true)
        }
    }

    useEffect(() => {
        if (get_medidas_tipo && get_medidas_tipo.success === true && get_medidas_tipo.medidas){
            setListaMedidas(get_medidas_tipo.medidas)
        }
    }, [get_medidas_tipo])

    const seleccion_medida_tipo_producto = (value) => {
        if (value !== '0' && value !== '00'){
            setIdMedida(value.split('-')[0])
            setMedida(value.split('-')[1])
            setNombreProducto (tipo_producto + ' ' + value.split ('-')[1])
        }else if (value === '00'){
            setNuevaMedida(true)
        }
    }

    const guardar_tipo_proucto = () => {
        if (tipo_producto !== ''){
            const new_data = {
                id_proveedor: id_proveedor,
                proveedor: proveedor,
                nombre_tipo: tipo_producto
            }
            dispatch (productosdata(productosConstants (0, 0, 0, 0, new_data, false).new_tipo_producto))
        }
    }

    useEffect (() => {
        if (new_tipo_producto && new_tipo_producto.success === true && new_tipo_producto.tipo_productos && new_tipo_producto.tipo_producto){
            setTipoProducto(new_tipo_producto.tipo_producto.nombre_tipo)
            setIdTipoProducto(new_tipo_producto.tipo_producto.id)
            setNuevoTipoProducto(false)
            setListaTipoProductos(new_tipo_producto.tipo_productos)
            dispatch(productosdata(productosConstants(0, 0, 0, 0, {}, true).new_tipo_producto))
            setNombreProducto(new_tipo_producto.tipo_producto.nombre_tipo)
            dispatch (productosdata(productosConstants(new_tipo_producto.tipo_producto.id, 0, 0, 0, {}, false).get_medidas_tipo))
        }
    }, [new_tipo_producto])

    const guardar_medida_tipo = () => {
        if (medida !== ''){
            const new_data = {
                id_proveedor: id_proveedor,
                proveedor: proveedor,
                id_tipo: id_tipo_producto,
                nombre_tipo: tipo_producto,
                nombre_medida: medida
            }
            console.log (new_data)
            dispatch (productosdata(productosConstants (0, 0, 0, 0, new_data, false).new_medida))
        }
    }

    useEffect (() => {
        if (new_medida && new_medida.success === true && new_medida.medidas && new_medida.medida){
            setMedida(new_medida.medida.nombre_medida)
            setIdMedida(new_medida.medida.id)
            setNuevaMedida(false)
            setListaMedidas(new_medida.medidas)
            setNombreProducto(tipo_producto + ' ' + new_medida.medida.nombre_medida)
            dispatch(productosdata(productosConstants(0, 0, 0, 0, {}, true).new_medida))
        }
    }, [new_medida])

    const actualizar_producto = () => {
        if (nombre_producto === ''){
            setENombreProducto(nombre_producto === '' ? true : false)
        }else{
            const update_data = {
                id_proveedor: id_proveedor,
                proveedor: proveedor, 
                id_tipo: id_tipo_producto,
                nombre_tipo: tipo_producto,
                id_medida: id_medida,
                medida: medida,
                producto: nombre_producto,
                descripcion: descripcion,
                foto_uno: foto_uno,
                foto_dos: foto_dos,
                foto_tres: foto_tres,
                foto_cuatro: foto_cuatro,
                foto_cinco: foto_cinco,
                foto_seis: foto_seis,
                foto_siete: foto_siete,
                foto_ocho: foto_ocho,
                foto_nueve: foto_nueve,
                foto_diez: foto_diez,
                caracteristica_uno: caracteristicas_uno,
                caracteristica_dos: caracteristicas_dos,
                caracteristica_tres: caracteristicas_tres,
                caracteristica_cuatro: caracteristicas_cuatro,
                caracteristica_cinco: caracteristicas_cinco,
                cantidad: cantidad,
                mostrar: true,
                unidad: unidad
            }
            console.log (update_data)
            dispatch(productosdata(productosConstants(location.pathname.split ('/')[4], 0, 0, 0, update_data, false).update_producto))
        }
    }

    return (
        <div className='position-relative' 
            style={{width: '100%', paddingLeft: 60 / proporcional, paddingRight: 60 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 20 / proporcional}}>
                <div style={{width: '49%', height: 'auto'}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional, marginBottom: 10 / proporcional}}>
                        <select
                            disabled={!editar}
                            style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 46 / proporcional, fontSize: 16 / proporcional}}
                            className='form-select border-0 '
                            onChange={(event) => buscar_datos_proveeodor (event.target.value)}
                            id='id_proveedor'>
                            <option value='0'>{proveedor === '' ? 'Seleccionar proveedor' : proveedor}</option>
                            {
                                lista_proveedores && lista_proveedores.length > 0 ? (
                                    lista_proveedores.map ((proveedor, index) => {
                                        return (
                                            <option key={index} value={proveedor.id + '-' + proveedor.proveedor}>{proveedor.proveedor}</option>
                                        )
                                    })
                                ) : null
                            }
                        </select>
                    </div>
                    {
                        !nuevo_tipo_producto ? (
                            <div className='d-flex shadow-sm bg-white rounded' 
                                style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional, marginBottom: 10 / proporcional}}>
                                <select
                                    disabled={!editar}
                                    style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 46 / proporcional, fontSize: 16 / proporcional}}
                                    className='form-select border-0 '
                                    onChange={(event) => buscar_datos_tipo_proucto(event.target.value)}
                                    id='id_tipo_producto'>
                                    <option value='0'>{tipo_producto === '' ? 'Seleccionar tipo proucto' : tipo_producto}</option>
                                    <option value='00'>Agregar nuevo</option>
                                    {
                                        lista_tipo_productos && lista_tipo_productos.length > 0 ? (
                                            lista_tipo_productos.map ((tipo_producto, index) => {
                                                return (
                                                    <option key={index} value={tipo_producto.id + '-' + tipo_producto.nombre_tipo}>{tipo_producto.nombre_tipo}</option>
                                                )
                                            })
                                        ) : null
                                    }
                                </select>
                            </div>
                        ) : (
                            <div className='d-flex shadow-sm bg-white rounded' 
                                style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional, marginBottom: 10 / proporcional}}>
                                <input
                                    disabled={!editar}
                                    type='default'
                                    style={{fontFamily: 'Mukta, sans-serif', width: '90%', height: 48 / proporcional, fontSize: 16 / proporcional}}
                                    className='form-control border-0 '
                                    onChange={(event) => setTipoProducto(event.target.value)}
                                    value={tipo_producto}
                                    placeholder='Tipo de producto: ej. Cortadora'
                                    id='id_tipo_producto'/>
                                <div className='d-flex justify-content-center' style={{width: '10%', height: 50 / proporcional}}>
                                    <img src={icono_guardar} style={{width: 24 / proporcional, height: 24 / proporcional, margin: 13 / proporcional, cursor: 'pointer'}}
                                        onClick={() => guardar_tipo_proucto ()}/>
                                </div>
                            </div>
                        )
                    }
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional}}>
                        {
                            !nueva_medida ? (
                                <select
                                    disabled={!editar}
                                    style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 46 / proporcional, fontSize: 16 / proporcional}}
                                    className='form-select border-0 '
                                    onChange={(event) => seleccion_medida_tipo_producto (event.target.value)}
                                    id='id_medida_producto'>
                                    <option value='0'>{medida === '' ? 'Seleccionar dimensiones' : medida}</option>
                                    <option value='00'>Agregar nuevo</option>
                                    {
                                        lista_medidas && lista_medidas.length > 0 ? (
                                            lista_medidas.map ((medida, index) => {
                                                return (
                                                    <option key={index} value={medida.id + '-' + medida.nombre_medida}>{medida.nombre_medida}</option>
                                                )
                                            })
                                        ) : null
                                    }
                                </select>
                            ) : (
                                <div className='d-flex shadow-sm bg-white rounded' 
                                    style={{width: '100%', height: 48 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional, marginBottom: 10 / proporcional}}>
                                    <input
                                        disabled={!editar}
                                        type='default'
                                        style={{fontFamily: 'Mukta, sans-serif', width: '90%', height: 48 / proporcional, fontSize: 16 / proporcional}}
                                        className='form-control border-0 '
                                        onChange={(event) => setMedida(event.target.value)}
                                        value={medida}
                                        placeholder='Dimensiones Ej. 4 1/2'
                                        id='medida'/>
                                    <div className='d-flex justify-content-center' style={{width: '10%', height: 50 / proporcional}}>
                                        <img src={icono_guardar} style={{width: 24 / proporcional, height: 24 / proporcional, margin: 13 / proporcional, cursor: 'pointer'}}
                                            onClick={() => guardar_medida_tipo ()}/>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div style={{width: '49%', height: 'auto'}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: '100%', height: 50 / proporcional, border: enombre_producto ? '1px solid red' : '1px solid #B2DFDB', 
                                                    borderRadius: 4 / proporcional, marginBottom: 10 / proporcional}}>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: '40%', height: 48 / proporcional, fontSize: 16 / proporcional, 
                                    lineHeight: `${48 / proporcional}px`, color: '#757575', paddingLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} 
                                    className='mb-0'>
                            Nombre producto (*):
                        </p>
                        <input type='text'
                            disabled={!editar}
                            style={{fontFamily: 'Mukta, sans-serif', width: '60%', height: 46 / proporcional, fontSize: 16 / proporcional, fontWeight: 500, color: '#212121'}}
                            className='form-control border-0 '
                            value={nombre_producto}
                            onChange={(event) => {setNombreProducto(event.target.value)}}
                            id='nombre_producto'
                            placeholder='E.j. Lija'/>
                    </div>
                    <div style={{width: '100%', height: 110 / proporcional}}>
                        <div className='shadow-sm bg-white rounded' style={{width: '100%', height: 96 / proporcional, 
                                                border: edescripcion ? '1px solid red' : '1px solid #B2DFDB', 
                                                borderRadius: 4 / proporcional}}>
                            <textarea
                            disabled={!editar}
                                type='text'
                                rows={3}
                                id='descripcion'
                                aria-label='descripcion'
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 94 / proporcional, fontSize: 16 / proporcional, lineHeight: `${16 / proporcional}px`, fontWeight: 500, color: '#212121'}}
                                className='form-control border-0 '
                                placeholder='Descripción del proveedor (*)'
                                onChange={(event) => {setDescripcion(event.target.value); setCountDescripcion(descripcion.length - 1);}}
                                value={descripcion.slice(0, 250)}
                                />
                        </div>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: '100%', fontSize: 12 / proporcional, 
                                    lineHeight: `${14 / proporcional}px`, color: count_descripcion >= 0 ? '#757575' : 'red', fontWeight: 500, cursor: 'default', textAlign: 'end'}} className='mb-0'>
                            {250 - count_descripcion}
                        </p>
                    </div>
                </div>
            </div>
            <div style={{with: '100%', height: 'auto'}}>
                <div className='d-flex justify-content-between' 
                    style={{width: '100%', height: 50 / proporcional, marginBottom: 25 / proporcional}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: '32%', height: 50 / proporcional, border: '1px solid #B2DFDB', 
                                                    borderRadius: 4 / proporcional}}>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: '20%', height: 50 / proporcional, fontSize: 16 / proporcional, 
                                    lineHeight: `${50 / proporcional}px`, color: '#757575', paddingLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                        Cantidad:
                        </p>
                        <input type='number'
                            disabled={!editar}
                            style={{fontFamily: 'Mukta, sans-serif', width: '80%', height: 48 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            className='form-control border-0 '
                            value={cantidad}
                            onChange={(event) => {setCantidad(event.target.value)}}
                            id='cantidad'
                            placeholder='0'/>
                    </div>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: '33%', height: 50 / proporcional, border: '1px solid #B2DFDB',
                                                    borderRadius: 4 / proporcional}}>
                        <select
                            disabled={!editar}
                            style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional, fontWeight: 500, color: '#212121'}}
                            className='form-select border-0 '
                            value={medida}
                            onChange={(value) => {setMedida(value)}}
                            id='medida'>
                            <option value='0'>Seleccionar</option>
                            <option value='unida'>Unidad</option>
                            <option value='kilogramo'>Kilogramo</option>
                            <option value='rollo'>Rollo</option>
                            <option value='balde'>Balde</option>
                        </select>
                    </div>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: '33%', height: 50 / proporcional, 
                                                    borderRadius: 4 / proporcional, paddingLeft: 10 / proporcional}}>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: '20%', height: 50 / proporcional, fontSize: 16 / proporcional, 
                                    lineHeight: `${50 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                        {`${mostrar ? 'ON' : 'OFF'}`}:
                        </p>
                        <div className='d-flex justify-content-center' style={{width: '80%', height: 32 / proporcional, marginTop: 9 / proporcional,
                                marginBottom: 9 / proporcional}}>
                            <img src={!mostrar ? icono_toggle_on : icono_toggle_off} style={{width: 32 / proporcional, height: 32 / proporcional, 
                                    cursor: 'pointer'}}
                                onClick={() => {editar ? setMostrar(!mostrar) : null}}/>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 20 / proporcional}}>
                    <div style={{width: '49%', height: 110 / proporcional}}>
                        <div className='d-flex shadow-sm bg-white rounded' 
                            style={{width: '100%', height: 110 / proporcional, border: '1px solid #B2DFDB',
                                                        borderRadius: 4 / proporcional}}>
                            <textarea
                                disabled={!editar} 
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 94 / proporcional, fontSize: 16 / proporcional, 
                                        lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121'}}
                                cols={2}
                                className='form-control border-0 '
                                value={caracteristicas_uno.slice(0, 250)}
                                onChange={(event) => {setCaracteristicaUno(event.target.value); setCountCaracteristicaUno(caracteristicas_uno.length -1)}}
                                id='caracteristicas_uno'
                                placeholder='Característica uno'/>
                        </div>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: '100%', fontSize: 12 / proporcional, 
                                    lineHeight: `${16 / proporcional}px`, color: count_caracteristica_uno >= 0 ? '#757575' : 'red', fontWeight: 500, cursor: 'default', textAlign: 'end'}} className='mb-0'>
                            {250 - count_caracteristica_uno}
                        </p>
                    </div>
                    <div style={{width: '49%', height: 'auto'}}>
                        <div className='d-flex shadow-sm bg-white rounded' 
                            style={{width: '100%', height: 110 / proporcional, border: '1px solid #B2DFDB',
                                                        borderRadius: 4 / proporcional}}>
                            <textarea
                                disabled={!editar} 
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 94 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121',
                                        }}
                                cols={2}
                                className='form-control border-0 '
                                value={caracteristicas_dos.slice(0, 250)}
                                onChange={(event) => {setCaracteristicaDos(event.target.value); setCountCaracteristicaDos(caracteristicas_dos.length -1)}}
                                id='caracteristicas_dos'
                                placeholder='Característica dos'/>
                        </div>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: '100%', fontSize: 12 / proporcional, 
                                    lineHeight: `${16 / proporcional}px`, color: count_caracteristica_uno >= 0 ? '#757575' : 'red', fontWeight: 500, cursor: 'default', textAlign: 'end'}} className='mb-0'>
                            {250 - count_caracteristica_dos}
                        </p>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 20 / proporcional}}>
                    <div style={{width: '49%', height: 110 / proporcional}}>
                        <div className='d-flex shadow-sm bg-white rounded' 
                            style={{width: '100%', height: 110 / proporcional, border: '1px solid #B2DFDB',
                                                        borderRadius: 4 / proporcional}}>
                            <textarea
                                disabled={!editar} 
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 94 / proporcional, fontSize: 16 / proporcional, 
                                        lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121'}}
                                cols={2}
                                className='form-control border-0 '
                                value={caracteristicas_tres.slice(0, 250)}
                                onChange={(event) => {setCaracteristicaTres(event.target.value); setCountCaracteristicaTres(caracteristicas_tres.length -1)}}
                                id='caracteristicas_tres'
                                placeholder='Característica tres'/>
                        </div>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: '100%', fontSize: 12 / proporcional, 
                                    lineHeight: `${16 / proporcional}px`, color: count_caracteristica_tres >= 0 ? '#757575' : 'red', fontWeight: 500, cursor: 'default', textAlign: 'end'}} className='mb-0'>
                            {250 - count_caracteristica_tres}
                        </p>
                    </div>
                    <div style={{width: '49%', height: 'auto'}}>
                        <div className='d-flex shadow-sm bg-white rounded' 
                            style={{width: '100%', height: 110 / proporcional, border: '1px solid #B2DFDB',
                                                        borderRadius: 4 / proporcional}}>
                            <textarea
                                disabled={!editar} 
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 94 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121',
                                        }}
                                cols={2}
                                className='form-control border-0 '
                                value={caracteristicas_cuatro.slice(0, 250)}
                                onChange={(event) => {setCaracteristicaCuatro(event.target.value); setCountCaracteristicaCuatro(caracteristicas_cuatro.length -1)}}
                                id='caracteristicas_cuatro'
                                placeholder='Característica cuatro'/>
                        </div>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: '100%', fontSize: 12 / proporcional, 
                                    lineHeight: `${16 / proporcional}px`, color: count_caracteristica_cuatro >= 0 ? '#757575' : 'red', fontWeight: 500, cursor: 'default', textAlign: 'end'}} className='mb-0'>
                            {250 - count_caracteristica_cuatro}
                        </p>
                    </div>
                </div>
                <div className='d-flex justify-content-start' style={{width: '100%', height: 'auto', marginBottom: 20 / proporcional}}>
                    <div style={{width: '49%', height: 110 / proporcional}}>
                        <div className='d-flex shadow-sm bg-white rounded' 
                            style={{width: '100%', height: 110 / proporcional, border: '1px solid #B2DFDB',
                                                        borderRadius: 4 / proporcional}}>
                            <textarea
                                disabled={!editar} 
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 94 / proporcional, fontSize: 16 / proporcional, 
                                        lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121'}}
                                cols={2}
                                className='form-control border-0 '
                                value={caracteristicas_cinco.slice(0, 250)}
                                onChange={(event) => {setCaracteristicaCinco(event.target.value); setCountCaracteristicaCinco(caracteristicas_cinco.length -1)}}
                                id='caracteristicas_cinco'
                                placeholder='Característica cinco'/>
                        </div>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: '100%', fontSize: 12 / proporcional, 
                                    lineHeight: `${16 / proporcional}px`, color: count_caracteristica_cinco >= 0 ? '#757575' : 'red', fontWeight: 500, cursor: 'default', textAlign: 'end'}} className='mb-0'>
                            {250 - count_caracteristica_cinco}
                        </p>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', marginBottom: 20 / proporcional}}>
                    <div style={{width: '24%', height: 'auto', border: efoto_uno ? '1px solid red' : 'none'}}>
                        {
                            foto_uno === '' ? ( 
                                <div className='' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <div style={{width: '100%', height: 220 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <img src={foto_uno} style={{width: '100%', hight: 220 / proporcional}}/>
                                </div>
                            )
                        }
                        <div className='d-flex shadow-sm bg-white rounded' 
                            style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional}}>
                            <input type='url'
                                disabled={!editar}
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 46 / proporcional, fontSize: 16 / proporcional, fontWeight: 500, color: '#212121'}}
                                className='form-control border-0 '
                                value={foto_uno}
                                onChange={(event) => {setFotoUno(event.target.value)}}
                                id='foto_uno'
                                placeholder='Url de la foto uno'/>
                        </div>
                    </div>
                    <div style={{width: '24%', height: 'auto'}}>
                        {
                            foto_dos === '' ? ( 
                                <div className='' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <div style={{width: '100%', height: 220 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <img src={foto_dos} style={{width: '100%', hight: 220 / proporcional}}/>
                                </div>
                            )
                        }
                        <div className='d-flex shadow-sm bg-white rounded' 
                            style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional}}>
                            <input type='url'
                                disabled={!editar}
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 46 / proporcional, fontSize: 16 / proporcional, fontWeight: 500, color: '#212121'}}
                                className='form-control border-0 '
                                value={foto_dos}
                                onChange={(event) => {setFotoDos(event.target.value)}}
                                id='foto_dos'
                                placeholder='Url de la foto dos'/>
                        </div>
                    </div>
                    <div style={{width: '24%', height: 'auto'}}>
                        {
                            foto_tres === '' ? ( 
                                <div className='' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <div style={{width: '100%', height: 220 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <img src={foto_tres} style={{width: '100%', hight: 220 / proporcional}}/>
                                </div>
                            )
                        }
                        <div className='d-flex shadow-sm bg-white rounded' 
                            style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional}}>
                            <input type='url'
                                disabled={!editar}
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 46 / proporcional, fontSize: 16 / proporcional, fontWeight: 500, color: '#212121'}}
                                className='form-control border-0 '
                                value={foto_tres}
                                onChange={(event) => {setFotoTres(event.target.value)}}
                                id='foto_tres'
                                placeholder='Url de la foto tres'/>
                        </div>
                    </div>
                    <div style={{width: '24%', height: 'auto'}}>
                        {
                            foto_cuatro === '' ? ( 
                                <div className='' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <div style={{width: '100%', height: 220 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <img src={foto_cuatro} style={{width: '100%', hight: 220 / proporcional}}/>
                                </div>
                            )
                        }
                        <div className='d-flex shadow-sm bg-white rounded' 
                            style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional}}>
                            <input type='url'
                                disabled={!editar}
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 46 / proporcional, fontSize: 16 / proporcional, fontWeight: 500, color: '#212121'}}
                                className='form-control border-0 '
                                value={foto_cuatro}
                                onChange={(event) => {setFotoCuatro(event.target.value)}}
                                id='foto_cuatro'
                                placeholder='Url de la foto cuatro'/>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', marginBottom: 20 / proporcional}}>
                    <div style={{width: '24%', height: 'auto'}}>
                        {
                            foto_cinco === '' ? ( 
                                <div className='' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <div style={{width: '100%', height: 220 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <img src={foto_cinco} style={{width: '100%', hight: 220 / proporcional}}/>
                                </div>
                            )
                        }
                        <div className='d-flex shadow-sm bg-white rounded' 
                            style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional}}>
                            <input type='url'
                                disabled={!editar}
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 46 / proporcional, fontSize: 16 / proporcional, fontWeight: 500, color: '#212121'}}
                                className='form-control border-0 '
                                value={foto_cinco}
                                onChange={(event) => {setFotoCinco(event.target.value)}}
                                id='foto_cinco'
                                placeholder='Url de la foto cinco'/>
                        </div>
                    </div>
                    <div style={{width: '24%', height: 'auto'}}>
                        {
                            foto_seis === '' ? ( 
                                <div className='' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <div style={{width: '100%', height: 220 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <img src={foto_seis} style={{width: '100%', hight: 220 / proporcional}}/>
                                </div>
                            )
                        }
                        <div className='d-flex shadow-sm bg-white rounded' 
                            style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional}}>
                            <input type='url'
                                disabled={!editar}
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 46 / proporcional, fontSize: 16 / proporcional, fontWeight: 500, color: '#212121'}}
                                className='form-control border-0 '
                                value={foto_seis}
                                onChange={(event) => {setFotoSeis(event.target.value)}}
                                id='foto_seis'
                                placeholder='Url de la foto seis'/>
                        </div>
                    </div>
                    <div style={{width: '24%', height: 'auto'}}>
                        {
                            foto_siete === '' ? ( 
                                <div className='' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <div style={{width: '100%', height: 220 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <img src={foto_siete} style={{width: '100%', hight: 220 / proporcional}}/>
                                </div>
                            )
                        }
                        <div className='d-flex shadow-sm bg-white rounded' 
                            style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional}}>
                            <input type='url'
                                disabled={!editar}
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 46 / proporcional, fontSize: 16 / proporcional, fontWeight: 500, color: '#212121'}}
                                className='form-control border-0 '
                                value={foto_siete}
                                onChange={(event) => {setFotoSiete(event.target.value)}}
                                id='foto_siete'
                                placeholder='Url de la foto siete'/>
                        </div>
                    </div>
                    <div style={{width: '24%', height: 'auto'}}>
                        {
                            foto_ocho === '' ? ( 
                                <div className='' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <div style={{width: '100%', height: 220 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                    <img src={foto_ocho} style={{width: '100%', hight: 220 / proporcional}}/>
                                </div>
                            )
                        }
                        <div className='d-flex shadow-sm bg-white rounded' 
                            style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional}}>
                            <input type='url'
                                disabled={!editar}
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 46 / proporcional, fontSize: 16 / proporcional, fontWeight: 500, color: '#212121'}}
                                className='form-control border-0 '
                                value={foto_ocho}
                                onChange={(event) => {setFotoOcho(event.target.value)}}
                                id='foto_ocho'
                                placeholder='Url de la foto ocho'/>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-center' style={{width: '100%', marginBottom: 20 / proporcional}}>
                    <div className='d-flex justify-content-between' style={{width: '50%', hight: 'auto'}}>
                        <div style={{width: '49%', height: 'auto'}}>
                            {
                                foto_nueve === '' ? ( 
                                    <div className='' 
                                        style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                        <div style={{width: '100%', height: 220 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                    </div>
                                ) : (
                                    <div className='position-relative' 
                                        style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                        <img src={foto_nueve} style={{width: '100%', hight: 220 / proporcional}}/>
                                    </div>
                                )
                            }
                            <div className='d-flex shadow-sm bg-white rounded' 
                                style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional}}>
                                <input type='url'
                                    disabled={!editar}
                                    style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 46 / proporcional, fontSize: 16 / proporcional, fontWeight: 500, color: '#212121'}}
                                    className='form-control border-0 '
                                    value={foto_nueve}
                                    onChange={(event) => {setFotoNueve(event.target.value)}}
                                    id='foto_nueve'
                                    placeholder='Url de la foto nueve'/>
                            </div>
                        </div>
                        <div style={{width: '49%', height: 'auto'}}>
                            {
                                foto_diez === '' ? ( 
                                    <div className='' 
                                        style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                        <div style={{width: '100%', height: 220 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                    </div>
                                ) : (
                                    <div className='position-relative' 
                                        style={{width: '100%', height: 220 / proporcional, marginBottom: 10 / proporcional}}>
                                        <img src={foto_diez} style={{width: '100%', hight: 220 / proporcional}}/>
                                    </div>
                                )
                            }
                            <div className='d-flex shadow-sm bg-white rounded' 
                                style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional}}>
                                <input type='url'
                                    disabled={!editar}
                                    style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 46 / proporcional, fontSize: 16 / proporcional, fontWeight: 500, color: '#212121'}}
                                    className='form-control border-0 '
                                    value={foto_diez}
                                    onChange={(event) => {setFotoDiez(event.target.value)}}
                                    id='foto_diez'
                                    placeholder='Url de la foto diez'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                open_menu_derecho ? ( 
                    <div className='position-absolute shadow rounded' 
                            style={{width: 330 / proporcional, padding: 30 / proporcional, top: -60 / proporcional, right: 20 / proporcional, background: 'white'}}>
                        <div className='d-flex' style={{width: 270 / proporcional, height: 'auto', marginBottom: 10 / proporcional, cursor: 'pointer'}}
                            onClick={() => {setEditar(!editar); dispatch(set_open_menu_derecho(!open_menu_derecho))}}>
                            <img src={editar ? icono_cancelar : icono_editar} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                            <p style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                                {editar ? 'Cancelar edición' : 'Editar producto'}
                            </p>
                        </div>
                        <div className='rounded-pill' style={{width: 270 / proporcional, height: 2 / proporcional, background: '#e29022', marginBottom: 10 / proporcional}}/>
                        {
                            !editar ? (
                                <div style={{width: 270 / proporcional, height: 'auto'}}>
                                    <div className='d-flex' style={{width: 270 / proporcional, height: 'auto', marginBottom: 10 / proporcional, cursor: 'pointer'}}
                                        onClick={() => {navigate ('/home/productos/nuevo-producto'); dispatch(set_open_menu_derecho(!open_menu_derecho))}}>
                                        <img src={editar ? icono_cancelar : icono_add} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                                        <p style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                                            Nuevo producto
                                        </p>
                                    </div>
                                    <div className='rounded-pill' style={{width: 270 / proporcional, height: 2 / proporcional, background: '#e29022', marginBottom: 10 / proporcional}}/>
                                </div>
                            ) : null
                        }
                        <div className='d-flex' style={{width: 270 / proporcional, height: 'auto', marginBottom: 10 / proporcional, cursor: 'pointer'}}
                            onClick={editar ? () => {dispatch(set_open_menu_derecho(false)); actualizar_producto ()} :
                                              () => {navigate('/home/productos'); dispatch(set_open_menu_derecho(false))}}>
                            <img src={editar ? icono_actualizar : icono_volver} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                            <p style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                                {editar ? 'Actualizar producto' : 'Volver productos'}
                            </p>
                        </div>
                        <div className='rounded-pill' style={{width: 270 / proporcional, height: 2 / proporcional, background: '#e29022', marginBottom: 10 / proporcional}}/>
                    </div>
                ) : null
            }
        </div>
  )
}
