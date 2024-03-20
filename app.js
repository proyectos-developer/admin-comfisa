const cors = require('cors')

const express = require ('express');
const morgan = require('morgan');
const {create} = require('express-handlebars');
const path = require('path');
const flash = require ('connect-flash')
const session = require ('express-session')
const mysqlstore = require('express-mysql-session')
const passport = require('passport')

const { database } = require('./backend/keys.js')

const app = express()
app.use(cors())
require ('./backend/lib/passport.js')

/**Configuraciones */
const hbs = create ({
  extname: '.hbs'
})

app.set ('port', process.env.PORT || 3001);
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, 'views'));

//Middlewares
app.use(
    session({
        secret: 'faztmysqlnodesession',
        resave: false,
        saveUninitialized: false,
        store: new mysqlstore(database)
    })
)

app.use(flash())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

//Variables globales
app.use((req, res, next) => {
    app.locals.success = req.flash('success')
    app.locals.message = req.flash('message')
    app.locals.users = req.users
    next()
})
 
//Rutas
/**app.use(require('./backend/routes/index.js'));**/
app.use(require('./backend/routes/authentication.js'))

app.use(require('./backend/routes/correo.js'))
app.use(require('./backend/routes/proveedores.js'))
app.use(require('./backend/routes/productos.js'))
app.use(require('./backend/routes/cotizaciones.js'))
app.use(require('./backend/routes/pedidos.js'))

app.use(express.static(path.resolve(__dirname, './backend/views')));
app.get ('/api', (req, res) => {
  res.sendFile(path.resolve(__dirname, './backend/views', 'profile'));
})

app.use(express.static(path.resolve(__dirname, './client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/home', 'index'));
});

app.get('/home/proveedores', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/home/proveedores', 'index'));
});

app.get('/home/proveedores/nuevo-proveedor', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/home/proveedores/nuevo-proveedor', 'index'));
});

app.get('/home/proveedores/detalles-proveedor/:id_proveedor', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/home/proveedores/detalles-proveedor/:id_proveedor', 'index'));
});

app.get('/home/productos', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/home/productos', 'index'));
});

app.get('/home/productos/nuevo-producto', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/home/productos/nuevo-producto', 'index'));
});

app.get('/home/productos/detalles-producto/:id_producto', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/home/productos/detalles-producto/:id_producto', 'index'));
});

app.get('/home/cotizaciones', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/home/productos/detalles-producto/:id_producto', 'index'));
});

app.get('/home/cotizaciones/detalles/:id_cotizacion', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/home/productos/detalles-producto/:id_producto', 'index'));
});

app.get('/home/pedidos', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/home/productos/detalles-producto/:id_producto', 'index'));
});

app.get('/home/pedidos/detalles/:id_cotizacion', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build/home/productos/detalles-producto/:id_producto', 'index'));
});

//Iniciar el servidor
app.listen (app.get('port'), () => {
    console.log ('Server en puerto ', app.get ('port'))
})
