const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/producto', async (req, res) => {
    const {id_proveedor, proveedor, id_tipo, nombre_tipo, id_medida, medida, producto, descripcion, 
        caracteristica_uno, caracteristica_dos, caracteristica_tres, caracteristica_cuatro, caracteristica_cinco, 
        foto_uno, foto_dos, foto_tres, foto_cuatro, foto_cinco, foto_seis, foto_siete, foto_ocho, foto_nueve, foto_diez, uniad,
        cantidad, mostrar} = req.body

    try {
        const newProducto = {id_proveedor, proveedor, id_tipo, nombre_tipo, id_medida, medida, producto, descripcion, 
            caracteristica_uno, caracteristica_dos, caracteristica_tres, caracteristica_cuatro, caracteristica_cinco, 
            foto_uno, foto_dos, foto_tres, foto_cuatro, foto_cinco, foto_seis, foto_siete, foto_ocho, foto_nueve, foto_diez, uniad,
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
    const {id_proveedor, proveedor, id_tipo, nombre_tipo, id_medida, medida, producto, descripcion, 
            caracteristica_uno, caracteristica_dos, caracteristica_tres, caracteristica_cuatro, caracteristica_cinco, 
            foto_uno, foto_dos, foto_tres, foto_cuatro, foto_cinco, foto_seis, foto_siete, foto_ocho, foto_nueve, foto_diez, uniad,
            cantidad, mostrar} = req.body
    const {id_producto} = req.params

    try {
        const updateProducto = {id_proveedor, proveedor, id_tipo, nombre_tipo, id_medida, medida, producto, descripcion, 
            caracteristica_uno, caracteristica_dos, caracteristica_tres, caracteristica_cuatro, caracteristica_cinco, 
            foto_uno, foto_dos, foto_tres, foto_cuatro, foto_cinco, foto_seis, foto_siete, foto_ocho, foto_nueve, foto_diez, uniad,
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

/**Tipo producto proveedor */
router.post('/api/tipo_producto', async (req, res) => {
    const {id_proveedor, proveedor, nombre_tipo} = req.body

    try {
        const newTipoProducto = {id_proveedor, proveedor, nombre_tipo}

        const new_data       = await pool.query ('INSERT INTO tipo_producto_proveedor set ?', [newTipoProducto])
        const tipo_producto  = await pool.query ('SELECT * FROM tipo_producto_proveedor WHERE id = ?', [new_data.insertId])
        const tipo_productos = await pool.query ('SELECT * FROM tipo_producto_proveedor WHERE id_proveedor = ?', [id_proveedor])

        return res.json ({
            tipo_producto: tipo_producto[0],
            tipo_productos: tipo_productos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tipo_producto: {},
            tipo_productos: [],
            success: false
        })
        
    }
})

router.get ('/api/tipo_producto/:id_tipo', async (req, res) => {
    const {id_tipo}  = req.params

    try {
        const tipo_producto = await pool.query ('SELECT * FROM tipo_producto_proveedor WHERE id = ?', [id_tipo])
        return res.json ({
            tipo_producto: tipo_producto[0],
            sucess: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tipo_producto: {},
            success: false
        })
        
    }
})

router.get ('/api/tipo_productos/:id_proveedor', async (req, res) => {
    const {id_proveedor} = req.params

    try {
        const tipo_productos = await pool.query ('SELECT * FROM tipo_producto_proveedor WHERE id_proveedor = ?', [id_proveedor])

        return res.json ({
            tipo_productos: tipo_productos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tipo_productos: [],
            success: false
        })
    }
})

router.post ('/api/tipo_producto/:id_tipo', async (req, res) => {
    const {id_tipo} = req.params
    const {nombre_tipo} = req.body

    try {
        const updateTipo = {nombre_tipo}
        await pool.query ('UPDATE tipo_producto_proveedor set ? WHERE id = ?', [updateTipo, id_tipo])
        const tipo_producto = await pool.query ('SELECT * FROM tipo_producto_proveedor WHERE id = ?', [id_tipo])
        return res.json ({
            tipo_producto: tipo_producto[0],
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.json ({
            tipo_producto: {},
            success: false
        })
    }
})

router.get ('/api/delete/tipo_producto/:id_tipo', async (req, res) => {
    const {id_tipo} = req.params

    try {
        await pool.query ('DELETE FROM tipo_producto_proveedor WHERE id = ?', [id_tipo])

        return res.json ({
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            success: false
        })
    }
})

/**Medidas tipo de producto */
router.post('/api/medida', async (req, res) => {
    const {id_proveedor, proveedor, id_tipo, nombre_medida, nombre_tipo} = req.body

    try {
        const newMedida = {id_proveedor, proveedor, id_tipo, nombre_medida, nombre_tipo} 

        const new_medida = await pool.query ('INSERT INTO medida_tipo_producto set ?', [newMedida])
        const medida = await pool.query ('SELECT * FROM medida_tipo_producto WHERE id = ?', [new_medida.insertId])

        return res.json ({
            medida: medida [0],
            success: true
        })
    } catch (error) {

        console.log (error)
        return res.json ({
            medida: {},
            success: false
        })
        
    }
})

router.get ('/api/medida/:id_medida', async (req, res) => {
    const {id_medida}  = req.params

    try {
        const medida = await pool.query ('SELECT * FROM medida_tipo_producto WHERE id = ?', [id_medida])
        return res.json ({
            medida: medida[0],
            sucess: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            medida: {},
            success: false
        })
        
    }
})

router.get ('/api/medidas/:id_tipo', async (req, res) => {
    const {id_tipo} = req.params

    try {
        const medidas = await pool.query ('SELECT * FROM medida_tipo_producto WHERE id_tipo = ?', [id_tipo])

        return res.json ({
            medidas: medidas,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            medidas: [],
            success: false
        })
    }
})

router.post ('/api/medida/:id_medida', async (req, res) => {
    const {id_medida} = req.params
    const {nombre_medida} = req.body

    try {
        const updateMedida = {nombre_medida}
        await pool.query ('UPDATE medida_tipo_producto set ? WHERE id = ?', [updateMedida, id_medida])
        const medida = await pool.query ('SELECT * FROM medida_tipo_producto WHERE id = ?', [id_medida])
        return res.json ({
            medida: medida[0],
            success: true
        })
    } catch (error) {
        console.log(error)
        return res.json ({
            medida: {},
            success: false
        })
    }
})

router.get ('/api/delete/medida/:id_medida', async (req, res) => {
    const {id_medida} = req.params

    try {
        await pool.query ('DELETE FROM medida_tipo_producto WHERE id = ?', [id_medida])

        return res.json ({
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            success: false
        })
    }
})

module.exports = router