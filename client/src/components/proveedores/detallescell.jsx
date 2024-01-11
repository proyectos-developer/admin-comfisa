import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AvatarEditor from 'react-avatar-editor'

import icono_add from '../../assets/iconos/icono_add_blue_96.png'
import icono_editar from '../../assets/iconos/icono_editar_blue_96.png'
import icono_cancelar from '../../assets/iconos/icono_cancelar_blue_96.png'
import icono_volver from '../../assets/iconos/icono_volver_blue_96.png'
import icono_actualizar from '../../assets/iconos/icono_actualizar_blue_96.png'
import icono_camera from '../../assets/iconos/icono_camera_blue_96.png'

import { set_open_menu_derecho } from '../../redux/actions/dataactions'
import { useLocation, useNavigate } from 'react-router-dom'
import {proveedoresdata} from '../../redux/slice/proveedoresdata'
import { proveedoresConstants } from '../../uri/proveedores-constatns'

export default function DetallesProveedorTablet({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [foto_logo, setFotoLogo] = useState('')
    const [nombre_proveedor, setNombreProveedor] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [count_descripcion, setCountDescripcion] = useState('')
    const [nro_telefono, setNroTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [correo, setCorreo] = useState('')
    const [nro_ruc, setNroRuc] = useState('')

    const [editar, setEditar] = useState(false)
    
    const [efoto_logo, setEFotoLogo] = useState('')
    const [enombre_proveedor, setENombreProveedor] = useState('')
    const [edescripcion, setEDescripcion] = useState('')
    const [enro_telefono, setENroTelefono] = useState('')
    const [edireccion, setEDireccion] = useState('')
    const [ecorreo, setECorreo] = useState('')
    const [enro_ruc, setENroRuc] = useState('')

    const {get_proveedor, update_proveedor} = useSelector(({proveedores}) => proveedores)
    const {open_menu_derecho} = useSelector(({data}) => data)

    let dataeditor = null

    useEffect(() => {
        dispatch(proveedoresdata(proveedoresConstants(location.pathname.split('/')[4], 0, 0, 0, {}, false).get_proveedor))
    }, [])

    useEffect (() => {
        if (get_proveedor && get_proveedor.success === true && get_proveedor.proveedor){
            setFotoLogo(get_proveedor.proveedor.logo)
            setNombreProveedor(get_proveedor.proveedor.proveedor)
            setNroTelefono(get_proveedor.proveedor.nro_telefono)
            setDireccion(get_proveedor.proveedor.direccion)
            setCorreo(get_proveedor.proveedor.correo)
            setNroRuc(get_proveedor.proveedor.nro_ruc)
            setDescripcion(get_proveedor.proveedor.descripcion)
        }
    }, [get_proveedor])

    useEffect(() => {
        if (update_proveedor && update_proveedor.success === true && update_proveedor.proveedor){
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, {}, true).update_proveedor))
            setEditar(false)
        }
    }, [update_proveedor])

    const set_editor_ref = editor => {
      dataeditor = editor
    }

    const handle_editar_picture = (e) => {
        const fileInput = document.getElementById('foto-proveedor')
        fileInput.click() 
    }

    const handle_image_change = (e) => {
        const image = e.target.files[0]
        setFotoLogo (image)
    }

    const actualizar_proveedor = () => {
        if (foto_logo === '' || nombre_proveedor === '' || descripcion === ''){
            setEFotoLogo(foto_logo === '' ? true : false)
            setENombreProveedor(nombre_proveedor === '' ? true : false)
            setEDescripcion(edescripcion === '' ? true : false)
        }else{
            const update_proveedor = {
                logo: dataeditor === null ? '' : dataeditor.getImageScaledToCanvas().toDataURL(),
                proveedor: nombre_proveedor,
                descripcion: descripcion,
                nro_telefono: nro_telefono,
                direccion: direccion,
                correo: correo,
                nro_ruc: nro_ruc
            }
            dispatch(proveedoresdata(proveedoresConstants(location.pathname.split ('/')[4], 0, 0, 0, update_proveedor, false).update_proveedor))
        }
    }

    return (
        <div className='position-relative' 
            style={{width: '100%', paddingLeft: 20 / proporcional, paddingRight: 20 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='d-flex justify-content-center' style={{width: 459 / proporcional, height: 278 / proporcional, marginBottom: 50 / proporcional}}>
                <div style={{width: 372 / proporcional, height: 280 / proporcional, border: efoto_logo ? '1px solid red' : 'none', marginRight: 23 / proporcional}}>
                        {
                            foto_logo === '' && !editar ? ( 
                                <div className='position-relative' 
                                    style={{width: 370 / proporcional, height: 278 / proporcional, marginRight: 25 / proporcional}}>
                                    <div style={{width: 370 / proporcional, height: 278 / proporcional, background: '#bdbdbd', marginRight: 25 / proporcional, borderRadius: 4 / proporcional}}/>
                                </div>
                            ) : foto_logo !== '' && !editar ? ( 
                                <div className='position-relative' 
                                    style={{width: 370 / proporcional, height: 278 / proporcional, marginRight: 25 / proporcional}}>
                                    <img src={foto_logo} style={{width: 370 / proporcional, height: 278 / proporcional, cursor: 'pointer'}}/>
                                </div>
                            )  : foto_logo === '' && editar ? ( 
                                <div className='position-relative' 
                                    style={{width: 370 / proporcional, height: 278 / proporcional, marginRight: 25 / proporcional}}>
                                    <div style={{width: 370 / proporcional, height: 278 / proporcional, background: '#bdbdbd', marginRight: 25 / proporcional, borderRadius: 4 / proporcional}}/>
                                    <div id='imagen' className='position-absolute start-50 translate-middle' type='button' onClick={() => {editar ? handle_editar_picture() : null}}
                                        style={{bottom: -48 / proporcional, width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-proveedor' onChange={(event) => {editar ? handle_image_change(event) : null}} />
                                    </div>
                                </div>
                            ) : foto_logo !== '' && editar ? (
                                <div className='position-relative' 
                                    style={{width: 370 / proporcional, height: 278 / proporcional, marginRight: 25 / proporcional}}>
                                    <div className='position-absolute' style={{width: 278 / proporcional, height: 236 / proporcional, top: 0 / proporcional, left: -42 / proporcional}}>
                                        <AvatarEditor
                                            width={278 / proporcional}
                                            height={236 / proporcional}
                                            image={foto_logo}
                                            color={[255, 255, 255, 0]}
                                            borderRadius={parseFloat(4)}
                                            scale={1.0}
                                            ref={(editor) => set_editor_ref(editor)}/>
                                    </div>
                                    <div id='imagen' className='position-absolute' type='button' onClick={() => {editar ? handle_editar_picture() : null}}
                                        style={{bottom: -24 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                        <img src={icono_camera} style={{width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                        < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                            id='foto-proveedor' onChange={(event) => {editar ? handle_image_change(event) : null}} />
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
            </div>
            <div style={{with: 459 / proporcional, height: 'auto'}}>
                <div className='d-flex shadow-sm bg-white rounded' 
                    style={{width: 459 / proporcional, height: 50 / proporcional, border: enombre_proveedor ? '1px solid red' : '1px solid #B2DFDB', 
                                                borderRadius: 4 / proporcional, marginBottom: 12.5 / proporcional}}>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 160 / proporcional, height: 48 / proporcional, fontSize: 16 / proporcional, 
                                lineHeight: `${48 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                    Nombre proveedor (*):
                    </p>
                    <input type='text'
                        disabled={!editar}
                        style={{fontFamily: 'Mukta, sans-serif', width: 289 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                }}
                        className='form-control border-0 '
                        value={nombre_proveedor}
                        onChange={(event) => {setNombreProveedor(event.target.value)}}
                        id='nombre_proveedor'
                        placeholder='E.j. Norton'/>
                </div>
                <div style={{width: 459 / proporcional, height: 168 / proporcional, marginBottom: 12.5 / proporcional}}>
                    <div className='shadow-sm bg-white rounded' style={{width: 459 / proporcional, height: 150 / proporcional, border: '1px solid #B2DFDB', 
                                            borderRadius: 4 / proporcional}}>
                        <textarea
                            disabled={!editar}
                            type='text'
                            rows={3}
                            id='descripcion'
                            aria-label='descripcion'
                            style={{fontFamily: 'Mukta, sans-serif', width: 447 / proporcional, height: 148 / proporcional, fontSize: 18 / proporcional, lineHeight: `${18 / proporcional}px`, fontWeight: 500, color: '#212121'}}
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
                <div className='d-flex shadow-sm bg-white rounded' 
                    style={{width: 459 / proporcional, height: 50 / proporcional, border: ecorreo ? '1px solid red' : '1px solid #B2DFDB', 
                                                borderRadius: 4 / proporcional, marginBottom: 12.5 / proporcional}}>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 160 / proporcional, height: 48 / proporcional, fontSize: 16 / proporcional, 
                                lineHeight: `${48 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                    Correo electrónico:
                    </p>
                    <input type='text'
                        disabled={!editar}
                        style={{fontFamily: 'Mukta, sans-serif', width: 289 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                }}
                        className='form-control border-0 '
                        value={correo}
                        onChange={(event) => {setCorreo(event.target.value)}}
                        id='correo'
                        placeholder='E.j. nombre@dominio.com'/>
                </div>
                <div className='d-flex shadow-sm bg-white rounded' 
                    style={{width: 459 / proporcional, height: 50 / proporcional, border: enro_telefono ? '1px solid red' : '1px solid #B2DFDB', 
                                                borderRadius: 4 / proporcional, marginBottom: 12.5 / proporcional}}>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 160 / proporcional, height: 48 / proporcional, fontSize: 16 / proporcional, 
                                lineHeight: `${48 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                    Número de teléfono:
                    </p>
                    <input type='number'
                        disabled={!editar}
                        style={{fontFamily: 'Mukta, sans-serif', width: 289 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                }}
                        className='form-control border-0 '
                        value={nro_telefono}
                        onChange={(event) => {setNroTelefono(event.target.value)}}
                        id='nro_telefono'
                        placeholder='E.j. Norton'/>
                </div>
                <div className='d-flex shadow-sm bg-white rounded' 
                    style={{width: 459 / proporcional, height: 50 / proporcional, border: enro_ruc ? '1px solid red' : '1px solid #B2DFDB', 
                                                borderRadius: 4 / proporcional, marginBottom: 12.5 / proporcional}}>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 160 / proporcional, height: 48 / proporcional, fontSize: 16 / proporcional, 
                                lineHeight: `${48 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                    Número de R.U.C.:
                    </p>
                    <input type='number'
                        disabled={!editar}
                        style={{fontFamily: 'Mukta, sans-serif', width: 289 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                }}
                        className='form-control border-0 '
                        value={nro_ruc}
                        onChange={(event) => {setNroRuc(event.target.value)}}
                        id='nro_ruc'
                        placeholder='E.j. 968xxxxxx'/>
                </div>
                <div className='d-flex shadow-sm bg-white rounded' 
                    style={{width: 459 / proporcional, height: 50 / proporcional, border: edireccion ? '1px solid red' : '1px solid #B2DFDB', 
                                                borderRadius: 4 / proporcional, marginBottom: 12.5 / proporcional}}>
                    <p style={{fontFamily: 'Mukta, sans-serif', width: 160 / proporcional, height: 48 / proporcional, fontSize: 16 / proporcional, 
                                lineHeight: `${48 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                    Dirección:
                    </p>
                    <input type='number'
                        disabled={!editar}
                        style={{fontFamily: 'Mukta, sans-serif', width: 701 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                }}
                        className='form-control border-0 '
                        value={direccion}
                        onChange={(event) => {setDireccion(event.target.value)}}
                        id='direccion'
                        placeholder='E.j. Av. José Pardo 135'/>
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
                                {editar ? 'Cancelar edición' : 'Editar proveedor'}
                            </p>
                        </div>
                        <div className='rounded-pill' style={{width: 270 / proporcional, height: 2 / proporcional, background: '#e29022', marginBottom: 10 / proporcional}}/>
                        {
                            !editar ? (
                                <div style={{width: 270 / proporcional, height: 'auto'}}>
                                    <div className='d-flex' style={{width: 270 / proporcional, height: 'auto', marginBottom: 10 / proporcional, cursor: 'pointer'}}
                                        onClick={() => {navigate ('/home/proveedores/nuevo-proveedor'); dispatch(set_open_menu_derecho(!open_menu_derecho))}}>
                                        <img src={editar ? icono_cancelar : icono_add} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                                        <p style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                                            Nuevo proveedor
                                        </p>
                                    </div>
                                    <div className='rounded-pill' style={{width: 270 / proporcional, height: 2 / proporcional, background: '#e29022', marginBottom: 10 / proporcional}}/>
                                </div>
                            ): null
                        }
                        <div className='d-flex' style={{width: 270 / proporcional, height: 'auto', marginBottom: 10 / proporcional, cursor: 'pointer'}}
                            onClick={editar ? () => {dispatch(set_open_menu_derecho(false)); actualizar_proveedor ()} :
                                              () => {navigate('/home/proveedores'); dispatch(set_open_menu_derecho(false))}}>
                            <img src={editar ? icono_actualizar : icono_volver} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                            <p style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                                {editar ? 'Actualizar proveedor' : 'Volver proveedores'}
                            </p>
                        </div>
                        <div className='rounded-pill' style={{width: 270 / proporcional, height: 2 / proporcional, background: '#e29022', marginBottom: 10 / proporcional}}/>
                    </div>
                ) : null
            }
        </div>
  )
}
