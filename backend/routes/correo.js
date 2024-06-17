const express = require('express')
const router = express.Router()

const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const pool = require('../database')

const nodemailer = require('nodemailer')
const SMTPTransport = require('nodemailer/lib/smtp-transport')

var transporter = nodemailer.createTransport( new SMTPTransport ({
    host: "developer-ideas.com", // service
    secure: false, // use SSL
    port: 587, // port for secure SMTP
    auth: {
        user: 'admin@developer-ideas.com',
        pass: 'J4027@4060r'
    },
    tls: {
        rejectUnauthorized: false
    }
}))

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve (__dirname, 'template'),
        defaultLayout: false,
    },
    viewPath: path.resolve (__dirname, 'template'),
    extName: '.hbs'
};

transporter.use('compile', hbs(handlebarOptions))

router.post('/api/correo/enviar/cotizacion/:shop_id', async (req, res) => {
    const { shop_id } = req.params
    const {estado} = req.body

    try {
        const updateEstado = {estado}
        await pool.query ('UPDATE carrito_cotizacion set ? WHERE shop_id = ?', [updateEstado, shop_id])
        const productos_cotizacion = await pool.query (`SELECT * FROM carrito_cotizacion JOIN productos_proveedor ON productos_proveedor.id = carrito_cotizacion.id_producto
                                                WHERE carrito_cotizacion.shop_id = ?`, [shop_id])
        const usuarios = await pool.query ('SELECT * FROM clientes JOIN info_clientes ON clientes.usuario = info_clientes.usuario WHERE clientes.usuario = ?', [productos_cotizacion[0].usuario])
    
        if (usuarios.length === 1){
            var mailOptions = {
                from: '"Grupo COMFISA" <admin@developer-ideas.com>', // sender address
                to: usuarios[0].correo, // list of receivers
                subject: 'Respuesta de su cotización a su pedido',
                template: 'enviocotizacion', // the name of the template file i.e email.handlebars
                context:{
                    nombres: usuarios[0].nombres, // replace {{name}} with Adebola
                    apellidos: usuarios[0].apellidos, // replace {{name}} with Adebola
                    lista_cotizacion: productos_cotizacion,
                    shop_id: shop_id
                }
            }
        
            // trigger the sending of the E-mail
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return res.json ({
                        message: 'error: ' + error
                    })
                }
                
                return res.json ({
                    message: info
                })
            });        
        }else{
            return res.json ({
                message: '1'
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
        }
    }
)

router.post('/api/correo/nueva/cotizacion/:shop_id/:usuario', async (req, res) => {
    const { usuario, shop_id } = req.params

    try {
        const data_usuario = await pool.query (`SELECT * FROM info_clientes WHERE usuario = ?`, [usuario])
        const cotizacion = await pool.query (`SELECT productos_proveedor.producto, carrito_cotizacion.cantidad, carrito_cotizacion.precio,
                                                carrito_cotizacion.comentarios, productos_proveedor.descripcion, productos_proveedor.foto_uno,
                                                carrito_cotizacion.estado FROM carrito_cotizacion JOIN productos_proveedor ON 
                                                productos_proveedor.id = carrito_cotizacion.id_producto 
                                                WHERE shop_id = ?`, [shop_id])
        console.log (cotizacion)

        var mailOptions = {
            from: '"Grupo COMFISA" <admin@grupocomfisa.com>', // sender address
            to: data_usuario[0].correo + ', ventas@grupocomfisa.com, gerencia@grupocomfisa.com', // list of receivers
            subject: 'Pedido de cotización',
            template: 'pedidocotizacion', // the name of the template file i.e email.handlebars
            context:{
                nombres: data_usuario[0].nombres,
                apellidos: data_usuario[0].apellidos, // replace {{name}} with Adebola
                lista_cotizacion: cotizacion
            }
        }
    
        // trigger the sending of the E-mail
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return res.json ({
                    message: 'error: ' + error
                })
            }
            
            return res.json ({
                message: info
            })
        });        
    } catch (error) {
        console.log (error)
        return res.json({
            error: error,
            success: false
        })
    }
})

router.post('/api/correo/mensaje/web', async (req, res) => {
    const { correo, nombres, apellidos, telefono, mensaje } = req.body

    var mailOptions = {
        from: '"Grupo COMFISA" <admin@developer-ideas.com>', // sender address
        to: correo + ', ventas@grupocomfisa.com, gerencia@grupocomfisa.com', // list of receivers
        subject: 'Mensaje de la web Grupo COMFISA',
        template: 'mensajeweb', // the name of the template file i.e email.handlebars
        context:{
            nombres: nombres,
            apellidos: apellidos,
            telefono: telefono,
            mensaje: mensaje // replace {{name}} with Adebola
        }
    }

    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return res.json ({
                message: 'error: ' + error
            })
        }
        
        return res.json ({
            message: info
        })
    });        
})

module.exports = router