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