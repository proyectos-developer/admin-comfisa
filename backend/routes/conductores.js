const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

/**Obtener conductores */
router.get ('/api/conductores', async (req, res) => {
    try {
        const conductores = await pool.query ('SELECT * FROM conductores')

        return res.json ({
            conductores: conductores,
            success: true
        })
    } catch (error) {
        console.log (error)
    }
})

/**Obtener conductores ordenados, filtrados, buscar */
router.get ('/api/conductores/buscar/:search/ordenar/:order_by/:order/filtrados/:filtro/:id_filtro/:begin/:cantidad', async (req, res) => {
    const {search, order_by, order, filtro, id_filtro, begin, cantidad} = req.params

    try {
        if (search === '0' && order_by === '0' && filtro === '0'){
            const conductores = await pool.query (`SELECT * FROM conductores ORDER BY nombres ASC, apellidos ASC LIMIT ${begin},${cantidad}`)

            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM conductores`)
                return res.json ({
                    conductores: conductores,
                    total_conductores: total[0][`COUNT(*)`],
                    success: true
                })
            }else{
                return res.json ({
                    conductores: conductores,
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0' && filtro === '0'){
            const conductores = await pool.query (`SELECT * FROM conductores WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR 
                nro_documento LIKE '%${search}%' OR nro_placa LIKE '%${search}%' OR marca_carro LIKE '%${search}%' OR modelo_carro LIKE '%${search}%' 
                ORDER BY nombres ASC, apellidos ASC LIMIT ${begin},${cantidad}`)
            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM conductores WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR 
                nro_documento LIKE '%${search}%' OR nro_placa LIKE '%${search}%' OR marca_carro LIKE '%${search}%' OR modelo_carro LIKE '%${search}%'`)
                return res.json ({
                    conductores: conductores,
                    total_conductores: total[0][`COUNT(*)`],
                    success: true
                })
            }else{
                return res.json ({
                    conductores: conductores,
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0' && filtro === '0'){
            const conductores = await pool.query (`SELECT * FROM conductores  
                                                   ORDER BY ${order_by} ${order} LIMIT ${begin},${cantidad}`)

            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM conductores`)
                return res.json ({
                    conductores: conductores,
                    total_conductores: total[0][`COUNT(*)`],
                    success: true
                })
            }else{
                return res.json ({
                    conductores: conductores,
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0' && filtro === '0'){
            const conductores = await pool.query (`SELECT * FROM conductores WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR 
                                                    nro_documento LIKE '%${search}%' OR nro_placa LIKE '%${search}%' OR marca_carro LIKE '%${search}%' OR modelo_carro 
                                                    LIKE '%${search}%' 
                                                    ORDER BY ${order_by} ${order} LIMIT ${begin},${cantidad}`)

            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM conductores WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR 
                                                    nro_documento LIKE '%${search}%' OR nro_placa LIKE '%${search}%' OR marca_carro LIKE '%${search}%' OR modelo_carro 
                                                    LIKE '%${search}%' `)
                return res.json ({
                    conductores: conductores,
                    total_conductores: total[0][`COUNT(*)`],
                    success: true
                })
            }else{
                return res.json ({
                    conductores: conductores,
                    success: true
                })
            }
        }else if (search === '0' && order_by === '0' && filtro !== '0'){
            const conductores = await pool.query (`SELECT * FROM conductores 
                ${filtro === 'marca_carro' ? `WHERE marca_carro === ${id_filtro}` : filtro === 'modelo_carro' ? `WHERE modelo_carro === ${id_filtro}` : ''} 
                ORDER BY nombres ASC, apellidos ASC LIMIT ${begin},${cantidad}`)

            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM conductores`)
                return res.json ({
                    conductores: conductores,
                    total_conductores: total[0][`COUNT(*)`],
                    success: true
                })
            }else{
                return res.json ({
                    conductores: conductores,
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0' && filtro !== '0'){
            const conductores = await pool.query (`SELECT * FROM conductores 
                WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR 
                nro_documento LIKE '%${search}%' OR nro_placa LIKE '%${search}%' OR marca_carro LIKE '%${search}%' OR modelo_carro 
                LIKE '%${search}%'
                ${filtro === 'marca_carro' ? ` marca_carro === ${id_filtro}` : filtro === 'modelo_carro' ? ` modelo_carro === ${id_filtro}` : ''} 
                ORDER BY nombres ASC, apellidos ASC LIMIT ${begin},${cantidad}`)

            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM conductores`)
                return res.json ({
                    conductores: conductores,
                    total_conductores: total[0][`COUNT(*)`],
                    success: true
                })
            }else{
                return res.json ({
                    conductores: conductores,
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0' && filtro !== '0'){
            const conductores = await pool.query (`SELECT * FROM conductores 
                ${filtro === 'marca_carro' ? `WHERE marca_carro === ${id_filtro}` : filtro === 'modelo_carro' ? `WHERE modelo_carro === ${id_filtro}` : ''} 
                ORDER BY ${order_by} ${order} LIMIT ${begin},${cantidad}`)

            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM conductores`)
                return res.json ({
                    conductores: conductores,
                    total_conductores: total[0][`COUNT(*)`],
                    success: true
                })
            }else{
                return res.json ({
                    conductores: conductores,
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0' && filtro !== '0'){
            const conductores = await pool.query (`SELECT * FROM conductores 
                WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR 
                nro_documento LIKE '%${search}%' OR nro_placa LIKE '%${search}%' OR marca_carro LIKE '%${search}%' OR modelo_carro 
                LIKE '%${search}%'
                ${filtro === 'marca_carro' ? ` marca_carro === ${id_filtro}` : filtro === 'modelo_carro' ? ` modelo_carro === ${id_filtro}` : ''} 
                ORDER BY ${order_by} ${order} LIMIT ${begin},${cantidad}`)

            if (parseInt(begin) === 0){
                const total = await pool.query (`SELECT COUNT(*) FROM conductores`)
                return res.json ({
                    conductores: conductores,
                    total_conductores: total[0][`COUNT(*)`],
                    success: true
                })
            }else{
                return res.json ({
                    conductores: conductores,
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

/**Actualizar estado conductor*/
router.post ('/api/conductor/estado/:id_conductor', async (req, res) => {
    const {id_conductor} = req.params
    const {habilitado} = req.body

    const updateEstado = {habilitado}

    try{
        await pool.query ('UPDATE conductores set ? WHERE id = ?', [updateEstado, id_conductor])

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

/**Obtener conductor */
router.get ('/api/conductor/:usuario', async (req, res) => {
    const {usuario} = req.params
    console.log ('entra 4')
    try {
        const conductor = await pool.query ('SELECT * FROM conductores WHERE usuario = ?', [usuario])

        return res.json ({
            conductor: conductor[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            success: false
        })
    }
})

/**Obtener conductor y calificaciones*/
router.get ('/api/conductor/calificaciones/:usuario', async (req, res) => {
    const {usuario} = req.params
    
    try {
        const conductor = await pool.query (`SELECT * FROM conductores WHERE usuario = ?`, [usuario])
        const results = await pool.query (`SELECT * FROM calificaciones WHERE conductor = ?`, [usuario]) 
        if (results.length > 0){
            const calificaciones = await pool.query (`SELECT SUM(calificacion) as calificacion, COUNT(id) as nro_calificaciones
                                                      FROM calificaciones WHERE conductor = ?`, [usuario])
            return res.json ({
                conductor: conductor[0],
                calificacion: calificaciones[0],
                success: true
            })
        }else{
            return res.json ({
                conductor: conductor[0],
                success: true
            })
        }
    } catch (error) {
        console.log ('error', error)
        return res.json ({
            success: false
        })
    }
})

/**Obtener datos conductor y token  *******************/
router.get ('/api/conductor/token/:usuario', async (req, res) => {
    const {usuario} = req.params
    console.log ('entra 20')
    try {
        const conductor = await pool.query (`SELECT conductores.nombres, conductores.apellidos, conductores.fecha_nacimiento, conductores.tipo_documento, 
                                            conductores.nro_documento, conductores.nro_telefono, conductores.correo, conductores.foto_perfil, conductores.usuario,
                                            tokens_usuarios.token_usuario
                                            FROM conductores JOIN tokens_usuarios ON conductores.usuario = tokens_usuarios.usuario WHERE conductores.usuario = ?`, [usuario])
        return res.json ({
            conductor: conductor [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json({
            success: false
        })
    }
})

/**Obtener datos vehiculo */
router.get ('/api/conductor/vehiculo/:usuario', async (req, res) => {
    const {usuario} = req.params

    try {
        const vehiculo = await pool.query (`SELECT nro_placa, clase, categoria, fecha_expedicion, fecha_revalidacion, licencia_conducir, marca_carro, 
                                             modelo_carro, color_carro, usuario FROM conductores WHERE usuario = ?`, [usuario])
        return res.json ({
            vehiculo: vehiculo [0],
            success: true
        })
    } catch (error) {
        return res.json({
            success: false
        })
    }
})

/**Obtener datos documentos */
router.get ('/api/conductor/documentos/:usuario', async (req, res) => {
    const {usuario} = req.params

    try {
        const documento = await pool.query (`SELECT foto_licencia, foto_documento, usuario FROM conductores WHERE usuario = ?`, [usuario])
        return res.json ({
            documento: documento [0],
            success: true
        })
    } catch (error) {
        return res.json({
            success: false
        })
    }
})

module.exports = router