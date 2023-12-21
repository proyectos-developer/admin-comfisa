const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.get ('/api/viajes/ordenar/:order_by/:order/:begin/:cantidad', async (req, res) => {
    const {order_by, order, begin, cantidad} = req.params
    try {
        if (order_by === '0'){
            const viajes = await pool.query (`SELECT viajes.latitude_origen, viajes.longitude_origen, viajes.latitude_destino, viajes.longitude_destino,
                                              viajes.direccion_origen, viajes.direccion_destino, viajes.conductor, viajes.viajero, 
                                              usuarios_viajeros.nombres as nombres_viajero, conductores.nombres as nombres_conductor, 
                                              conductores.apellidos as apellidos_conductor, usuarios_viajeros.foto as foto_viajero, viajes.created_at,
                                              usuarios_viajeros.nro_telefono as telefono_viajero, conductores.foto_perfil as foto_conductor, 
                                              usuarios_viajeros.tipo_documento as tipo_documento_viajero, usuarios_viajeros.nro_documento as nro_documento_viajero,
                                              conductores.nro_telefono as telefono_conductor,
                                              conductores.tipo_documento as tipo_documento_conductor, conductores.nro_documento as nro_documento_conductor, 
                                              viajes.medio_pago, viajes.cobraron, viajes.pago
                                               FROM viajes JOIN conductores ON viajes.conductor = conductores.usuario 
                                              JOIN usuarios_viajeros ON viajes.viajero = usuarios_viajeros.usuario ORDER BY 
                                              viajes.created_at DESC LIMIT ${begin},${cantidad}`)
            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM viajes`)
                return res.json ({
                    viajes: viajes,
                    total_viajes: total[0][`COUNT(*)`],
                    success: true,
                })
            }else{
                return res.json ({
                    viajes: viajes,
                    success: true,
                })
            }
        }else{
            const viajes = await pool.query (`SELECT viajes.latitude_origen, viajes.longitude_origen, viajes.latitude_destino, viajes.longitude_destino,
                                            viajes.direccion_origen, viajes.direccion_destino, viajes.conductor, viajes.viajero, 
                                            usuarios_viajeros.nombres as nombres_viajero, conductores.nombres as nombres_conductor, 
                                            conductores.apellidos as apellidos_conductor, usuarios_viajeros.foto as foto_viajero, viajes.created_at,
                                            usuarios_viajeros.nro_telefono as telefono_viajero, conductores.foto_perfil as foto_conductor, 
                                            usuarios_viajeros.tipo_documento as tipo_documento_viajero, usuarios_viajeros.nro_documento as nro_documento_viajero,
                                            conductores.nro_telefono as telefono_conductor,
                                            conductores.tipo_documento as tipo_documento_conductor, conductores.nro_documento as nro_documento_conductor, 
                                            viajes.medio_pago, viajes.cobraron, viajes.pago
                                               FROM viajes JOIN conductores ON viajes.conductor = conductores.usuario 
                                              JOIN usuarios_viajeros ON viajes.viajero = usuarios_viajeros.usuario ORDER BY 
                                              ${order_by} ${order} LIMIT ${begin},${cantidad}`)
            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM viajes`)
                return res.json ({
                    viajes: viajes,
                    total_viajes: total[0][`COUNT(*)`],
                    success: true,
                })
            }else{
                return res.json ({
                    viajes: viajes,
                    success: true,
                })
            }
        }
    } catch (error) {
        console.log (error)
    }
})

module.exports = router