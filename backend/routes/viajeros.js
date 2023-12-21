const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

/**Obtener viajeros */ 
router.get ('/api/viajeros', async (req, res) => {
    try {
        const viajeros = await pool.query ('SELECT * FROM usuarios_viajeros')

        return res.json ({
            viajeros: viajeros,
            success: true
        })
    } catch (error) {
        console.log (error)
    }
})

/**Obtener viajeros ordenados, filtrados, buscar */
router.get ('/api/viajeros/buscar/:search/ordenar/:order_by/:order/:begin/:cantidad', async (req, res) => {
    const {search, order_by, order, begin, cantidad} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const viajeros = await pool.query (`SELECT * FROM usuarios_viajeros ORDER BY nombres ASC LIMIT ${begin},${cantidad}`)

            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM usuarios_viajeros`)
                return res.json ({
                    viajeros: viajeros,
                    total_viajeros: total[0][`COUNT(*)`],
                    success: true
                })
            }else{
                return res.json ({ 
                    viajeros: viajeros,
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0'){
            const viajeros = await pool.query (`SELECT * FROM usuarios_viajeros WHERE nombres LIKE '%${search}%' OR nro_documento LIKE '%${search}%' 
                ORDER BY nombres ASC LIMIT ${begin},${cantidad}`)
            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM usuarios_viajeros WHERE nombres LIKE '%${search}%' OR 
                nro_documento LIKE '%${search}%'`)
                return res.json ({
                    viajeros: viajeros,
                    total_viajeros: total[0][`COUNT(*)`],
                    success: true
                })
            }else{
                return res.json ({
                    viajeros: viajeros,
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0'){
            const viajeros = await pool.query (`SELECT * FROM usuarios_viajeros  
                                                   ORDER BY ${order_by} ${order} LIMIT ${begin},${cantidad}`)

            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM usuarios_viajeros`)
                return res.json ({
                    viajeros: viajeros,
                    total_viajeros: total[0][`COUNT(*)`],
                    success: true
                })
            }else{
                return res.json ({
                    viajeros: viajeros,
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0'){
            const viajeros = await pool.query (`SELECT * FROM usuarios_viajeros WHERE nombres LIKE '%${search}%' OR 
                                                    nro_documento LIKE '%${search}%'
                                                    ORDER BY ${order_by} ${order} LIMIT ${begin},${cantidad}`)

            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM usuarios_viajeros WHERE nombres LIKE '%${search}%' OR 
                                                    nro_documento LIKE '%${search}%'`)
                return res.json ({
                    viajeros: viajeros,
                    total_viajeros: total[0][`COUNT(*)`],
                    success: true
                })
            }else{
                return res.json ({
                    viajeros: viajeros,
                    success: true
                })
            }
        }else{
            return res.json ({
                success: false
            })
        }
    } catch (error) {
        return res.json ({
            success: false
        })        
    }
})

/**Actualizar estado viajero*/
router.post ('/api/viajero/estado/:usuario', async (req, res) => {
    const {usuario} = req.params
    const {habilitado} = req.body

    const updateEstado = {habilitado}

    try{
        await pool.query ('UPDATE usuarios_viajeros set ? WHERE usuario = ?', [updateEstado, usuario])

        return res.json ({
            success: true
        })
    }catch (err) {
        console.log (err)
        return res.json ({
            success: false
        })
    }
})

/**Obtener viajero */
router.get ('/api/viajero/:usuario', async (req, res) => {
    const {usuario} = req.params

    try {
        const viajero = await pool.query ('SELECT * FROM usuarios_viajeros WHERE usuario = ?', [usuario])

        return res.json ({
            viajero: viajero[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            success: false
        })
    }
})

/**Obtener viajero y viaje *****************/
router.get ('/api/viajero/viaje/:usuario/:id_viaje', async (req, res) => {
    const {usuario, id_viaje} = req.params
    
    try {
        const viajero = await pool.query (`SELECT * FROM usuarios_viajeros JOIN viajes ON viajes.viajero = usuarios_viajeros.usuario 
                                            WHERE usuarios_viajeros.usuario = ? AND viajes.id = ?`, [usuario, id_viaje])

        return res.json ({
            viajero: viajero[0],
            success: true
        })
    } catch (error) {
        
        return res.json ({
            success: false
        })
    }
})


module.exports = router