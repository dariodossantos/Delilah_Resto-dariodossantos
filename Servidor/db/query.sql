  /* Querys para la generacion de tablas */
CREATE TABLE `resto`.`usuarios` 
( `nombre_usuario`      VARCHAR(50)  NOT NULL                           , 
  `nombre_apellido`     VARCHAR(150) NOT NULL                           , 
  `mail`                VARCHAR(150) NOT NULL                           , 
  `telefono`            VARCHAR(30)  NOT NULL                           , 
  `direccion`           VARCHAR(150) NOT NULL                           , 
  `password`            VARCHAR(250) NOT NULL                           , 
  `rol`                 VARCHAR(25)  NOT NULL                           , 
  `fecha_alta`          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP , 
  `fecha_actualizacion` TIMESTAMP on update CURRENT_TIMESTAMP NULL      , 
  PRIMARY KEY (`nombre_usuario`), UNIQUE `INDEX MAIL` (`mail`)) ENGINE = InnoDB;

  /* Query para generar usuario */
INSERT INTO `usuarios` 
(`nombre_usuario`, `nombre_apellido`, `mail`, `telefono`, `direccion`, `password`, `rol`, `fecha_alta`, `fecha_actualizacion`) 
VALUES ('usuario', 'dario dos santos', 'dario@gmail.com', '11-9988-7766', 'lalala 1234 casa', '123456', 'usuario', current_timestamp(), NULL);

  /* Query para generar admin */
INSERT INTO `usuarios` 
(`nombre_usuario`, `nombre_apellido`, `mail`, `telefono`, `direccion`, `password`, `rol`, `fecha_alta`, `fecha_actualizacion`) 
VALUES ('admin', 'dds', 'dds@gmail.com', '11-2233-4455', 'lululu 1234 casa', '123456', 'admin', current_timestamp(), NULL);


CREATE TABLE `resto`.`productos` 
( `id_producto`                        INT NOT NULL AUTO_INCREMENT , 
  `menu`                                     VARCHAR(150) NOT NULL , 
  `precio`                                  DECIMAL(11,2) NOT NULL , 
  `disponibilidad`                                 INT(3) NOT NULL , 
  `fecha_alta`        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , 
  `fecha_actualizacion` TIMESTAMP on update CURRENT_TIMESTAMP NULL , 
  PRIMARY KEY (`id_producto`), UNIQUE `INDEX_MENU` (`menu`)) ENGINE = InnoDB;

  
CREATE TABLE `resto`.`pedidos` 
( `id_pedido`                                                  INT(11) NOT NULL AUTO_INCREMENT , 
  `nombre_usuario`                                                        VARCHAR(50) NOT NULL , 
  `estado` ENUM('Nuevo','Confirmado','Preparando','Enviando','Entregado','Cancelado') NOT NULL , 
  `forma_de_pago` ENUM('1','2','3')                                                   NOT NULL ,
  `total_pedido`                                                        DECIMAL(11,2) NOT NULL , 
  `fecha_alta`                                    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , 
  `fecha_actualizacion`                             TIMESTAMP on update CURRENT_TIMESTAMP NULL , 
PRIMARY KEY (`id_pedido`)) ENGINE = InnoDB;


CREATE TABLE `resto`.`pedidos_detalle` 
( `id_pedido`                              INT(11) NOT NULL , 
  `id_producto`                            INT(11) NOT NULL , 
  `cantidad`                                INT(3) NOT NULL , 
  `fecha_alta` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , 
  `fecha_actualizacion` TIMESTAMP on update CURRENT_TIMESTAMP NULL ) ENGINE = InnoDB;

CREATE TABLE `resto`.`forma_de_pago` 
( `id_forma_de_pago`                               INT(3) NOT NULL , 
  `descripcion`                              VARCHAR(100) NOT NULL , 
  `fecha_alta`        TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP , 
  `fecha_actualizacion` TIMESTAMP on update CURRENT_TIMESTAMP NULL , 
  PRIMARY KEY (`id_forma_de_pago`)) ENGINE = InnoDB;

INSERT INTO `forma_de_pago` 
(`id_forma_de_pago`, `descripcion`, `fecha_alta`, `fecha_actualizacion`) 
VALUES ('1', 'Efectivo', current_timestamp(), NULL), ('2', 'Tarjeta Debito', current_timestamp(), NULL), ('3', 'Tarjeta Credito', current_timestamp(), NULL);