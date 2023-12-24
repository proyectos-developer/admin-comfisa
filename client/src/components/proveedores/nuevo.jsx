import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AvatarEditor from 'react-avatar-editor'

import icono_guardar from '../../assets/iconos/icono_guardar_blue_96.png'
import icono_volver from '../../assets/iconos/icono_volver_blue_96.png'
import icono_camera from '../../assets/iconos/icono_camera_blue_96.png'

import { set_open_menu_derecho } from '../../redux/actions/dataactions'
import { useNavigate } from 'react-router-dom'
import {proveedoresdata} from '../../redux/slice/proveedoresdata'
import { proveedoresConstants } from '../../uri/proveedores-constatns'

export default function NuevoProveedor({proporcional}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [foto_logo, setFotoLogo] = useState('')
    const [nombre_proveedor, setNombreProveedor] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [count_descripcion, setCountDescripcion] = useState('')
    const [nro_telefono, setNroTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [correo, setCorreo] = useState('')
    const [nro_ruc, setNroRuc] = useState('')
    
    const [efoto_logo, setEFotoLogo] = useState('')
    const [enombre_proveedor, setENombreProveedor] = useState('')
    const [edescripcion, setEDescripcion] = useState('')
    const [enro_telefono, setENroTelefono] = useState('')
    const [edireccion, setEDireccion] = useState('')
    const [ecorreo, setECorreo] = useState('')
    const [enro_ruc, setENroRuc] = useState('')

    const {new_proveedor} = useSelector(({proveedores}) => proveedores)
    const {open_menu_derecho} = useSelector(({data}) => data)

    let dataeditor = null

    useEffect (() => {
        console.log (new_proveedor)
        if (new_proveedor && new_proveedor.success === true && new_proveedor.proveedor){
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, {}, true).new_proveedor))
            navigate(`/home/proveedores/detalles-proveedor/${new_proveedor.proveedor.id}`)
        }
    }, [new_proveedor])

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

    const guardar_proveedor = () => {
        if (foto_logo === '' || nombre_proveedor === '' || descripcion === ''){
            setEFotoLogo(foto_logo === '' ? true : false)
            setENombreProveedor(nombre_proveedor === '' ? true : false)
            setEDescripcion(edescripcion === '' ? true : false)
        }else{
            const nuevo_proveedor = {
                logo: dataeditor === null ? '' : dataeditor.getImageScaledToCanvas().toDataURL(),
                proveedor: nombre_proveedor,
                descripcion: descripcion,
                nro_telefono: nro_telefono,
                direccion: direccion,
                correo: correo,
                nro_ruc: nro_ruc
            }
            dispatch(proveedoresdata(proveedoresConstants(0, 0, 0, 0, nuevo_proveedor, false).new_proveedor))
        }
    }

    return (
        <div className='position-relative' 
            style={{width: '100%', paddingLeft: 500 / proporcional, paddingRight: 500 / proporcional, paddingTop: 50 / proporcional, paddingBottom: 50 / proporcional}}>
            <div className='d-flex' style={{width: 920 / proporcional, height: 278 / proporcional, marginBottom: 50 / proporcional}}>
                <div style={{width: 372 / proporcional, height: 280 / proporcional, border: efoto_logo ? '1px solid red' : 'none', marginRight: 23 / proporcional}}>
                    {
                        foto_logo === '' ? ( 
                            <div className='position-relative' 
                                style={{width: 370 / proporcional, height: 278 / proporcional, marginRight: 25 / proporcional}}>
                                <div style={{width: 370 / proporcional, height: 278 / proporcional, background: '#bdbdbd', marginRight: 25 / proporcional, borderRadius: 4 / proporcional}}/>
                                <div id='imagen' className='position-absolute' type='button' onClick={() => handle_editar_picture()}
                                    style={{bottom: -24 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                    <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                    < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                        id='foto-proveedor' onChange={(event) => handle_image_change(event)} />
                                </div>
                            </div>
                        ) : (
                            <div className='position-relative' 
                                style={{width: 370 / proporcional, height: 278 / proporcional, marginRight: 25 / proporcional}}>
                                <AvatarEditor
                                    width={370 / proporcional}
                                    height={278 / proporcional}
                                    image={foto_logo}
                                    color={[255, 255, 255, 0]}
                                    borderRadius={parseFloat(4)}
                                    scale={1.0}
                                    ref={(editor) => set_editor_ref(editor)}/>
                                <div id='imagen' className='position-absolute' type='button' onClick={() => handle_editar_picture()}
                                    style={{bottom: -24 / proporcional, left: '50%', width: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}>
                                    <img src={icono_camera} style={{wigth: 48 / proporcional, height: 48 / proporcional, cursor: 'pointer'}}/>
                                    < input href='#' hidden='hidden' className='btn' type='file' accept='.gif, .jpg, .jpeg, .png'
                                        id='foto-proveedor' onChange={(event) => handle_image_change(event)} />
                                </div>
                            </div>
                        )
                    }
                </div>
                <div style={{width: 500 / proporcional, height: 50 / proporcional, marginLeft: 25 / proporcional}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 500 / proporcional, height: 50 / proporcional, border: enombre_proveedor ? '1px solid red' : '1px solid #B2DFDB', 
                                                    borderRadius: 4 / proporcional, marginBottom: 5 / proporcional}}>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: 200 / proporcional, height: 48 / proporcional, fontSize: 16 / proporcional, 
                                    lineHeight: `${48 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                        Nombre proveedor (*):
                        </p>
                        <input type='text'
                            style={{fontFamily: 'Mukta, sans-serif', width: 290 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            className='form-control border-0 '
                            value={nombre_proveedor}
                            onChange={(event) => {setNombreProveedor(event.target.value)}}
                            id='nombre_proveedor'
                            placeholder='E.j. Norton'/>
                    </div>
                    <div style={{width: 500 / proporcional, height: 168 / proporcional, marginBottom: 5 / proporcional}}>
                        <div className='shadow-sm bg-white rounded' style={{width: 500 / proporcional, height: 150 / proporcional, border: '1px solid #B2DFDB', 
                                                borderRadius: 4 / proporcional}}>
                            <textarea
                                type='text'
                                rows={3}
                                id='descripcion'
                                aria-label='descripcion'
                                style={{fontFamily: 'Mukta, sans-serif', width: 498 / proporcional, height: 148 / proporcional, fontSize: 18 / proporcional, lineHeight: `${18 / proporcional}px`, fontWeight: 500, color: '#212121'}}
                                className='form-control border-0 '
                                placeholder='Descripción del proveedor (*)'
                                onChange={(event) => {setDescripcion(event.target.value); setCountDescripcion(descripcion.length - 1);}}
                                value={descripcion.slice(0, 500)}
                                />
                        </div>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: 500 / proporcional, paddingTop: 2 / proporcional, fontSize: 12 / proporcional, 
                                    lineHeight: `${18 / proporcional}px`, color: count_descripcion >= 0 ? '#757575' : 'red', fontWeight: 500, cursor: 'default', textAlign: 'end'}} className='mb-0'>
                            {500 - count_descripcion}
                        </p>
                    </div>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 500 / proporcional, height: 50 / proporcional, border: ecorreo ? '1px solid red' : '1px solid #B2DFDB', 
                                                    borderRadius: 4 / proporcional}}>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: 200 / proporcional, height: 48 / proporcional, fontSize: 16 / proporcional, 
                                    lineHeight: `${48 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                        Correo electrónico:
                        </p>
                        <input type='text'
                            style={{fontFamily: 'Mukta, sans-serif', width: 290 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            className='form-control border-0 '
                            value={correo}
                            onChange={(event) => {setCorreo(event.target.value)}}
                            id='correo'
                            placeholder='E.j. nombre@dominio.com'/>
                    </div>
                </div>
            </div>
            <div style={{with: 920 / proporcional, height: 50 / proporcional}}>
                <div className='d-flex' style={{with: 920 / proporcional, height: 50 / proporcional, marginBottom: 20 / proporcional}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 450 / proporcional, height: 50 / proporcional, border: enro_telefono ? '1px solid red' : '1px solid #B2DFDB', 
                                                    borderRadius: 4 / proporcional, marginRight: 10 / proporcional}}>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: 200 / proporcional, height: 48 / proporcional, fontSize: 16 / proporcional, 
                                    lineHeight: `${48 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                        Número de teléfono:
                        </p>
                        <input type='number'
                            style={{fontFamily: 'Mukta, sans-serif', width: 250 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            className='form-control border-0 '
                            value={nro_telefono}
                            onChange={(event) => {setNroTelefono(event.target.value)}}
                            id='nro_telefono'
                            placeholder='E.j. Norton'/>
                    </div>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 450 / proporcional, height: 50 / proporcional, border: enro_ruc ? '1px solid red' : '1px solid #B2DFDB', 
                                                    borderRadius: 4 / proporcional, marginLeft: 10 / proporcional}}>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: 200 / proporcional, height: 48 / proporcional, fontSize: 16 / proporcional, 
                                    lineHeight: `${48 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                        Número de R.U.C.:
                        </p>
                        <input type='number'
                            style={{fontFamily: 'Mukta, sans-serif', width: 250 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            className='form-control border-0 '
                            value={nro_ruc}
                            onChange={(event) => {setNroRuc(event.target.value)}}
                            id='nro_ruc'
                            placeholder='E.j. 968xxxxxx'/>
                    </div>
                </div>
                <div className='' style={{with: 920 / proporcional, height: 50 / proporcional}}>
                    <div className='d-flex shadow-sm bg-white rounded' 
                        style={{width: 920 / proporcional, height: 50 / proporcional, border: edireccion ? '1px solid red' : '1px solid #B2DFDB', 
                                                    borderRadius: 4 / proporcional, marginRight: 10 / proporcional}}>
                        <p style={{fontFamily: 'Mukta, sans-serif', width: 200 / proporcional, height: 48 / proporcional, fontSize: 16 / proporcional, 
                                    lineHeight: `${48 / proporcional}px`, color: '#757575', marginLeft: 10 / proporcional, fontWeight: 600, cursor: 'default'}} className='mb-0'>
                                        Dirección:
                        </p>
                        <input type='number'
                            style={{fontFamily: 'Mukta, sans-serif', width: 710 / proporcional, height: 46 / proporcional, fontSize: 18 / proporcional, lineHeight: `${46 / proporcional}px`, fontWeight: 500, color: '#212121',
                                    }}
                            className='form-control border-0 '
                            value={direccion}
                            onChange={(event) => {setDireccion(event.target.value)}}
                            id='direccion'
                            placeholder='E.j. Av. José Pardo 135'/>
                    </div>
                </div>
            </div>
            {
                open_menu_derecho ? ( 
                    <div className='position-absolute shadow rounded' 
                            style={{width: 330 / proporcional, padding: 30 / proporcional, top: -60 / proporcional, right: 20 / proporcional, background: 'white'}}>
                        <div className='d-flex' style={{width: 270 / proporcional, height: 'auto', marginBottom: 10 / proporcional, cursor: 'pointer'}}
                            onClick={() => {guardar_proveedor(); dispatch(set_open_menu_derecho(false))}}>
                            <img src={icono_guardar} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                            <p style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                                Guardar proveedor
                            </p>
                        </div>
                        <div className='rounded-pill' style={{width: 270 / proporcional, height: 2 / proporcional, background: '#e29022', marginBottom: 10 / proporcional}}/>
                        <div className='d-flex' style={{width: 270 / proporcional, height: 'auto', marginBottom: 10 / proporcional, cursor: 'pointer'}}
                            onClick={() => {dispatch(set_open_menu_derecho(false)); navigate('/home/proveedores')}}>
                            <img src={icono_volver} style={{width: 24 / proporcional, height: 24 / proporcional, marginRight: 10 / proporcional}}/>
                            <p style={{fontSize: 18 / proporcional, lineHeight: `${24 / proporcional}px`, marginBottom: 0, fontWeight: 500, color: '#212121'}}>
                                Volver proveedores
                            </p>
                        </div>
                        <div className='rounded-pill' style={{width: 270 / proporcional, height: 2 / proporcional, background: '#e29022', marginBottom: 10 / proporcional}}/>
                    </div>
                ) : null
            }
        </div>
  )
}
