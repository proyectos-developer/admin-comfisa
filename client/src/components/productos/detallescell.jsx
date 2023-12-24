import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AvatarEditor from 'react-avatar-editor'

import icono_editar from '../../assets/iconos/icono_editar_blue_96.png'
import icono_cancelar from '../../assets/iconos/icono_cancelar_blue_96.png'
import icono_volver from '../../assets/iconos/icono_volver_blue_96.png'
import icono_actualizar from '../../assets/iconos/icono_actualizar_blue_96.png'
import icono_camera from '../../assets/iconos/icono_camera_blue_96.png'
import icono_toggle_on from '../../assets/iconos/icono_toggle_black_96.png'
import icono_toggle_off from '../../assets/iconos/icono_toggle_blue_96.png'

import { set_open_menu_derecho } from '../../redux/actions/dataactions'
import { useLocation, useNavigate } from 'react-router-dom'
import {productosdata} from '../../redux/slice/productosdata'
import { productosConstants } from '../../uri/productos-constants'
import {proveedoresdata} from '../../redux/slice/proveedoresdata'
import { proveedoresConstants } from '../../uri/proveedores-constatns'

export default function DetallesProductoCell({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [lista_proveedores, setListaProveedores] = useState([])
    const [proveedor, setProveedor] = useState ('')
    const [id_proveedor, setIdProveedor] = useState('')

    const [foto_uno, setFotoUno] = useState('')
    const [foto_dos, setFotoDos] = useState('')
    const [foto_tres, setFotoTres] = useState('')
    const [foto_cuatro, setFotoCuatro] = useState('')
    const [foto_cinco, setFotoCinco] = useState('')
    const [nombre_producto, setNombreProducto] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [caracteristica_uno, setCaracteristicaUno] = useState('')
    const [caracteristica_dos, setCaracteristicaDos] = useState('')
    const [caracteristica_tres, setCaracteristicaTres] = useState('')
    const [caracteristica_cuatro, setCaracteristicaCuatro] = useState('')
    const [caracteristica_cinco, setCaracteristicaCinco] = useState('')
    const [count_descripcion, setCountDescripcion] = useState(500)
    const [count_caracteristica_uno, setCountCaracteristicaUno] = useState(500)
    const [count_caracteristica_dos, setCountCaracteristicaDos] = useState(500)
    const [count_caracteristica_tres, setCountCaracteristicaTres] = useState(500)
    const [count_caracteristica_cuatro, setCountCaracteristicaCuatro] = useState(500)
    const [count_caracteristica_cinco, setCountCaracteristicaCinco] = useState(500)
    const [cantidad, setCantidad] = useState('')
    const [medida, setMedida] = useState(true)
    const [mostrar, setMostrar] = useState(true)
    
    const [editar, setEditar] = useState(false)

    const [efoto_uno, setEFotoUno] = useState('')
    const [enombre_producto, setENombreProducto] = useState('')
    const [edescripcion, setEDescripcion] = useState('')

    const {update_producto, get_producto} = useSelector(({productos}) => productos)
    const {get_proveedores} = useSelector(({proveedores}) => proveedores)
    const {open_menu_derecho} = useSelector(({data}) => data)

    let dataeditoruno = null
    let dataeditordos = null
    let dataeditortres = null
    let dataeditorcuatro = null
    let dataeditorcinco = null

    useEffect (() => {
        dispatch(productosdata(productosConstants(location.pathname.split ('/')[4], 0, 0, 0, {}, false).get_producto))
    }, [])

    useEffect(() => {
        if (get_producto && get_producto.success === true && get_producto.producto){
            setIdProveedor(get_producto.producto.id_proveedor)
            setProveedor(get_producto.producto.proveedor)
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
            setCantidad(get_producto.producto.cantidad)
            setMostrar(get_producto.producto.mostrar)
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, {}, false).get_proveedores))
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

    const set_editor_ref_uno = editor => {
      dataeditoruno = editor
    }

    const set_editor_ref_dos = editor => {
      dataeditordos = editor
    }

    const set_editor_ref_tres = editor => {
      dataeditortres = editor
    }

    const set_editor_ref_cuatro = editor => {
      dataeditorcuatro = editor
    }

    const set_editor_ref_cinco = editor => {
      dataeditorcinco = editor
    }

    const handle_editar_picture_uno = (e) => {
        const fileInput = document.getElementById('foto-producto-uno')
        fileInput.click() 
    }

    const handle_editar_picture_dos = (e) => {
        const fileInput = document.getElementById('foto-producto-dos')
        fileInput.click() 
    }

    const handle_editar_picture_tres = (e) => {
        const fileInput = document.getElementById('foto-producto-tres')
        fileInput.click() 
    }

    const handle_editar_picture_cuatro = (e) => {
        const fileInput = document.getElementById('foto-producto-cuatro')
        fileInput.click() 
    }

    const handle_editar_picture_cinco = (e) => {
        const fileInput = document.getElementById('foto-producto-cinco')
        fileInput.click() 
    }

    const handle_image_change_uno = (e) => {
        const image = e.target.files[0]
        setFotoUno (image)
    }

    const handle_image_change_dos = (e) => {
        const image = e.target.files[0]
        setFotoDos (image)
    }

    const handle_image_change_tres = (e) => {
        const image = e.target.files[0]
        setFotoTres (image)
    }

    const handle_image_change_cuatro = (e) => {
        const image = e.target.files[0]
        setFotoCuatro (image)
    }

    const handle_image_change_cinco = (e) => {
        const image = e.target.files[0]
        setFotoCinco (image)
    }

    const actualizar_producto = () => {
        if (foto_uno === '' || nombre_producto === '' || descripcion === ''){
            setEFotoUno(foto_uno === '' ? true : false)
            setENombreProducto(nombre_producto === '' ? true : false)
            setEDescripcion(edescripcion === '' ? true : false)
        }else{
            const update_data = {
                id_proveedor: id_proveedor,
                proveedor: proveedor,
                foto_uno: dataeditoruno === null ? '' : dataeditoruno.getImageScaledToCanvas().toDataURL(),
                foto_dos: dataeditordos === null ? '' : dataeditordos.getImageScaledToCanvas().toDataURL(),
                foto_tres: dataeditortres === null ? '' : dataeditortres.getImageScaledToCanvas().toDataURL(),
                foto_cuatro: dataeditorcuatro === null ? '' : dataeditorcuatro.getImageScaledToCanvas().toDataURL(),
                foto_cinco: dataeditorcinco === null ? '' : dataeditorcinco.getImageScaledToCanvas().toDataURL(),
                producto: nombre_producto,
                descripcion: descripcion,
                caracteristica_uno: caracteristica_uno,
                caracteristica_dos: caracteristica_dos,
                caracteristica_tres: caracteristica_tres,
                caracteristica_cuatro: caracteristica_cuatro,
                caracteristica_cinco: caracteristica_cinco,
                cantidad: cantidad,
                mostrar: true
            }
            console.log (update_data)
            dispatch(productosdata(productosConstants(location.pathname.split ('/')[4], 0, 0, 0, update_data, false).update_producto))
        }
    }

    return (
        <div className='position-relative' 
            style={{width: '100%', paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: 459 / proporcional, height: 262 / proporcional, marginBottom: 50 / proporcional}}>
                <div style={{width: 262 / proporcional, height: 262 / proporcional, border: efoto_uno ? '1px solid red' : 'none'}}>
                    {
                        foto_uno === '' ? ( 
                            <div className='position-relative' 
                                style={{width: 260 / proporcional, height: 260 / proporcional}}>
                                <div style={{width: 260 / proporcional, height: 260 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                <div id='imagen' className='position-absolute translate-middle' type='button' onClick={editar ? () => handle_editar_picture_uno() : null}
                                    style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                    <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                    < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                        id='foto-producto-uno' onChange={editar ? (event) => handle_image_change_uno(event) : null} />
                                </div>
                            </div>
                        ) : (
                            <div className='position-relative' 
                                style={{width: 260 / proporcional, height: 260 / proporcional}}>
                                <AvatarEditor
                                    width={260 / proporcional}
                                    height={260 / proporcional}
                                    image={foto_uno}
                                    color={[255, 255, 255, 0]}
                                    borderRadius={parseFloat(4)}
                                    scale={1.0}
                                    ref={(editor) => set_editor_ref_uno(editor)}/>
                                <div id='imagen' className='position-absolute translate-middle' type='button' onClick={editar ? () => handle_editar_picture_uno() : null}
                                    style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                    <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                    < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                        id='foto-producto-uno' onChange={editar ? (event) => handle_image_change_uno(event) : null} />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div style={{with: 459 / proporcional, height: 'auto'}}>
                <div className='d-flex justify-content-end' style={{width: 459 / proporcional, marginBottom: 12.5 / proporcional}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 219.5   / proporcional, height: 50 / proporcional, border: '1px solid #B2DFDB', marginRight: 5 / proporcional,
                                                    borderRadius: 4 / proporcional, marginLeft: 5 / proporcional}}>
                        <select
                            disabled={!editar}
                            style={{fontFamily: 'Mukta, sans-serif', width: 217.5 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            className='form-select border-0 '
                            onChange={(event) => {setIdProveedor(event.target.value)}}
                            id='id_proveedor'>
                            <option value='0'>{id_proveedor === '' ? 'Seleccionar' : proveedor}</option>
                            {
                                lista_proveedores && lista_proveedores.length > 0 ? (
                                    lista_proveedores.map ((proveedor, index) => {
                                        return (
                                            <option value={proveedor.id}>{proveedor.proveedor}</option>
                                        )
                                    })
                                ) : null
                            }
                        </select>
                    </div>
                </div>
                <div className='d-flex shadow-sm bg-white rounded' 
                    style={{width: 459 / proporcional, height: 50 / proporcional, border: enombre_producto ? '1px solid red' : '1px solid #B2DFDB', 
                                                borderRadius: 4 / proporcional, marginBottom: 12.5 / proporcional}}>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 200 / proporcional, height: 48 / proporcional, fontSize: 16 / proporcional, 
                                lineHeight: `${48 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                    Nombre producto (*):
                    </p>
                    <input type='text'
                            disabled={!editar}
                        style={{fontFamily: 'Mukta, sans-serif', width: 249 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                }}
                        className='form-control border-0 '
                        value={nombre_producto}
                        onChange={(event) => {setNombreProducto(event.target.value)}}
                        id='nombre_producto'
                        placeholder='E.j. Lija'/>
                </div>
                <div style={{width: 459 / proporcional, height: 152 / proporcional, marginBottom: 5 / proporcional}}>
                    <div className='shadow-sm bg-white rounded' style={{width: 459 / proporcional, height: 134 / proporcional, 
                                            border: edescripcion ? '1px solid red' : '1px solid #B2DFDB', 
                                            borderRadius: 4 / proporcional}}>
                        <textarea
                            disabled={!editar}
                            type='text'
                            rows={3}
                            id='descripcion'
                            aria-label='descripcion'
                            style={{fontFamily: 'Mukta, sans-serif', width: 455 / proporcional, height: 132 / proporcional, fontSize: 18 / proporcional, lineHeight: `${18 / proporcional}px`, fontWeight: 500, color: '#212121'}}
                            className='form-control border-0 '
                            placeholder='Descripción del proveedor (*)'
                            onChange={(event) => {setDescripcion(event.target.value); setCountDescripcion(descripcion.length - 1);}}
                            value={descripcion.slice(0, 500)}
                            />
                    </div>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 459 / proporcional, paddingTop: 2 / proporcional, fontSize: 12 / proporcional, 
                                lineHeight: `${18 / proporcional}px`, color: count_descripcion >= 0 ? '#757575' : 'red', fontWeight: 500, cursor: 'default', textAlign: 'end'}} className='mb-0'>
                        {500 - count_descripcion}
                    </p>
                </div>
                <div className='d-flex' 
                    style={{width: 459 / proporcional, height: 50 / proporcional, marginBottom: 25 / proporcional}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 219.5   / proporcional, height: 50 / proporcional, border: '1px solid #B2DFDB', 
                                                    borderRadius: 4 / proporcional, marginRight: 10 / proporcional}}>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: 80 / proporcional, height: 48 / proporcional, fontSize: 16 / proporcional, 
                                    lineHeight: `${48 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                        Cantidad:
                        </p>
                        <input type='number'
                                disabled={!editar}
                            style={{fontFamily: 'Mukta, sans-serif', width: 129.5 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            className='form-control border-0 '
                            value={cantidad}
                            onChange={(event) => {setCantidad(event.target.value)}}
                            id='cantidad'
                            placeholder='0'/>
                    </div>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 219.5   / proporcional, height: 50 / proporcional, border: '1px solid #B2DFDB',
                                                    borderRadius: 4 / proporcional, marginLeft: 10 / proporcional}}>
                        <select
                                disabled={!editar}
                            style={{fontFamily: 'Mukta, sans-serif', width: 217.5 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
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
                </div>
                <div className='d-flex justify-content-end' 
                    style={{width: 459 / proporcional, height: 50 / proporcional, marginBottom: 12.5 / proporcional}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 219.5 / proporcional, height: 50 / proporcional, borderRadius: 4 / proporcional, marginLeft: 10 / proporcional}}>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: 50 / proporcional, height: 50 / proporcional, fontSize: 16 / proporcional, 
                                    lineHeight: `${50 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                        {`${mostrar ? 'ON' : 'OFF'}`}:
                        </p>
                        <div className='d-flex justify-content-center' style={{width: 159.5 / proporcional, height: 32 / proporcional, marginTop: 9 / proporcional,
                                marginBottom: 9 / proporcional}}>
                            <img src={!mostrar ? icono_toggle_on : icono_toggle_off} style={{width: 32 / proporcional, height: 32 / proporcional, 
                                    cursor: 'pointer'}}
                                onClick={editar ? () => setMostrar(!mostrar) : null}/>
                        </div>
                    </div>
                </div>
                <div style={{width: 459 / proporcional, height: 'auto', marginBottom: 25 / proporcional}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 459 / proporcional, height: 100 / proporcional, border: '1px solid #B2DFDB',
                                                    borderRadius: 4 / proporcional}}>
                        <textarea 
                                disabled={!editar}
                            style={{fontFamily: 'Mukta, sans-serif', width: 455 / proporcional, height: 98 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            cols={2}
                            className='form-control border-0 '
                            value={caracteristica_uno}
                            onChange={(event) => {setCaracteristicaUno(event.target.value); setCountCaracteristicaUno(count_caracteristica_uno.length -1)}}
                            id='caracteristica_uno'
                            placeholder='Característica uno'/>
                    </div>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 459 / proporcional, paddingTop: 2 / proporcional, fontSize: 12 / proporcional, 
                                lineHeight: `${18 / proporcional}px`, color: count_caracteristica_uno >= 0 ? '#757575' : 'red', fontWeight: 500, cursor: 'default', textAlign: 'end'}} className='mb-0'>
                        {500 - count_caracteristica_uno}
                    </p>
                </div>
                <div style={{width: 459 / proporcional, height: 'auto', marginBottom: 25 / proporcional}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 459 / proporcional, height: 100 / proporcional, border: '1px solid #B2DFDB',
                                                    borderRadius: 4 / proporcional}}>
                        <textarea 
                                disabled={!editar}
                            style={{fontFamily: 'Mukta, sans-serif', width: 455 / proporcional, height: 98 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            cols={2}
                            className='form-control border-0 '
                            value={caracteristica_dos}
                            onChange={(event) => {setCaracteristicaDos(event.target.value); setCaracteristicaDos(count_caracteristica_dos.length -1)}}
                            id='caracteristica_dos'
                            placeholder='Característica dos'/>
                    </div>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 459 / proporcional, paddingTop: 2 / proporcional, fontSize: 12 / proporcional, 
                                lineHeight: `${18 / proporcional}px`, color: count_caracteristica_uno >= 0 ? '#757575' : 'red', fontWeight: 500, cursor: 'default', textAlign: 'end'}} className='mb-0'>
                        {500 - count_caracteristica_dos}
                    </p>
                </div>
                <div style={{width: 459 / proporcional, height: 'auto', marginBottom: 25 / proporcional}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 459 / proporcional, height: 100 / proporcional, border: '1px solid #B2DFDB',
                                                    borderRadius: 4 / proporcional}}>
                        <textarea 
                                disabled={!editar}
                            style={{fontFamily: 'Mukta, sans-serif', width: 455 / proporcional, height: 98 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            cols={2}
                            className='form-control border-0 '
                            value={caracteristica_tres}
                            onChange={(event) => {setCaracteristicaTres(event.target.value); setCaracteristicaTres(count_caracteristica_tres.length -1)}}
                            id='caracteristica_tres'
                            placeholder='Característica tres'/>
                    </div>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 459 / proporcional, paddingTop: 2 / proporcional, fontSize: 12 / proporcional, 
                                lineHeight: `${18 / proporcional}px`, color: count_caracteristica_uno >= 0 ? '#757575' : 'red', fontWeight: 500, cursor: 'default', textAlign: 'end'}} className='mb-0'>
                        {500 - count_caracteristica_tres}
                    </p>
                </div>
                <div style={{width: 459 / proporcional, height: 'auto', marginBottom: 25 / proporcional}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 459 / proporcional, height: 100 / proporcional, border: '1px solid #B2DFDB',
                                                    borderRadius: 4 / proporcional}}>
                        <textarea 
                                disabled={!editar}
                            style={{fontFamily: 'Mukta, sans-serif', width: 455 / proporcional, height: 98 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            cols={2}
                            className='form-control border-0 '
                            value={caracteristica_cuatro}
                            onChange={(event) => {setCaracteristicaCuatro(event.target.value); setCaracteristicaCuatro(count_caracteristica_cuatro.length -1)}}
                            id='caracteristica_cuatro'
                            placeholder='Característica cuatro'/>
                    </div>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 459 / proporcional, paddingTop: 2 / proporcional, fontSize: 12 / proporcional, 
                                lineHeight: `${18 / proporcional}px`, color: count_caracteristica_uno >= 0 ? '#757575' : 'red', fontWeight: 500, cursor: 'default', textAlign: 'end'}} className='mb-0'>
                        {500 - count_caracteristica_cuatro}
                    </p>
                </div>
                <div style={{width: 459 / proporcional, height: 'auto', marginBottom: 25 / proporcional}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 459 / proporcional, height: 100 / proporcional, border: '1px solid #B2DFDB',
                                                    borderRadius: 4 / proporcional}}>
                        <textarea 
                                disabled={!editar}
                            style={{fontFamily: 'Mukta, sans-serif', width: 455 / proporcional, height: 98 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            cols={2}
                            className='form-control border-0 '
                            value={caracteristica_cinco}
                            onChange={(event) => {setCaracteristicaCinco(event.target.value); setCaracteristicaCinco(count_caracteristica_cinco.length -1)}}
                            id='caracteristica_cinco'
                            placeholder='Característica cinco'/>
                    </div>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 459 / proporcional, paddingTop: 2 / proporcional, fontSize: 12 / proporcional, 
                                lineHeight: `${18 / proporcional}px`, color: count_caracteristica_uno >= 0 ? '#757575' : 'red', fontWeight: 500, cursor: 'default', textAlign: 'end'}} className='mb-0'>
                        {500 - count_caracteristica_cinco}
                    </p>
                    
                </div>
                <div className='d-flex' style={{width: 459 / proporcional, marginBottom: 50 / proporcional}}>
                    <div style={{width: 219.5 / proporcional, height: 219.5 / proporcional, border: efoto_uno ? '1px solid red' : 'none', marginRight: 10 / proporcional}}>
                        {
                            foto_dos === '' ? ( 
                                <div className='position-relative' 
                                    style={{width: 217.5 / proporcional, height: 217.5 / proporcional, marginRight: 25 / proporcional}}>
                                    <div style={{width: 217.5 / proporcional, height: 217.5 / proporcional, background: '#bdbdbd', marginRight: 25 / proporcional, borderRadius: 4 / proporcional}}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={editar ? () => handle_editar_picture_dos() : null}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-dos' onChange={editar ? (event) => handle_image_change_dos(event) : null} />
                                    </div>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: 217.5 / proporcional, height: 217.5 / proporcional, marginRight: 25 / proporcional}}>
                                    <AvatarEditor
                                        width={217.5 / proporcional}
                                        height={217.5 / proporcional}
                                        image={foto_dos}
                                        color={[255, 255, 255, 0]}
                                        borderRadius={parseFloat(4)}
                                        scale={1.0}
                                        ref={(editor) => set_editor_ref_dos(editor)}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={editar ? () => handle_editar_picture_dos() : null}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-dos' onChange={editar ? (event) => handle_image_change_dos(event) : null} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div style={{width: 219.5 / proporcional, height: 219.5 / proporcional, border: efoto_uno ? '1px solid red' : 'none', marginLeft: 5 / proporcional, marginRight: 5 / proporcional}}>
                        {
                            foto_tres === '' ? ( 
                                <div className='position-relative' 
                                    style={{width: 217.5 / proporcional, height: 217.5 / proporcional, marginRight: 25 / proporcional}}>
                                    <div style={{width: 217.5 / proporcional, height: 217.5 / proporcional, background: '#bdbdbd', marginRight: 25 / proporcional, borderRadius: 4 / proporcional}}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={editar ? () => handle_editar_picture_tres() : null}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-tres' onChange={editar ? (event) => handle_image_change_tres(event) : null} />
                                    </div>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: 217.5 / proporcional, height: 217.5 / proporcional, marginRight: 25 / proporcional}}>
                                    <AvatarEditor
                                        width={217.5 / proporcional}
                                        height={217.5 / proporcional}
                                        image={foto_tres}
                                        color={[255, 255, 255, 0]}
                                        borderRadius={parseFloat(4)}
                                        scale={1.0}
                                        ref={(editor) => set_editor_ref_tres(editor)}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={editar ? () => handle_editar_picture_tres() : null}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-tres' onChange={editar ? (event) => handle_image_change_tres(event) : null} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='d-flex' style={{width: 459 / proporcional}}>
                    <div style={{width: 219.5 / proporcional, height: 219.5 / proporcional, border: efoto_uno ? '1px solid red' : 'none', marginLeft: 5 / proporcional, marginRight: 5 / proporcional}}>
                        {
                            foto_cuatro === '' ? ( 
                                <div className='position-relative' 
                                    style={{width: 217.5 / proporcional, height: 217.5 / proporcional, marginRight: 25 / proporcional}}>
                                    <div style={{width: 217.5 / proporcional, height: 217.5 / proporcional, background: '#bdbdbd', marginRight: 25 / proporcional, borderRadius: 4 / proporcional}}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={editar ? () => handle_editar_picture_cuatro() : null}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-cuatro' onChange={editar ? (event) => handle_image_change_cuatro(event) : null} />
                                    </div>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: 217.5 / proporcional, height: 217.5 / proporcional, marginRight: 25 / proporcional}}>
                                    <AvatarEditor
                                        width={217.5 / proporcional}
                                        height={217.5 / proporcional}
                                        image={foto_cuatro}
                                        color={[255, 255, 255, 0]}
                                        borderRadius={parseFloat(4)}
                                        scale={1.0}
                                        ref={(editor) => set_editor_ref_cuatro(editor)}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={editar ? () => handle_editar_picture_cuatro() : null}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-cuatro' onChange={editar ? (event) => handle_image_change_cuatro(event) : null} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div style={{width: 219.5 / proporcional, height: 219.5 / proporcional, border: efoto_uno ? '1px solid red' : 'none', marginLeft: 10 / proporcional}}>
                        {
                            foto_cinco === '' ? ( 
                                <div className='position-relative' 
                                    style={{width: 217.5 / proporcional, height: 217.5 / proporcional, marginRight: 25 / proporcional}}>
                                    <div style={{width: 217.5 / proporcional, height: 217.5 / proporcional, background: '#bdbdbd', marginRight: 25 / proporcional, borderRadius: 4 / proporcional}}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={editar ? () => handle_editar_picture_cinco() : null}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-cinco' onChange={editar ? (event) => handle_image_change_cinco(event) : null} />
                                    </div>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: 217.5 / proporcional, height: 217.5 / proporcional, marginRight: 25 / proporcional}}>
                                    <AvatarEditor
                                        width={217.5 / proporcional}
                                        height={217.5 / proporcional}
                                        image={foto_cinco}
                                        color={[255, 255, 255, 0]}
                                        borderRadius={parseFloat(4)}
                                        scale={1.0}
                                        ref={(editor) => set_editor_ref_cinco(editor)}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={editar ? () => handle_editar_picture_cinco() : null}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-cinco' onChange={editar ? (event) => handle_image_change_cinco(event) : null} />
                                    </div>
                                </div>
                            )
                        }
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
