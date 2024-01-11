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

export default function NuevoProductoCell({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

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
    const [caracteristicas_uno, setCaracteristicasUno] = useState('')
    const [caracteristicas_dos, setCaracteristicasDos] = useState('')
    const [caracteristicas_tres, setCaracteristicasTres] = useState('')
    const [caracteristicas_cuatro, setCaracteristicasCuatro] = useState('')
    const [caracteristicas_cinco, setCaracteristicasCinco] = useState('')
    const [count_descripcion, setCountDescripcion] = useState(500)
    const [count_caracteristica_uno, setCountCaracteristicaUno] = useState(500)
    const [count_caracteristica_dos, setCountCaracteristicaDos] = useState(500)
    const [count_caracteristica_tres, setCountCaracteristicaTres] = useState(500)
    const [count_caracteristica_cuatro, setCountCaracteristicaCuatro] = useState(500)
    const [count_caracteristica_cinco, setCountCaracteristicaCinco] = useState(500)
    const [cantidad, setCantidad] = useState('')
    const [medida, setMedida] = useState(true)
    const [mostrar, setMostrar] = useState(true)
    
    const [efoto_uno, setEFotoUno] = useState('')
    const [enombre_producto, setENombreProveedor] = useState('')
    const [edescripcion, setEDescripcion] = useState('')
    const [ecantidad, setECantidad] = useState('')

    const {new_producto} = useSelector(({productos}) => productos)
    const {get_proveedores} = useSelector(({proveedores}) => proveedores)
    const {open_menu_derecho} = useSelector(({data}) => data)

    let dataeditoruno = null
    let dataeditordos = null
    let dataeditortres = null
    let dataeditorcuatro = null
    let dataeditorcinco = null

    useEffect (() => {
        dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, {}, false).get_proveedores))
    }, [])

    useEffect (() => {
        if (get_proveedores && get_proveedores.success === true && get_proveedores.proveedores){
            setListaProveedores(get_proveedores.proveedores)
        }
    }, [get_proveedores])

    useEffect (() => {
        if (new_producto && new_producto.success === true && new_producto.producto){
            dispatch(productosdata(productosConstants(0, 0, 0, 0, {}, true).new_producto))
            navigate(`/home/productos/detalles-producto/${new_producto.producto.id}`)
        }
    }, [new_producto])

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

    const guardar_producto = () => {
        if (nombre_producto === ''){
            setENombreProducto(nombre_producto === '' ? true : false)
        }else{
            const nuevo_producto = {
                id_proveedor: id_proveedor,
                foto_uno: dataeditoruno === null ? '' : dataeditoruno.getImageScaledToCanvas().toDataURL(),
                foto_dos: dataeditordos === null ? '' : dataeditordos.getImageScaledToCanvas().toDataURL(),
                foto_tres: dataeditortres === null ? '' : dataeditortres.getImageScaledToCanvas().toDataURL(),
                foto_cuatro: dataeditorcuatro === null ? '' : dataeditorcuatro.getImageScaledToCanvas().toDataURL(),
                foto_cinco: dataeditorcinco === null ? '' : dataeditorcinco.getImageScaledToCanvas().toDataURL(),
                producto: nombre_producto,
                descripcion: descripcion,
                caracteristica_uno: caracteristicas_uno,
                caracteristica_dos: caracteristicas_dos,
                caracteristica_tres: caracteristicas_tres,
                caracteristica_cuatro: caracteristicas_cuatro,
                caracteristica_cinco: caracteristicas_cinco,
                cantidad: cantidad,
                mostrar: true
            }
            dispatch(productosdata(productosConstants(0, 0, 0, 0, nuevo_producto, false).new_producto))
        }
    }

    return (
        <div className='position-relative' 
            style={{width: '100%', paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: 459 / proporcional, height: 262 / proporcional, marginBottom: 50 / proporcional}}>
                <div style={{width: 262 / proporcional, height: 262 / proporcional, border: efoto_uno ? '1px solid red' : 'none', marginRight: 23 / proporcional}}>
                    {
                        foto_uno === '' ? ( 
                            <div className='position-relative' 
                                style={{width: 260 / proporcional, height: 260 / proporcional, marginRight: 25 / proporcional}}>
                                <div style={{width: 260 / proporcional, height: 260 / proporcional, background: '#bdbdbd', marginRight: 25 / proporcional, borderRadius: 4 / proporcional}}/>
                                <div id='imagen' className='position-absolute translate-middle' type='button' onClick={() => handle_editar_picture_uno()}
                                    style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                    <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                    < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                        id='foto-producto-uno' onChange={(event) => handle_image_change_uno(event)} />
                                </div>
                            </div>
                        ) : (
                            <div className='position-relative' 
                                style={{width: 260 / proporcional, height: 260 / proporcional, marginRight: 25 / proporcional}}>
                                <AvatarEditor
                                    width={260 / proporcional}
                                    height={260 / proporcional}
                                    image={foto_uno}
                                    color={[255, 255, 255, 0]}
                                    borderRadius={parseFloat(4)}
                                    scale={1.0}
                                    ref={(editor) => set_editor_ref_uno(editor)}/>
                                <div id='imagen' className='position-absolute translate-middle' type='button' onClick={() => handle_editar_picture_uno()}
                                    style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                    <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                    < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                        id='foto-producto-uno' onChange={(event) => handle_image_change_uno(event)} />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='d-flex shadow-sm bg-white rounded' 
                style={{width: 459   / proporcional, height: 50 / proporcional, border: '1px solid #B2DFDB', marginRight: 5 / proporcional,
                                            borderRadius: 4 / proporcional, marginBottom: 12.5 / proporcional}}>
                <select
                    style={{fontFamily: 'Mukta, sans-serif', width: 457 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                            }}
                    className='form-select border-0 '
                    onChange={(value) => {setIdProveedor(value)}}
                    id='id_proveedor'>
                    <option value='0'>Seleccionar</option>
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
            <div className='d-flex shadow-sm bg-white rounded' 
                style={{width: 459 / proporcional, height: 50 / proporcional, border: enombre_producto ? '1px solid red' : '1px solid #B2DFDB', 
                                            borderRadius: 4 / proporcional, marginBottom: 12.5 / proporcional}}>
                <p style={{fontFamily: 'Mukta, sans-serif', width: 200 / proporcional, height: 48 / proporcional, fontSize: 16 / proporcional, 
                            lineHeight: `${48 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                Nombre producto (*):
                </p>
                <input type='text'
                    style={{fontFamily: 'Mukta, sans-serif', width: 249 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                            }}
                    className='form-control border-0 '
                    value={nombre_producto}
                    onChange={(event) => {setNombreProducto(event.target.value)}}
                    id='nombre_producto'
                    placeholder='E.j. Lija'/>
            </div>
            <div style={{width: 459 / proporcional, height: 152 / proporcional, marginBottom: 12.5 / proporcional}}>
                <div className='shadow-sm bg-white rounded' style={{width: 459 / proporcional, height: 134 / proporcional, 
                                        border: edescripcion ? '1px solid red' : '1px solid #B2DFDB', 
                                        borderRadius: 4 / proporcional}}>
                    <textarea
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
                style={{width: 459 / proporcional, height: 50 / proporcional, marginBottom: 12.5 / proporcional}}>
                <div className='d-flex shadow-sm bg-white rounded' 
                    style={{width: 219.5   / proporcional, height: 50 / proporcional, border: '1px solid #B2DFDB', 
                                                borderRadius: 4 / proporcional, marginRight: 10 / proporcional}}>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 80 / proporcional, height: 48 / proporcional, fontSize: 16 / proporcional, 
                                lineHeight: `${48 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                    Cantidad:
                    </p>
                    <input type='number'
                        style={{fontFamily: 'Mukta, sans-serif', width: 129.5 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 459, color: '#212121',
                                }}
                        className='form-control border-0 '
                        value={cantidad}
                        onChange={(event) => {setCantidad(event.target.value)}}
                        id='cantidad'
                        placeholder='0'/>
                </div>
                <div className='d-flex shadow-sm bg-white rounded' 
                    style={{width: 219.5   / proporcional, height: 50 / proporcional, border: '1px solid #B2DFDB', marginRight: 5 / proporcional,
                                                borderRadius: 4 / proporcional, marginLeft: 5 / proporcional}}>
                    <select
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
                    style={{width: 219.5 / proporcional, height: 50 / proporcional, 
                                                borderRadius: 4 / proporcional}}>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 50 / proporcional, height: 50 / proporcional, fontSize: 16 / proporcional, 
                                lineHeight: `${50 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                    {`${mostrar ? 'ON' : 'OFF'}`}:
                    </p>
                    <div className='d-flex justify-content-center' style={{width: 159.5 / proporcional, height: 32 / proporcional, marginTop: 9 / proporcional,
                            marginBottom: 9 / proporcional}}>
                        <img src={!mostrar ? icono_toggle_on : icono_toggle_off} style={{width: 32 / proporcional, height: 32 / proporcional, 
                                cursor: 'pointer'}}
                            onClick={() => setMostrar(!mostrar)}/>
                    </div>
                </div>
            </div>
            <div style={{with: 459 / proporcional, height: 'auto'}}>
                <div style={{width: 459 / proporcional, height: 'auto', marginBottom: 25 / proporcional}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 459 / proporcional, height: 100 / proporcional, border: '1px solid #B2DFDB',
                                                    borderRadius: 4 / proporcional}}>
                        <textarea 
                            style={{fontFamily: 'Mukta, sans-serif', width: 457 / proporcional, height: 98 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            cols={2}
                            className='form-control border-0 '
                            value={caracteristicas_uno}
                            onChange={(event) => {setCaracteristicasUno(event.target.value); setCaracteristicaUno(count_caracteristica_uno.length -1)}}
                            id='caracteristicas_uno'
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
                            style={{fontFamily: 'Mukta, sans-serif', width: 457 / proporcional, height: 98 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            cols={2}
                            className='form-control border-0 '
                            value={caracteristicas_dos}
                            onChange={(event) => {setCaracteristicasDos(event.target.value); setCaracteristicaDos(count_caracteristica_dos.length -1)}}
                            id='caracteristicas_dos'
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
                            style={{fontFamily: 'Mukta, sans-serif', width: 457 / proporcional, height: 98 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            cols={2}
                            className='form-control border-0 '
                            value={caracteristicas_tres}
                            onChange={(event) => {setCaracteristicasTres(event.target.value); setCaracteristicaTres(count_caracteristica_tres.length -1)}}
                            id='caracteristicas_tres'
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
                            style={{fontFamily: 'Mukta, sans-serif', width: 457 / proporcional, height: 98 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            cols={2}
                            className='form-control border-0 '
                            value={caracteristicas_cuatro}
                            onChange={(event) => {setCaracteristicasCuatro(event.target.value); setCaracteristicaCuatro(count_caracteristica_cuatro.length -1)}}
                            id='caracteristicas_cuatro'
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
                            style={{fontFamily: 'Mukta, sans-serif', width: 457 / proporcional, height: 98 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            cols={2}
                            className='form-control border-0 '
                            value={caracteristicas_cinco}
                            onChange={(event) => {setCaracteristicasCinco(event.target.value); setCaracteristicaCinco(count_caracteristica_cinco.length -1)}}
                            id='caracteristicas_cinco'
                            placeholder='Característica cinco'/>
                    </div>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 459 / proporcional, paddingTop: 2 / proporcional, fontSize: 12 / proporcional, 
                                lineHeight: `${18 / proporcional}px`, color: count_caracteristica_uno >= 0 ? '#757575' : 'red', fontWeight: 500, cursor: 'default', textAlign: 'end'}} className='mb-0'>
                        {500 - count_caracteristica_cinco}
                    </p>
                    
                </div>
                <div className='d-flex' style={{width: 459 / proporcional, marginBottom: 50 / proporcional}}>
                    <div style={{width: 207 / proporcional, height: 207 / proporcional, border: efoto_uno ? '1px solid red' : 'none', marginRight: 22.5 / proporcional}}>
                        {
                            foto_dos === '' ? ( 
                                <div className='position-relative' 
                                    style={{width: 205 / proporcional, height: 205 / proporcional}}>
                                    <div style={{width: 205 / proporcional, height: 205 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={() => handle_editar_picture_dos()}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-dos' onChange={(event) => handle_image_change_dos(event)} />
                                    </div>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: 205 / proporcional, height: 205 / proporcional}}>
                                    <AvatarEditor
                                        width={205 / proporcional}
                                        height={205 / proporcional}
                                        image={foto_dos}
                                        color={[255, 255, 255, 0]}
                                        borderRadius={parseFloat(4)}
                                        scale={1.0}
                                        ref={(editor) => set_editor_ref_dos(editor)}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={() => handle_editar_picture_dos()}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-dos' onChange={(event) => handle_image_change_dos(event)} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div style={{width: 207 / proporcional, height: 207 / proporcional, border: efoto_uno ? '1px solid red' : 'none', marginLeft: 22.5 / proporcional, marginRight: 5 / proporcional}}>
                        {
                            foto_tres === '' ? ( 
                                <div className='position-relative' 
                                    style={{width: 205 / proporcional, height: 205 / proporcional}}>
                                    <div style={{width: 205 / proporcional, height: 205 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={() => handle_editar_picture_tres()}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-tres' onChange={(event) => handle_image_change_tres(event)} />
                                    </div>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: 205 / proporcional, height: 205 / proporcional}}>
                                    <AvatarEditor
                                        width={205 / proporcional}
                                        height={205 / proporcional}
                                        image={foto_tres}
                                        color={[255, 255, 255, 0]}
                                        borderRadius={parseFloat(4)}
                                        scale={1.0}
                                        ref={(editor) => set_editor_ref_tres(editor)}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={() => handle_editar_picture_tres()}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-tres' onChange={(event) => handle_image_change_tres(event)} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='d-flex' style={{width: 459 / proporcional}}>
                    <div style={{width: 207 / proporcional, height: 207 / proporcional, border: efoto_uno ? '1px solid red' : 'none', marginRight: 22.5 / proporcional}}>
                        {
                            foto_cuatro === '' ? ( 
                                <div className='position-relative' 
                                    style={{width: 205 / proporcional, height: 205 / proporcional}}>
                                    <div style={{width: 205 / proporcional, height: 205 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={() => handle_editar_picture_cuatro()}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-cuatro' onChange={(event) => handle_image_change_cuatro(event)} />
                                    </div>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: 205 / proporcional, height: 205 / proporcional}}>
                                    <AvatarEditor
                                        width={205 / proporcional}
                                        height={205 / proporcional}
                                        image={foto_cuatro}
                                        color={[255, 255, 255, 0]}
                                        borderRadius={parseFloat(4)}
                                        scale={1.0}
                                        ref={(editor) => set_editor_ref_cuatro(editor)}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={() => handle_editar_picture_cuatro()}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-cuatro' onChange={(event) => handle_image_change_cuatro(event)} />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <div style={{width: 207 / proporcional, height: 207 / proporcional, border: efoto_uno ? '1px solid red' : 'none', marginLeft: 22.5 / proporcional}}>
                        {
                            foto_cinco === '' ? ( 
                                <div className='position-relative' 
                                    style={{width: 205 / proporcional, height: 205 / proporcional}}>
                                    <div style={{width: 205 / proporcional, height: 205 / proporcional, background: '#bdbdbd', borderRadius: 4 / proporcional}}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={() => handle_editar_picture_cinco()}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-cinco' onChange={(event) => handle_image_change_cinco(event)} />
                                    </div>
                                </div>
                            ) : (
                                <div className='position-relative' 
                                    style={{width: 205 / proporcional, height: 205 / proporcional}}>
                                    <AvatarEditor
                                        width={205 / proporcional}
                                        height={205 / proporcional}
                                        image={foto_cinco}
                                        color={[255, 255, 255, 0]}
                                        borderRadius={parseFloat(4)}
                                        scale={1.0}
                                        ref={(editor) => set_editor_ref_cinco(editor)}/>
                                    <div id='imagen' className='position-absolute translate-middle' type='button' onClick={() => handle_editar_picture_cinco()}
                                        style={{bottom: -48 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-producto-cinco' onChange={(event) => handle_image_change_cinco(event)} />
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
                            onClick={() => {guardar_producto(); dispatch(set_open_menu_derecho(false))}}>
                            <img src={icono_guardar} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                            <p style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                                Guardar producto
                            </p>
                        </div>
                        <div className='rounded-pill' style={{width: 270 / proporcional, height: 2 / proporcional, background: '#e29022', marginBottom: 10 / proporcional}}/>
                        <div className='d-flex' style={{width: 270 / proporcional, height: 'auto', marginBottom: 10 / proporcional, cursor: 'pointer'}}
                            onClick={() => {dispatch(set_open_menu_derecho(false)); navigate('/home/productos')}}>
                            <img src={icono_volver} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                            <p style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
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
