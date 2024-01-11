import React, { useEffect } from 'react'

import { useState } from 'react'

import ModalCargando from '../modal/cargando'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {begindata} from '../../redux/slice/begindata'
import { beginConstants } from '../../uri/begin-constants'

export default function PanelBegin({proporcional}) {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [correo, setCorreo] = useState ('')
  const [password, setPassword] = useState ('')

  const [ecorreo, setECorreo] = useState ('')
  const [epassword, setEPassword] = useState ('')
  const [message, setMessage] = useState ('')

  const [boton_iniciar, setBotonIniciar] = useState (false)

  const {login_user} = useSelector (({begin}) => begin)
  const begin = useSelector (({begin}) => begin)

  useEffect (() => {
    if (window.localStorage.getItem('session_id')){
      navigate ('/home')
    }
  }, [])

  useEffect (() => {
      if (login_user && login_user.success === true && login_user.user){
        window.localStorage.setItem('usuario', login_user.user.user.usuario)
        window.localStorage.setItem('correo', login_user.user.user.correo)
        window.localStorage.setItem('session_id', login_user.user.session_id)
        dispatch(begindata(beginConstants({}, true, 0).login_user))
        navigate ('/home')
      }else if (login_user && login_user.success === false && login_user.message){
        setMessage (login_user.message.message)
      }
  }, [login_user])

  const iniciar_sesion = () => {
      if (correo === '' || password === ''){
        setECorreo(correo === '' ? true : false)
        setEPassword(password === '' ? true : false)
      }else{
        setECorreo(false)
        setEPassword(false)
        setMessage ('')
        const session = {correo: correo, password: password}
        console.log (session)
        dispatch(begindata(beginConstants(session, false, 0).login_user))
      }
  }

    return (
        <div className='position-relative' style={{width: '100%', height: '100vh'}}>
              <div className='shadow-lg rounded top-50 start-50 position-absolute translate-middle' 
                   style={{width: 600 / proporcional, height: 'auto', background: 'white', padding: 20 / proporcional}}>
                    <p style={{fontSize: 30 / proporcional, textAlign: 'center', lineHeight: `${34 / proporcional}px`, marginBottom: 25 / proporcional, color: 'rgb(56, 77, 167)', 
                               fontWeight: 600}}>
                      GRUPO COMFISA
                    </p>
                    <input type='email'
                      className='form-control'
                      value={correo}
                      onChange={(event) => setCorreo(event.target.value)}
                      style={{width: 540 / proporcional, height: 50 / proporcional, background: 'rgb(158,158,158, 0.6)', marginBottom: 25 / proporcional,
                            fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`, border: ecorreo ? '1px solid red' : null}}
                      placeholder='Ingrese su correo'
                    />
                    <input type='password'
                      className='form-control'
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      style={{width: 540 / proporcional, height: 50 / proporcional, background: 'rgb(158,158,158, 0.6)', marginBottom: 25 / proporcional,
                            fontSize: 18 / proporcional, lineHeight: `${50 / proporcional}px`, border: epassword ? '1px solid red' : null}}
                      placeholder='Ingrese su contraseña'
                    />
                    {
                        message !== '' ? (
                            <p className='default' style={{fontSize: 14 / proporcional, lineHeight: `${16 / proporcional}px`, fontFamily: 'Mukta, sans-serif',
                                color: 'red', fontWeight: 600, textAlign: 'start', maginBottom: 25 / proporcional}}>
                                Error: {message}
                            </p>
                        ) : null
                    }
                    <p style={{width: 540 / proporcional, fontSize: 16 / proporcional, textAlign: 'end', lineHeight: `${20 / proporcional}px`, marginBottom: 25 / proporcional, color: '#212121', 
                               fontWeight: 600, textDecoration: 'underline', cursor: 'pointer'}}>
                      Olvide mi contraseña
                    </p>
                    <div className='d-flex justify-content-center' style={{width: 540 / proporcional}}>
                      <button className='btn' 
                          onMouseOver={() => setBotonIniciar(true)} onMouseLeave={() => setBotonIniciar(false)}
                          onClick={() => iniciar_sesion()}
                          style={{width: boton_iniciar ? 530 / proporcional : 540 / proporcional, height: 50 / proporcional, background: '#212121', color: 'white', 
                                  fontWeight: boton_iniciar ? 500 : 700, fontSize: boton_iniciar ? 16 / proporcional : 18 / proporcional}}>
                        INGRESAR</button>
                    </div>
              </div>
              <ModalCargando loading={begin.loading}/>
        </div>
    )
}
