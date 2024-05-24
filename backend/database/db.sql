CREATE DATABASE admin_comfisa;

USE admin_comfisa;

/**Usuarios página**/
CREATE TABLE users(
    id INT(11) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    password VARCHAR (60) NOT NULL,
    usuario VARCHAR (100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY(id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;

/**Proveedores **/
CREATE TABLE proveedores(
    id INT(11) NOT NULL,
    logo TEXT NOT NULL,
    proveedor VARCHAR (100) NOT NULL,
    descripcion VARCHAR (500) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_ruc VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE proveedores
    ADD PRIMARY KEY(id);

ALTER TABLE proveedores
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE proveedores;

/**Productos proveedor **/
CREATE TABLE productos_proveedor(
    id INT(11) NOT NULL,
    id_proveedor INT (11) NOT NULL,
    proveedor VARCHAR (100) NOT NULL,
    id_tipo INT (11) NOT NULL,
    nombre_tipo VARCHAR (100) NOT NULL,
    id_medida INT (11) NOT NULL,
    medida VARCHAR (100) NOT NULL
    producto VARCHAR (100) NOT NULL,
    descripcion VARCHAR (1000) NOT NULL,
    caracteristica_uno VARCHAR (500) NOT NULL,
    caracteristica_dos VARCHAR (500) NOT NULL,
    caracteristica_tres VARCHAR (500) NOT NULL,
    caracteristica_cuatro VARCHAR (500) NOT NULL,
    caracteristica_cinco VARCHAR (500) NOT NULL,
    foto_uno TEXT NOT NULL,
    foto_dos TEXT NOT NULL,
    foto_tres TEXT NOT NULL,
    foto_cuatro TEXT NOT NULL,
    foto_cinco TEXT NOT NULL,
    foto_seis TEXT NOT NULL,
    foto_siete TEXT NOT NULL,
    foto_ocho TEXT NOT NULL,
    foto_nueve TEXT NOT NULL,
    foto_diez TEXT NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE productos_proveedor
    ADD PRIMARY KEY(id);

ALTER TABLE productos_proveedor
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE productos_proveedor;

/**Productos carrito **/
CREATE TABLE carrito_cotizacion(
    id INT(11) NOT NULL,
    id_producto INT (11) NOT NULL,
    usuario VARCHAR (100) NOT NULL,
    cantidad VARCHAR (100) NOT NULL,
    comentarios VARCHAR (500) NOT NULL,
    shop_id VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE carrito_cotizacion
    ADD PRIMARY KEY(id);

ALTER TABLE carrito_cotizacion
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE carrito_cotizacion;

/**Clientes página**/
CREATE TABLE clientes(
    id INT(11) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    password VARCHAR (60) NOT NULL,
    usuario VARCHAR (100) NOT NULL
);

ALTER TABLE clientes
    ADD PRIMARY KEY(id);

ALTER TABLE clientes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE clientes;

/**Info cliente página**/
CREATE TABLE info_clientes(
    id INT(11) NOT NULL,
    nombres VARCHAR (100) NOT NULL,
    apellidos VARCHAR (100) NOT NULL,
    correo VARCHAR (100) NOT NULL,
    nro_telefono VARCHAR (100) NOT NULL,
    usuario VARCHAR (100) NOT NULL
);

ALTER TABLE info_clientes
    ADD PRIMARY KEY(id);

ALTER TABLE info_clientes
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE info_clientes;

/**Favoritos cliente página**/
CREATE TABLE favoritos(
    id INT(11) NOT NULL,
    id_producto VARCHAR (100) NOT NULL,
    usuario VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE favoritos
    ADD PRIMARY KEY(id);

ALTER TABLE favoritos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE favoritos;

/**Tipo producto proveedor**/
CREATE TABLE tipo_producto_proveedor(
    id INT(11) NOT NULL,
    id_proveedor INT(11) NOT NULL,_
    proveedor VARCHAR (100) NOT NULL,
    nombre_tipo VARCHAR (100) NOT NULL
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE tipo_producto_proveedor
    ADD PRIMARY KEY(id);

ALTER TABLE tipo_producto_proveedor
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE tipo_producto_proveedor;

/**Media del tipo producto proveedor**/
CREATE TABLE medida_tipo_producto(
    id INT(11) NOT NULL,
    id_proveedor INT(11) NOT NULL,
    proveedor VARCHAR (100) NOT NULL,
    id_tipo INT(11) NOT NULL,
    nombre_tipo VARCHAR (100) NOT NULL,
    nombre_medida VARCHAR (100) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp 
);

ALTER TABLE medida_tipo_producto
    ADD PRIMARY KEY(id);

ALTER TABLE medida_tipo_producto
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE medida_tipo_producto;