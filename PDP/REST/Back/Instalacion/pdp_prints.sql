-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2022 a las 23:10:57
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE USER IF NOT EXISTS 'pdpPrints'@'%' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON *.* TO 'pdpPrints'@'%';
-- GRANT OPTION MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;
GRANT ALL PRIVILEGES ON `pdp_prints`.* TO 'pdpPrints'@'%';

--
-- Base de datos: `pdp_prints`
--
DROP DATABASE IF EXISTS `pdp_prints`;
CREATE DATABASE IF NOT EXISTS `pdp_prints` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pdp_prints`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `accion`
--

DROP TABLE IF EXISTS `accion`;
CREATE TABLE `accion` (
  `id_accion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_accion` varchar(32) NOT NULL,
  `descripcion_accion` text NOT NULL,
  `borrado_accion` int(11) NOT NULL,
  PRIMARY KEY (`id_accion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accion`
--

LOCK TABLES `accion` WRITE;
INSERT INTO `accion` (`id_accion`, `nombre_accion`, `descripcion_accion`, `borrado_accion`) VALUES
(1, 'Añadir', 'Permite añadir nuevos datos a la aplicación', 0),
(2, 'Modificar', 'Permite modificar datos de la aplicación', 0),
(3, 'Eliminar', 'Permite eliminar datos de la aplicación', 0),
(4, 'Listar', 'Permite visualizar los datos de la aplicación en forma de listado', 0),
(5, 'Visualizar', 'Permite ver en detalle los datos de la aplicación', 0),
(6, 'Reactivar', 'Permite reactivar los datos eliminados de la aplicación', 0);
UNLOCK TABLES;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_categoria` varchar(128) NOT NULL,
  `descripcion_categoria` text NOT NULL,
  `borrado_categoria` int(11) NOT NULL,
  `dni_responsable` varchar(9) NOT NULL,
  `id_padre_categoria` int(11) NULL,
  `dni_usuario` varchar(9) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `funcionalidad`
--

DROP TABLE IF EXISTS `funcionalidad`;
CREATE TABLE `funcionalidad` (
  `id_funcionalidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_funcionalidad` varchar(128) NOT NULL,
  `descripcion_funcionalidad` text NOT NULL,
  `borrado_funcionalidad` int(11) NOT NULL,
  PRIMARY KEY (`id_funcionalidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `funcionalidad` WRITE;
INSERT INTO `funcionalidad` (`id_funcionalidad`, `nombre_funcionalidad`, `descripcion_funcionalidad`, `borrado_funcionalidad`) VALUES
(1, 'Gestión de acciones', 'Permite realizar acciones sobre las acciones de la aplicación', 0),
(2, 'Gestión de funcionalidades', 'Permite realizar acciones sobre las funcionalidades de la aplicación', 0),
(3, 'Gestión de noticias', 'Permite realizar acciones sobre las noticias de la aplicación', 0),
(4, 'Gestión de personas', 'Permite realizar acciones sobre las personas de la aplicación', 0),
(5, 'Gestión de procesos', 'Permite realizar acciones sobre los procesos de la aplicación', 0),
(6, 'Gestión de procesos ejecutados', 'Permite realizar acciones sobre los procesos ejecutados por los usuarios de la aplicación', 0),
(7, 'Gestión de respuestas posibles', 'Permite realizar acciones sobre las respuestas posibles de la aplicación', 0),
(8, 'Gestión de roles', 'Permite realizar acciones sobre los roles de la aplicación', 0),
(9, 'Gestión de usuarios', 'Permite realizar acciones sobre los usuarios de la aplicación', 0);
UNLOCK TABLES;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `log_excepciones`
--

DROP TABLE IF EXISTS `log_excepciones`;
CREATE TABLE `log_excepciones` (
  `id_logExcepciones` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(48) NOT NULL,
  `tipo_excepcion` varchar(255) NOT NULL,
  `descripcion_excepcion` text NOT NULL,
  `fecha` date NOT NULL,
   PRIMARY KEY (`id_logExcepciones`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `noticia`
--

DROP TABLE IF EXISTS `noticia`;
CREATE TABLE `noticia` (
  `id_noticia` int(11) NOT NULL AUTO_INCREMENT,
  `titulo_noticia` varchar(255) NOT NULL,
  `contenido_noticia` text NOT NULL,
  `fecha_noticia` date NOT NULL,
  PRIMARY KEY (`id_noticia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `noticia` WRITE;
INSERT INTO `noticia` (`id_noticia`, `titulo_noticia`, `contenido_noticia`, `fecha_noticia`) VALUES
(1, 'Bienvenidos a Carboon Footprint', 'Bienevidos a esta nueva aplicación para calcular la huella de carbono de tus actividades', '2022-12-26');
UNLOCK TABLES;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `parametro`
--

DROP TABLE IF EXISTS `parametro`;
CREATE TABLE `parametro` (
  `id_parametro` int(11) NOT NULL AUTO_INCREMENT,
  `parametro_formula` varchar(56) NOT NULL,
  `descripcion_parametro` text NOT NULL,
  `id_proceso` int(11) NOT NULL,
  PRIMARY KEY (`id_parametro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona`
--

DROP TABLE IF EXISTS `persona`;
CREATE TABLE `persona` (
  `dni_persona` varchar(9) NOT NULL,
  `nombre_persona` varchar(128) NOT NULL,
  `apellidos_persona` varchar(128) NOT NULL,
  `fecha_nac_persona` date NOT NULL,
  `direccion_persona` varchar(256) NOT NULL,
  `email_persona` varchar(128) NOT NULL,
  `telefono_persona` varchar(9) NOT NULL,
  `borrado_persona` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `persona`
--

LOCK TABLES `persona` WRITE;
INSERT INTO `persona` (`dni_persona`, `nombre_persona`, `apellidos_persona`, `fecha_nac_persona`, `direccion_persona`, `email_persona`, `telefono_persona`, `borrado_persona`) VALUES
('45146319X', 'Fátima', 'Abad Lorenzo', '1997-10-12', 'Avenida de calle', 'fatima@gmail.com', '988776655', 0),
('45146321N', 'Ana', 'Abad Lorenzo', '2000-12-13', 'Avenida de Portugal', 'anaa1312@gmail.com', '988745241', 0);
UNLOCK TABLES;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proceso`
--

DROP TABLE IF EXISTS `proceso`;
CREATE TABLE `proceso` (
  `id_proceso` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_proceso` varchar(255) NOT NULL,
  `descripcion_proceso` text NOT NULL,
  `fecha_proceso` date NOT NULL,
  `borrado_proceso` int(11) NOT NULL,
  `version_proceso` varchar(4) NOT NULL,
  `check_aprobacion` int(11) NOT NULL,
  `formula_proceso` varchar(255) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `dni_usuario` varchar(9) NOT NULL,
  PRIMARY KEY (`id_proceso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proceso_usuario`
--

DROP TABLE IF EXISTS `proceso_usuario`;
CREATE TABLE `proceso_usuario` (
  `id_proceso_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_proceso_usuario` date NOT NULL,
  `calculo_huella_carbono` int(11) NOT NULL,
  `borrado_proceso_usuario` int(11) NOT NULL,
  `dni_usuario` varchar(9) NOT NULL,
  `id_proceso` int(11) NOT NULL,
  PRIMARY KEY (`id_proceso_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proceso_usuario_parametro`
--

DROP TABLE IF EXISTS `proceso_usuario_parametro`;
CREATE TABLE `proceso_usuario_parametro` (
  `id_proceso_usuario` int(11) NOT NULL,
  `id_parametro` int(11) NOT NULL,
  `valor_parametro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

DROP TABLE IF EXISTS `rol`;
CREATE TABLE `rol` (
  `id_rol` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(32) NOT NULL,
  `descripcion_rol` text NOT NULL,
  `borrado_rol` int(11) NOT NULL,
  PRIMARY KEY (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `rol`
--

LOCK TABLES `rol` WRITE;
INSERT INTO `rol` (`id_rol`, `nombre_rol`, `descripcion_rol`, `borrado_rol`) VALUES
(1, 'Administrador', 'Contendrá a todos los responsables de administrar la aplicación', 0),
(2, 'Usuario', 'Contendrá a todas las personas registradas en la aplicación', 0);
UNLOCK TABLES;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol_accion_funcionalidad`
--

DROP TABLE IF EXISTS `rol_accion_funcionalidad`;
CREATE TABLE `rol_accion_funcionalidad` (
  `id_rol` int(11) NOT NULL,
  `id_accion` int(11) NOT NULL,
  `id_funcionalidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

LOCK TABLES `rol_accion_funcionalidad` WRITE;
INSERT INTO `rol_accion_funcionalidad` (`id_rol`, `id_accion`, `id_funcionalidad`) VALUES
(1, 1, 1),
(1, 1, 2),
(1, 1, 3),
(1, 1, 4),
(1, 1, 8),
(1, 1, 9),
(1, 2, 1),
(1, 2, 2),
(1, 2, 3),
(1, 2, 4),
(1, 2, 8),
(1, 2, 9),
(1, 3, 1),
(1, 3, 2),
(1, 3, 3),
(1, 3, 4),
(1, 3, 8),
(1, 3, 9),
(1, 4, 1),
(1, 4, 2),
(1, 4, 3),
(1, 4, 4),
(1, 4, 8),
(1, 4, 9),
(1, 5, 1),
(1, 5, 2),
(1, 5, 3),
(1, 5, 4),
(1, 5, 8),
(1, 5, 9),
(1, 6, 1),
(1, 6, 2),
(1, 6, 8),
(1, 6, 9),
(2, 2, 4),
(2, 4, 4),
(2, 4, 9),
(2, 5, 4),
(2, 5, 9);
UNLOCK TABLES;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE `usuario` (
  `dni_usuario` varchar(9) NOT NULL,
  `usuario` varchar(48) NOT NULL,
  `passwd_usuario` varchar(32) NOT NULL,
  `borrado_usuario` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuario`
--

LOCK TABLES `usuario` WRITE;
INSERT INTO `usuario` (`dni_usuario`, `usuario`, `passwd_usuario`, `borrado_usuario`, `id_rol`) VALUES
('45146319X', 'fatima', 'b5d5f67b30809413156655abdda382a3', 0, 2),
('45146321N', 'anita1312', '83349cbdac695f3943635a4fd1aaa7d0', 0, 1);
UNLOCK TABLES;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `accion`
--
ALTER TABLE `accion`
  ADD UNIQUE KEY `nombre_accion` (`nombre_accion`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD UNIQUE KEY `nombre_categoria` (`nombre_categoria`),
  ADD KEY `dni_responsable_fk` (`dni_responsable`),
  ADD KEY `id_padre_categoria_fk` (`id_padre_categoria`);

--
-- Indices de la tabla `funcionalidad`
--
ALTER TABLE `funcionalidad`
  ADD UNIQUE KEY `nombre_funcionalidad` (`nombre_funcionalidad`);

--
-- Indices de la tabla `parametro`
--
ALTER TABLE `parametro`
  ADD KEY `id_proceso_fk` (`id_proceso`);

--
-- Indices de la tabla `persona`
--
ALTER TABLE `persona`
  ADD PRIMARY KEY (`dni_persona`);

--
-- Indices de la tabla `proceso`
--
ALTER TABLE `proceso`
  ADD UNIQUE KEY `nombre_proceso` (`nombre_proceso`),
  ADD KEY `id_categoria_fk` (`id_categoria`),
  ADD KEY `dni_usuario_fk_proceso` (`dni_usuario`);

--
-- Indices de la tabla `proceso_usuario`
--
ALTER TABLE `proceso_usuario`
  ADD KEY `dni_usuario_fk_procesousuario` (`dni_usuario`),
  ADD KEY `id_proceso_fk_procesousuario` (`id_proceso`);

--
-- Indices de la tabla `proceso_usuario_parametro`
--
ALTER TABLE `proceso_usuario_parametro`
  ADD PRIMARY KEY (`id_proceso_usuario`,`id_parametro`),
  ADD KEY `id_parametro_fk` (`id_parametro`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD UNIQUE KEY `nombre_rol` (`nombre_rol`);

--
-- Indices de la tabla `rol_accion_funcionalidad`
--
ALTER TABLE `rol_accion_funcionalidad`
  ADD PRIMARY KEY (`id_rol`,`id_accion`,`id_funcionalidad`),
  ADD KEY `id_accion_fk` (`id_accion`),
  ADD KEY `id_funcionalidad_fk` (`id_funcionalidad`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`dni_usuario`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD KEY `id_rol_fk` (`id_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `log_excepciones`
--
ALTER TABLE `log_excepciones`
  MODIFY `id_logExcepciones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `noticia`
--
ALTER TABLE `noticia`
  MODIFY `id_noticia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id_rol` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD CONSTRAINT `dni_responsable_fk` FOREIGN KEY (`dni_responsable`) REFERENCES `usuario` (`dni_usuario`),
  ADD CONSTRAINT `id_padre_categoria_fk` FOREIGN KEY (`id_padre_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Filtros para la tabla `parametro`
--
ALTER TABLE `parametro`
  ADD CONSTRAINT `id_proceso_fk` FOREIGN KEY (`id_proceso`) REFERENCES `proceso` (`id_proceso`);

--
-- Filtros para la tabla `proceso`
--
ALTER TABLE `proceso`
  ADD CONSTRAINT `dni_usuario_fk_proceso` FOREIGN KEY (`dni_usuario`) REFERENCES `usuario` (`dni_usuario`),
  ADD CONSTRAINT `id_categoria_fk` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);

--
-- Filtros para la tabla `proceso_usuario`
--
ALTER TABLE `proceso_usuario`
  ADD CONSTRAINT `dni_usuario_fk_procesousuario` FOREIGN KEY (`dni_usuario`) REFERENCES `usuario` (`dni_usuario`),
  ADD CONSTRAINT `id_proceso_fk_procesousuario` FOREIGN KEY (`id_proceso`) REFERENCES `proceso` (`id_proceso`);

--
-- Filtros para la tabla `proceso_usuario_parametro`
--
ALTER TABLE `proceso_usuario_parametro`
  ADD CONSTRAINT `id_parametro_fk` FOREIGN KEY (`id_parametro`) REFERENCES `parametro` (`id_parametro`),
  ADD CONSTRAINT `id_proceso_usuario_fk` FOREIGN KEY (`id_proceso_usuario`) REFERENCES `proceso_usuario` (`id_proceso_usuario`);

--
-- Filtros para la tabla `rol_accion_funcionalidad`
--
ALTER TABLE `rol_accion_funcionalidad`
  ADD CONSTRAINT `id_accion_fk` FOREIGN KEY (`id_accion`) REFERENCES `accion` (`id_accion`),
  ADD CONSTRAINT `id_funcionalidad_fk` FOREIGN KEY (`id_funcionalidad`) REFERENCES `funcionalidad` (`id_funcionalidad`),
  ADD CONSTRAINT `id_rol_fk_rolaccionfuncionalidad` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `dni_usuario_fk` FOREIGN KEY (`dni_usuario`) REFERENCES `persona` (`dni_persona`),
  ADD CONSTRAINT `id_rol_fk` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
