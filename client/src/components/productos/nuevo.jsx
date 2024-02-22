import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AvatarEditor from 'react-avatar-editor'

import icono_guardar from '../../assets/iconos/icono_guardar_blue_96.png'
import icono_volver from '../../assets/iconos/icono_volver_blue_96.png'
import icono_camera from '../../assets/iconos/icono_camera_blue_96.png'
import icono_toggle_on from '../../assets/iconos/icono_toggle_black_96.png'
import icono_toggle_off from '../../assets/iconos/icono_toggle_blue_96.png'

import { set_open_menu_derecho } from '../../redux/actions/dataactions'
import { useNavigate } from 'react-router-dom'
import {productosdata} from '../../redux/slice/productosdata'
import { productosConstants } from '../../uri/productos-constants'
import {proveedoresdata} from '../../redux/slice/proveedoresdata'
import { proveedoresConstants } from '../../uri/proveedores-constatns'

export default function NuevoProducto({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

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

    const [otro_producto, setOtroProducto] = useState (false)
    const [nuevo_tipo_producto, setNuevoTipoProducto] = useState (false)
    const [nueva_medida, setNuevaMedida] = useState (false)
    
    const [efoto_uno, setEFotoUno] = useState('')
    const [enombre_producto, setENombreProveedor] = useState('')
    const [edescripcion, setEDescripcion] = useState('')

    const {new_producto} = useSelector(({productos}) => productos)
    const {get_proveedores} = useSelector(({proveedores}) => proveedores)
    const {get_tipo_productos_proveedor, new_tipo_producto} = useSelector(({productos}) => productos)
    const {open_menu_derecho} = useSelector(({data}) => data)

    useEffect (() => {
        dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, {}, false).get_proveedores))
    }, [])

    useEffect (() => {
        if (get_proveedores && get_proveedores.success === true && get_proveedores.proveedores){
            console.log (get_proveedores)
            setListaProveedores(get_proveedores.proveedores)
        }
    }, [get_proveedores])

    useEffect (() => {
        if (get_tipo_productos_proveedor && get_tipo_productos_proveedor.success === true && get_tipo_productos_proveedor.tipo_productos){
            console.log (get_tipo_productos_proveedor)
            setListaTipoProductos(get_tipo_productos_proveedor.tipo_productos)
        }
    }, [get_tipo_productos_proveedor])

    const buscar_datos_proveeodr = (value) => {
        setIdProveedor(value.split('-')[0]) 
        setProveedor(value.split('-')[1])
        dispatch (productosdata(productosConstants(value.split('-')[0], 0, 0, 0, {}, false).get_tipo_productos_proveedor))
    }

    const buscar_datos_tipo_proucto = (value) => {
        if (value !== '0' && value !== '00'){
            setIdTipoProducto(value.split('-')[0])
            setTipoProducto(value.split('-')[1])
            dispatch(productosdata(productosConstants(value.split('-')[0], 0, 0, 0, {}, false).get_medidas_tipo))
        }else if (value === '00'){
            setNuevoTipoProducto(true)
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
        console.log (new_tipo_producto)
        if (new_tipo_producto && new_tipo_producto.success === true && new_tipo_producto.tipo_productos && new_tipo_producto.tipo_producto){
            setTipoProducto(new_tipo_producto.tipo_producto.nombre_tipo)
            setIdTipoProducto(new_tipo_producto.tipo_producto.id)
            setNuevoTipoProducto(false)
            setListaTipoProductos(new_tipo_producto.tipo_productos)
        }
    }, [new_tipo_producto])

    useEffect (() => {
        if (new_producto && new_producto.success === true && new_producto.producto){
            dispatch(productosdata(productosConstants(0, 0, 0, 0, {}, true).new_producto))
            if (otro_producto){
                setIdProveedor('')
                setProveedor('')
                setNombreProducto('')
                setDescripcion('')
                setCaracteristicaUno('')
                setCaracteristicaDos('')
                setCaracteristicaTres('')
                setCaracteristicaCuatro('')
                setCaracteristicaCinco('')
                setFotoUno('')
                setFotoDos('')
                setFotoTres('')
                setFotoCuatro('')
                setFotoCinco('')
                setCantidad('')
                setMostrar(true)
                navigate(`/home/productos/nuevo-producto`)
                document.getElementById('id_proveedor').value = '0'
            }else{
                navigate(`/home/productos/detalles-producto/${new_producto.producto.id}`)
            }
        }
    }, [new_producto])

    const guardar_producto = (otro) => {
        if (nombre_producto === ''){
            setENombreProveedor(nombre_producto === '' ? true : false)
        }else{
            setOtroProducto (otro)
            const nuevo_producto = {
                id_proveedor: id_proveedor,
                proveedor: proveedor,
                id_tipo: id_tipo,
                tipo_producto, tipo_producto,
                id_tipo_producto: id_tipo_producto,
                medida: medida,
                id_medida: id_medida,
                producto: nombre_producto,
                descripcion: descripcion,
                caracteristica_uno: caracteristicas_uno,
                caracteristica_dos: caracteristicas_dos,
                caracteristica_tres: caracteristicas_tres,
                caracteristica_cuatro: caracteristicas_cuatro,
                caracteristica_cinco: caracteristicas_cinco,
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
                unidad: unidad,
                cantidad: cantidad,
                mostrar: true
            }
            dispatch(productosdata(productosConstants(0, 0, 0, 0, nuevo_producto, false).new_producto))
        }
    }

    return (
        <div className='position-relative' 
            style={{width: '100%', paddingLeft: 500 / proporcional, paddingRight: 500 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 20 / proporcional}}>
                <div style={{width: '49%', height: 'auto'}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: '100%', height: 50 / proporcional, border: '1px solid #B2DFDB', borderRadius: 4 / proporcional, marginBottom: 10 / proporcional}}>
                        <select
                            style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional}}
                            className='form-select border-0 '
                            onChange={(event) => buscar_datos_proveeodr (event.target.value)}
                            id='id_proveedor'>
                            <option value='0'>Seleccionar proveedor</option>
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
                                    style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional}}
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
                        <select
                            style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional}}
                            className='form-select border-0 '
                            onChange={(event) => {setIdMedida(event.target.value.split('-')[0]); setMedida(event.target.value.split('-')[1])}}
                            id='id_tipo_producto'>
                            <option value='0'>Seleccionar dimensiones</option>
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
                            style={{fontFamily: 'Mukta, sans-serif', width: '60%', height: 48 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121'}}
                            className='form-control border-0 '
                            value={nombre_producto}
                            onChange={(event) => {setNombreProducto(event.target.value)}}
                            id='nombre_producto'
                            placeholder='E.j. Lija'/>
                    </div>
                    <div style={{width: '100%', height: 110 / proporcional}}>
                        <div className='shadow-sm bg-white rounded' style={{width: '100%', height: 110 / proporcional, 
                                                border: edescripcion ? '1px solid red' : '1px solid #B2DFDB', 
                                                borderRadius: 4 / proporcional}}>
                            <textarea
                                type='text'
                                rows={3}
                                id='descripcion'
                                aria-label='descripcion'
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 108 / proporcional, fontSize: 16 / proporcional, lineHeight: `${16 / proporcional}px`, fontWeight: 500, color: '#212121'}}
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
                                onClick={() => setMostrar(!mostrar)}/>
                        </div>
                    </div>
                </div>
                <div className='d-flex justify-content-between' style={{width: '100%', height: 'auto', marginBottom: 20 / proporcional}}>
                    <div style={{width: '49%', height: 110 / proporcional}}>
                        <div className='d-flex shadow-sm bg-white rounded' 
                            style={{width: '100%', height: 110 / proporcional, border: '1px solid #B2DFDB',
                                                        borderRadius: 4 / proporcional}}>
                            <textarea 
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 98 / proporcional, fontSize: 16 / proporcional, 
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
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 108 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121',
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
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 108 / proporcional, fontSize: 16 / proporcional, 
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
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 108 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121',
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
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 108 / proporcional, fontSize: 16 / proporcional, 
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
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121'}}
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
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121'}}
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
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121'}}
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
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121'}}
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
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121'}}
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
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121'}}
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
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121'}}
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
                                style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121'}}
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
                                    style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121'}}
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
                                    style={{fontFamily: 'Mukta, sans-serif', width: '100%', height: 48 / proporcional, fontSize: 16 / proporcional, lineHeight: `${48 / proporcional}px`, fontWeight: 500, color: '#212121'}}
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
                                onClick={() => {guardar_producto(false); dispatch(set_open_menu_derecho(false))}}>
                                <img src={icono_guardar} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                                <p style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                                    Guardar producto
                                </p>
                            </div>
                            <div className='rounded-pill' style={{width: 270 / proporcional, height: 2 / proporcional, background: '#e29022', marginBottom: 10 / proporcional}}/>
                        <div className='d-flex' style={{width: 270 / proporcional, height: 'auto', marginBottom: 10 / proporcional, cursor: 'pointer'}}
                            onClick={() => {guardar_producto(true); dispatch(set_open_menu_derecho(false))}}>
                            <img src={icono_guardar} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                                Guardar y agregar otro producto
                            </p>
                        </div>
                        <div className='rounded-pill' style={{width: 270 / proporcional, height: 2 / proporcional, background: '#e29022', marginBottom: 10 / proporcional}}/>
                        <div className='d-flex' style={{width: 270 / proporcional, height: 'auto', marginBottom: 10 / proporcional, cursor: 'pointer'}}
                            onClick={() => {dispatch(set_open_menu_derecho(false)); navigate('/home/productos')}}>
                            <img src={icono_volver} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                            <p style={{fontSize: 16 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                                Volver productos
                            </p>
                        </div>
                        <div className='rounded-pill' style={{width: 270 / proporcional, height: 2 / proporcional, background: '#e29022', marginBottom: 10 / proporcional}}/>
                    </div>
                ) : null
            }
        </div>
  )
}
