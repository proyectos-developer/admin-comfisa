const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/producto', async (req, res) => {
    const {id_proveedor, proveedor, producto, descripcion, caracteristica_uno, caracteristica_dos, caracteristica_tres,
        caracteristica_cuatro, caracteristica_cinco, foto_uno, foto_dos, foto_tres, foto_cuatro, foto_cinco,
        cantidad, mostrar} = req.body

    try {
        const newProducto = {id_proveedor, proveedor, producto, descripcion, caracteristica_uno, caracteristica_dos, caracteristica_tres,
            caracteristica_cuatro, caracteristica_cinco, foto_uno, foto_dos, foto_tres, foto_cuatro, foto_cinco,
            cantidad, mostrar}
        const new_producto = await pool.query ('INSERT INTO productos_proveedor set ?', [newProducto])
        const productos = await pool.query ('SELECT * FROM productos_proveedor WHERE id = ?', [new_producto.insertId])

        return res.json ({
            producto: productos[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.post ('/api/producto/:id_producto', async (req, res) => {
    const {id_proveedor, proveedor, producto, descripcion, caracteristica_uno, caracteristica_dos, caracteristica_tres,
            caracteristica_cuatro, caracteristica_cinco, foto_uno, foto_dos, foto_tres, foto_cuatro, foto_cinco,
            cantidad, mostrar} = req.body
    const {id_producto} = req.params

    try {
        const updateProducto = {id_proveedor, proveedor, producto, descripcion, caracteristica_uno, caracteristica_dos, caracteristica_tres,
            caracteristica_cuatro, caracteristica_cinco, foto_uno, foto_dos, foto_tres, foto_cuatro, foto_cinco,
            cantidad, mostrar}
        await pool.query ('UPDATE productos_proveedor set ?  WHERE id = ?', [updateProducto, id_producto])
        const productos = await pool.query ('SELECT * FROM productos_proveedor WHERE id = ?', [id_producto])

        return res.json ({
            producto: productos[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/api/productos', async (req, res) => {
    try {
        const productos = await pool.query (`SELECT * FROM productos_proveedor ORDER BY producto`)
        
        return res.json ({
            productos: productos, 
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/api/producto/:id_producto', async (req, res) => {
    const {id_producto} = req.params
    try {
        const producto = await pool.query (`SELECT * FROM productos_proveedor WHERE id = ?`, [id_producto])
        console.log (producto, id_producto)
        return res.json ({
            producto: producto[0], 
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get('/api/productos/buscar/:search/order/:order_by/:order', async (req, res) => {
    const {search, order_by, order} = req.params
    try {
        if (search === '0' && order_by === '0'){
            const productos = await pool.query ('SELECT * FROM productos_proveedor')
            res.json({
                productos: productos,
                success: true
            })
        } else if (search !== '0' && order_by === '0'){
            const productos = await pool.query (`SELECT * FROM productos_proveedor JOIN proveedores ON proveedores.id = productos_proveedor.id_proveedor
                                                 WHERE productos_proveedor.producto LIKE '%${search}%' OR productos_proveedor.descripcion 
                                                LIKE '%${search}%' OR proveedores.proveedor LIKE '%${search}%'`)
            res.json({
                productos: productos,
                success: true
            })
        } else if (search !== '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT * FROM productos_proveedor JOIN proveedores ON proveedores.id = productos_proveedor.id_proveedor
                                                WHERE productos_proveedor.producto LIKE '%${search}%' OR productos_proveedor.descripcion 
                                                LIKE '%${search}%' OR proveedores.proveedor LIKE '%${search}%' ORDER BY ${order_by} ${order}`)
            res.json({
                productos: productos,
                success: true
            })
        }else if (search === '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT * FROM productos_proveedor ORDER BY ${order_by} ${order}`)
            res.json({
                productos: productos,
                success: true
            })
        }
    } catch (error) {
        res.json({
            productos: [],
            success: false
        })
    }
})

router.get('/api/delete/producto/:id_producto', async (req, res) => {
    const {id_producto} = req.params

    try {
        console.log (id_producto)
        await pool.query ('DELETE FROM productos_proveedor WHERE id = ?', [id_producto])
        return res.json ({
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

module.exports = router