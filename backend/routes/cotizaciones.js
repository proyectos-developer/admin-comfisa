const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.get ('/api/cotizaciones', async (req, res) => {
    try {
        const cotizaciones = await pool.query ('SELECT * FROM carrito_cotizacion ORDER BY created_at DESC')

        return res.json ({
            cotizaciones: cotizaciones,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }   
})

router.get ('/api/cotizaciones/shop_id/:shop_id/estado/:estado/:begin/:amount', async (req, res) => {
    const {estado, shop_id, begin, amount} = req.params

    try {
        if (estado === '0' && shop_id === '0'){
            if (parseInt(begin) === 0){
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion ORDER BY created_at DESC LIMIT ${begin},${amount}`)
                const total_cotizaciones = await pool.query ('SELECT COUNT (id) FROM carrito_cotizacion')
                return res.json ({
                    cotizaciones: cotizaciones,
                    total_cotizaciones: total_cotizaciones [0][`COUNT (id)`],
                    success: true
                })
            }else{
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion ORDER BY created_at DESC LIMIT ${begin},${amount}`)
                return res.json ({
                    cotizaciones: cotizaciones,
                    success: true
                })
            }
        }else if (estado === '0' && shop_id !== '0'){
            if (parseInt(begin) === 0){
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE shop_id = ? ORDER BY created_at DESC LIMIT ${begin},${amount}`, [shop_id])
                const total_cotizaciones = await pool.query ('SELECT COUNT (id) FROM carrito_cotizacion WHERE shop_id = ?', [shop_id])
                return res.json ({
                    cotizaciones: cotizaciones,
                    total_cotizaciones: total_cotizaciones [0][`COUNT (id)`],
                    success: true
                })
            }else{
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE shop_id = ? ORDER BY created_at DESC LIMIT ${begin},${amount}`, [shop_id])
                return res.json ({
                    cotizaciones: cotizaciones,
                    success: true
                })
            }
        }else if (estado !== '0' && shop_id === '0'){
            if (parseInt(begin) === 0){
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? ORDER BY created_at DESC LIMIT ${begin},${amount}`, [estado])
                const total_cotizaciones = await pool.query ('SELECT COUNT (id) FROM carrito_cotizacion WHERE estado = ?', [estado])
                return res.json ({
                    cotizaciones: cotizaciones,
                    total_cotizaciones: total_cotizaciones [0][`COUNT (id)`],
                    success: true
                })
            }else{
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? ORDER BY created_at DESC LIMIT ${begin},${amount}`, [estado])
                return res.json ({
                    cotizaciones: cotizaciones,
                    success: true
                })
            }
        }else if (estado !== 0 && shop_id !== '0'){
            if (parseInt(begin) === 0){
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? AND shop_id = ? ORDER BY created_at DESC LIMIT ${begin},${amount}`, [estado, shop_id])
                const total_cotizaciones = await pool.query ('SELECT COUNT (id) FROM carrito_cotizacion WHERE estado = ? AND shop_id = ?', [estado, shop_id])
                return res.json ({
                    cotizaciones: cotizaciones,
                    total_cotizaciones: total_cotizaciones [0][`COUNT (id)`],
                    success: true
                })
            }else{
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? AND shop_id = ? ORDER BY created_at DESC LIMIT ${begin},${amount}`, [estado, shop_id])
                return res.json ({
                    cotizaciones: cotizaciones,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }   
})

router.get ('/api/cotizacion/:shop_id', async (req, res) => {
    const {shop_id} = req.params
    try {
        const cotizaciones = await pool.query ('SELECT * FROM carrito_cotizacion WHERE shop_id = ?', [shop_id])

        return res.json ({
            cotizaciones: cotizaciones,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }   
})

router.post ('/api/cotizacion/observaciones/:shop_id/:id_producto', async (req, res) => {
    const {precio, observaciones} = req.body
    const {shop_id, id_producto} = req.params

    try {
        const updateCotizacion = {precio, observaciones} 
        await pool.query ('UPDATE carrito_cotizacion set ? WHERE shop_id = ? AND id_producto = ?', [updateCotizacion, shop_id, id_producto])
        const cotizaciones = await pool.query ('SELECT * FROM carrito_cotizacion WHERE shop_id = ?', [shop_id])

        return res.json ({
            cotizaciones: cotizaciones,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }
})

module.exports = router