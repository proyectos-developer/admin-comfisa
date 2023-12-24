const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/proveedor', async (req, res) => {
    const {logo, proveedor, descripcion, nro_telefono, direccion, correo, nro_ruc} = req.body

    try {
        const newProveedor = {logo, proveedor, descripcion, nro_telefono, direccion, correo, nro_ruc}
        const new_proveedor = await pool.query ('INSERT INTO proveedores set ?', [newProveedor])
        const proveedores = await pool.query ('SELECT * FROM proveedores WHERE id = ?', [new_proveedor.insertId])

        return res.json ({
            proveedor: proveedores[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.post ('/api/proveedor/:id_proveedor', async (req, res) => {
    const {logo, proveedor, descripcion, nro_telefono, direccion, correo, nro_ruc} = req.body
    const {id_proveedor} = req.params

    try {
        const updateProveedor = {logo, proveedor, descripcion, nro_telefono, direccion, correo, nro_ruc}
        await pool.query ('UPDATE proveedores set ?  WHERE id = ?', [updateProveedor, id_proveedor])
        const proveedores = await pool.query ('SELECT * FROM proveedores WHERE id = ?', [id_proveedor])

        return res.json ({
            proveedor: proveedores[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/api/proveedores', async (req, res) => {
    try {
        const proveedores = await pool.query (`SELECT * FROM proveedores ORDER BY proveedor`)
        
        return res.json ({
            proveedores: proveedores, 
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/api/proveedor/:id_proveedor', async (req, res) => {
    const {id_proveedor} = req.params
    try {
        const proveedor = await pool.query (`SELECT * FROM proveedores WHERE id = ?`, [id_proveedor])
        console.log (proveedor, id_proveedor)
        return res.json ({
            proveedor: proveedor[0], 
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get('/api/proveedores/buscar/:search/order/:order_by/:order', async (req, res) => {
    const {search, order_by, order} = req.params
    try {
        if (search === '0' && order_by === '0'){
            const proveedores = await pool.query ('SELECT * FROM proveedores')
            res.json({
                proveedores: proveedores,
                success: true
            })
        } else if (search !== '0' && order_by === '0'){
            const proveedores = await pool.query (`SELECT * FROM proveedores WHERE proveedor LIKE '%${search}%' OR descripcion 
                                                   LIKE '%${search}%'`)
            res.json({
                proveedores: proveedores,
                success: true
            })
        } else if (search !== '0' && order_by !== '0'){
            const proveedores = await pool.query (`SELECT * FROM proveedores WHERE proveedor LIKE '%${search}%' OR descripcion 
                                                   LIKE '%${search}%' ORDER BY ${order_by} ${order}`)
            res.json({
                proveedores: proveedores,
                success: true
            })
        }else if (search === '0' && order_by !== '0'){
            const proveedores = await pool.query (`SELECT * FROM proveedores ORDER BY ${order_by} ${order}`)
            res.json({
                proveedores: proveedores,
                success: true
            })
        }
    } catch (error) {
        res.json({
            proveedores: [],
            success: false
        })
    }
})

router.get('/api/delete/proveedor/:id_proveedor', async (req, res) => {
    const {id_proveedor} = req.params

    try {
        console.log (id_proveedor)
        await pool.query ('DELETE FROM proveedores WHERE id = ?', [id_proveedor])
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