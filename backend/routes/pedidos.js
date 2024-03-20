const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.get ('/api/pedidos', async (req, res) => {
    try {
        const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = 'cancelado' OR estado = 'aceptado' ORDER BY estado DESC`)

        return res.json ({
            pedidos: pedidos,
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

router.get ('/api/pedidos/shop_id/:shop_id/estado/:estado/order/:order_by/:order/:begin/:amount', async (req, res) => {
    const {estado, shop_id, begin, amount, order_by, order} = req.params

    try {
        if (estado === '0' && shop_id === '0' && order_by === '0'){
            if (parseInt(begin) === 0){
                const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = 'aceptado' OR estado = 'cancelado' GROUP BY shop_id ORDER BY estado LIMIT ${begin},${amount}`)
                return res.json ({
                    pedidos: pedidos,
                    total_cotizaciones: pedidos.length,
                    success: true
                })
            }else{
                const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion ORDER BY estado LIMIT ${begin},${amount}`)
                return res.json ({
                    pedidos: pedidos,
                    success: true
                })
            }
        }else if (estado === '0' && shop_id !== '0' && order_by === '0'){
            if (parseInt(begin) === 0){
                const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion WHERE shop_id = ? AND (estado = 'aceptado' OR estado = 'cancelado') GROUP BY shop_id ORDER BY estado LIMIT ${begin},${amount}`, [shop_id])
                return res.json ({
                    pedidos: pedidos,
                    total_pedidos: pedidos.length,
                    success: true
                })
            }else{
                const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion WHERE shop_id = ? ORDER BY estado LIMIT ${begin},${amount}`, [shop_id])
                return res.json ({
                    pedidos: pedidos,
                    success: true
                })
            }
        }else if (estado !== '0' && shop_id === '0' && order_by === '0'){
            if (parseInt(begin) === 0){
                const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? GROUP BY shop_id ORDER BY estado LIMIT ${begin},${amount}`, [estado])
                return res.json ({
                    pedidos: pedidos,
                    total_pedidos: pedidos.length,
                    success: true
                })
            }else{
                const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? ORDER BY estado LIMIT ${begin},${amount}`, [estado])
                return res.json ({
                    pedidos: pedidos,
                    success: true
                })
            }
        }else if (estado !== 0 && shop_id !== '0' && order_by === '0'){
            if (parseInt(begin) === 0){
                const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? AND shop_id = ? GROUP BY shop_id ORDER BY estado LIMIT ${begin},${amount}`, [estado, shop_id])
                return res.json ({
                    pedidos: pedidos,
                    total_pedidos: pedidos.length,
                    success: true
                })
            }else{
                const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? AND shop_id = ? ORDER BY estado LIMIT ${begin},${amount}`, [estado, shop_id])
                return res.json ({
                    pedidos: pedidos,
                    success: true
                })
            }
        } else if (estado === '0' && shop_id === '0' && order_by !== '0'){
            if (parseInt(begin) === 0){
                const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = 'aceptado' OR estado = 'cancelado' GROUP BY shop_id ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
                return res.json ({
                    pedidos: pedidos,
                    total_pedidos: pedidos.length,
                    success: true
                })
            }else{
                const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
                return res.json ({
                    pedidos: pedidos,
                    success: true
                })
            }
        }else if (estado === '0' && shop_id !== '0' && order_by !== '0'){
            if (parseInt(begin) === 0){
                const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion WHERE shop_id = ? GROUP BY shop_id ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [shop_id])
                return res.json ({
                    pedidos: pedidos,
                    total_pedidos: pedidos.length,
                    success: true
                })
            }else{
                const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion WHERE shop_id = ? AND (estado = 'aceptado' OR estado = 'cancelado') ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [shop_id])
                return res.json ({
                    pedidos: pedidos,
                    success: true
                })
            }
        }else if (estado !== '0' && shop_id === '0' && order_by !== '0'){
            if (parseInt(begin) === 0){
                const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? GROUP BY shop_id ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [estado])
                return res.json ({
                    pedidos: pedidos,
                    total_pedidos: pedidos.length,
                    success: true
                })
            }else{
                const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? ORDER BY estado LIMIT ${begin},${amount}`, [estado])
                return res.json ({
                    pedidos: pedidos,
                    success: true
                })
            }
        }else if (estado !== 0 && shop_id !== '0' && order_by !== '0'){
            if (parseInt(begin) === 0){
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? AND shop_id = ? GROUP BY shop_id ORDER BY estado LIMIT ${begin},${amount}`, [estado, shop_id])
                return res.json ({
                    cotizaciones: cotizaciones,
                    total_cotizaciones: cotizaciones.length,
                    success: true
                })
            }else{
                const cotizaciones = await pool.query (`SELECT * FROM carrito_cotizacion WHERE estado = ? AND shop_id = ? ORDER BY estado LIMIT ${begin},${amount}`, [estado, shop_id])
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

router.get ('/api/pedido/:shop_id', async (req, res) => {
    const {shop_id} = req.params
    try {
        const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion JOIN productos_proveedor ON carrito_cotizacion.id_producto = productos_proveedor.id JOIN proveedores ON
            proveedores.id = productos_proveedor.id_proveedor WHERE shop_id = ?`, [shop_id])

        return res.json ({
            pedidos: pedidos,
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

router.get ('/api/pedido/shop_id/:shop_id/usuario/:usuario', async (req, res) => {
    const {shop_id, usuario} = req.params
    try {
        const pedidos = await pool.query (`SELECT * FROM carrito_cotizacion JOIN productos_proveedor ON carrito_cotizacion.id_producto = productos_proveedor.id JOIN proveedores ON
            proveedores.id = productos_proveedor.id_proveedor WHERE shop_id = ?`, [shop_id])
        const info_usuario = await pool.query (`SELECT * FROM clientes JOIN info_clientes ON clientes.usuario = info_clientes.usuario WHERE clientes.usuario = ?`, [usuario])

        return res.json ({
            pedidos: pedidos,
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

router.get ('/api/pedidos/usuario/:shop_id', async (req, res) => {
    const {shop_id} = req.params

    try {
        const pedidos = await pool.query ('SELECT * FROM carrito_cotizacion WHERE shop_id = ? GROUP BY shop_id', [shop_id])
        const total = await pool.query ('SELECT * FROM carrito_cotizacion WHERE shop_id = ?', [shop_id])
        const usuario = pedidos[0].usuario
        const cliente = await pool.query ('SELECT * FROM info_clientes WHERE usuario = ?', [usuario])
        
        return res.json ({
            pedidos: pedidos[0],
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