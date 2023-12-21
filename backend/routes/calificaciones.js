const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.get ('/api/calificaciones/ordenar/:order_by/:order/:begin/:cantidad', async (req, res) => {
    const {order_by, order, begin, cantidad} = req.params
    try {
        
        if (order_by === '0'){
            const calificaciones = await pool.query (`SELECT SUM (calificaciones.calificacion) as calificacion, COUNT(calificaciones.id) as nro_calificaciones,
                                                      conductores.foto_perfil, conductores.nombres, conductores.apellidos, conductores.nro_documento, calificaciones.conductor
                                                      FROM calificaciones JOIN conductores ON conductores.usuario = calificaciones.conductor  
                                                      GROUP BY calificaciones.conductor LIMIT ${begin},${cantidad}`)
            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM calificaciones GROUP BY conductor`)
                return res.json ({
                    calificaciones: calificaciones,
                    total_calificaciones: total[0][`COUNT(*)`],
                    success: true,
                })
            }else{
                return res.json ({
                    calificaciones: calificaciones,
                    success: true,
                })
            }
        }else{
            const calificaciones = await pool.query (`SELECT SUM (calificaciones.calificacion) as calificacion, COUNT(calificaciones.id) as nro_calificaciones,
                                                      conductores.foto_perfil, conductores.nombres, conductores.apellidos, conductores.nro_documento, calificaciones.conductor
                                                      FROM calificaciones JOIN conductores ON conductores.usuario = calificaciones.conductor  
                                                      GROUP BY calificaciones.conductor ORDER BY ${order_by} ${order} LIMIT ${begin},${cantidad}`)
            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM calificaciones GROUP BY conductor`)
                return res.json ({
                    calificaciones: calificaciones,
                    total_calificaciones: total[0][`COUNT(*)`],
                    success: true,
                })
            }else{
                return res.json ({
                    calificaciones: calificaciones,
                    success: true,
                })
            }
        }
    } catch (error) {
        console.log (error)
    }
})

router.get ('/api/calificaciones/conductor/:conductor/:begin/:cantidad', async (req, res) => {
    const {conductor, begin, cantidad} = req.params
    console.log ('entra 4')
    try {
        const calificaciones = await pool.query (`SELECT * FROM calificaciones JOIN usuarios_viajeros ON 
                                                  usuarios_viajeros.usuario =  calificaciones.viajero WHERE calificaciones.conductor = ?
                                                  LIMIT ${begin},${cantidad}`, [conductor])
        if (parseFloat (begin) === 0){
            const total = await pool.query (`SELECT COUNT(*) FROM calificaciones WHERE conductor = ?`, [conductor])
            return res.json ({
                calificaciones: calificaciones,
                total_calificaciones: total[0][`COUNT(*)`],
                success: true,
            })
        }else{
            return res.json ({
                calificaciones: calificaciones,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }
})

module.exports = router