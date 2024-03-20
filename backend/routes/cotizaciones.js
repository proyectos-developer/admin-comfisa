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

router.get ('/api/cotizaciones/shop_id/:shop_id/estado/:estado/order/:order_by/:order/:begin/:amount', async (req, res) => {
    const {estado, shop_id, begin, amount, order_by, order} = req.params

    try {
        if (estado === '0' && shop_id === '0' && order_by === '0'){
            if (parseInt(begin) === 0){
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = 'enviada' OR estado = 'en espera' GROUP BY shop_id ORDER BY nro_pedido DESC LIMIT ${begin},${amount}`)
                return res.json ({
                    cotizaciones: cotizaciones,
                    total_cotizaciones: cotizaciones.length,
                    success: true
                })
            }else{
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion ORDER BY nro_pedido DESC LIMIT ${begin},${amount}`)
                return res.json ({
                    cotizaciones: cotizaciones,
                    success: true
                })
            }
        }else if (estado === '0' && shop_id !== '0' && order_by === '0'){
            if (parseInt(begin) === 0){
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE shop_id = ? AND (estado = 'enviada' OR estado = 'en espera') GROUP BY shop_id ORDER BY nro_pedido DESC LIMIT ${begin},${amount}`, [shop_id])
                return res.json ({
                    cotizaciones: cotizaciones,
                    total_cotizaciones: cotizaciones.length,
                    success: true
                })
            }else{
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE shop_id = ? ORDER BY nro_pedido DESC LIMIT ${begin},${amount}`, [shop_id])
                return res.json ({
                    cotizaciones: cotizaciones,
                    success: true
                })
            }
        }else if (estado !== '0' && shop_id === '0' && order_by === '0'){
            if (parseInt(begin) === 0){
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? GROUP BY shop_id ORDER BY nro_pedido DESC LIMIT ${begin},${amount}`, [estado])
                return res.json ({
                    cotizaciones: cotizaciones,
                    total_cotizaciones: cotizaciones.length,
                    success: true
                })
            }else{
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? ORDER BY nro_pedido DESC LIMIT ${begin},${amount}`, [estado])
                return res.json ({
                    cotizaciones: cotizaciones,
                    success: true
                })
            }
        }else if (estado !== 0 && shop_id !== '0' && order_by === '0'){
            if (parseInt(begin) === 0){
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? AND shop_id = ? GROUP BY shop_id ORDER BY nro_pedido DESC LIMIT ${begin},${amount}`, [estado, shop_id])
                return res.json ({
                    cotizaciones: cotizaciones,
                    total_cotizaciones: cotizaciones.length,
                    success: true
                })
            }else{
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? AND shop_id = ? ORDER BY nro_pedido DESC LIMIT ${begin},${amount}`, [estado, shop_id])
                return res.json ({
                    cotizaciones: cotizaciones,
                    success: true
                })
            }
        } else if (estado === '0' && shop_id === '0' && order_by !== '0'){
            if (parseInt(begin) === 0){
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = 'enviada' OR estado = 'en espera' GROUP BY shop_id ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
                return res.json ({
                    cotizaciones: cotizaciones,
                    total_cotizaciones: cotizaciones.length,
                    success: true
                })
            }else{
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
                return res.json ({
                    cotizaciones: cotizaciones,
                    success: true
                })
            }
        }else if (estado === '0' && shop_id !== '0' && order_by !== '0'){
            if (parseInt(begin) === 0){
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE shop_id = ? GROUP BY shop_id ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [shop_id])
                return res.json ({
                    cotizaciones: cotizaciones,
                    total_cotizaciones: cotizaciones.length,
                    success: true
                })
            }else{
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE shop_id = ? AND (estado = 'enviada' OR estado = 'en espera') ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [shop_id])
                return res.json ({
                    cotizaciones: cotizaciones,
                    success: true
                })
            }
        }else if (estado !== '0' && shop_id === '0' && order_by !== '0'){
            if (parseInt(begin) === 0){
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? GROUP BY shop_id ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [estado])
                return res.json ({
                    cotizaciones: cotizaciones,
                    total_cotizaciones: cotizaciones.length,
                    success: true
                })
            }else{
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? ORDER BY nro_pedido DESC LIMIT ${begin},${amount}`, [estado])
                return res.json ({
                    cotizaciones: cotizaciones,
                    success: true
                })
            }
        }else if (estado !== 0 && shop_id !== '0' && order_by !== '0'){
            if (parseInt(begin) === 0){
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? AND shop_id = ? GROUP BY shop_id ORDER BY nro_pedido DESC LIMIT ${begin},${amount}`, [estado, shop_id])
                return res.json ({
                    cotizaciones: cotizaciones,
                    total_cotizaciones: cotizaciones.length,
                    success: true
                })
            }else{
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? AND shop_id = ? ORDER BY nro_pedido DESC LIMIT ${begin},${amount}`, [estado, shop_id])
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
        const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion JOIN productos_proveedor ON carrito_cotizacion.id_producto = productos_proveedor.id JOIN proveedores ON
            proveedores.id = productos_proveedor.id_proveedor WHERE shop_id = ?`, [shop_id])

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

router.get ('/api/cotizacion/shop_id/:shop_id/usuario/:usuario', async (req, res) => {
    const {shop_id, usuario} = req.params
    try {
        const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion JOIN productos_proveedor ON carrito_cotizacion.id_producto = productos_proveedor.id JOIN proveedores ON
            proveedores.id = productos_proveedor.id_proveedor WHERE shop_id = ?`, [shop_id])
        const info_usuario = await pool.query (`SELECT * FROM clientes JOIN info_clientes ON clientes.usuario = info_clientes.usuario WHERE clientes.usuario = ?`, [usuario])

        return res.json ({
            cotizaciones: cotizaciones,
            usuario: info_usuario[0],
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
        const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion JOIN productos_proveedor ON productos_proveedor.id = carrito_cotizacion.id_producto 
                                                JOIN proveedores ON proveedores.id = productos_proveedor.id_proveedor WHERE carrito_cotizacion.shop_id = ? AND 
                                                carrito_cotizacion.id_producto = ?`, [shop_id, id_producto])

        return res.json ({
            cotizacion: cotizaciones[0],
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

router.get ('/api/cotizaciones/usuario/:shop_id', async (req, res) => {
    const {shop_id} = req.params

    try {
        const cotizaciones = await pool.query ('SELECT * FROM carrito_cotizacion WHERE shop_id = ? GROUP BY shop_id', [shop_id])
        const total = await pool.query ('SELECT * FROM carrito_cotizacion WHERE shop_id = ?', [shop_id])
        const usuario = cotizaciones[0].usuario
        const cliente = await pool.query ('SELECT * FROM info_clientes WHERE usuario = ?', [usuario])
        
        return res.json ({
            cotizaciones: cotizaciones[0],
            total_productos: total.length,
            cliente: cliente[0],
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