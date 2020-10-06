/*
MySQL Data Transfer
Source Host: localhost
Source Database: citriom
Target Host: localhost
Target Database: citriom
Date: 05/10/2020 07:47:00 p.m.
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for administradores
-- ----------------------------
DROP TABLE IF EXISTS `administradores`;
CREATE TABLE `administradores` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cedula` int(11) NOT NULL,
  `nombres` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `apellidos` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for peliculas
-- ----------------------------
DROP TABLE IF EXISTS `peliculas`;
CREATE TABLE `peliculas` (
  `id_pelicula` int(11) NOT NULL AUTO_INCREMENT,
  `pelicula` varchar(255) DEFAULT NULL,
  `anio` int(11) DEFAULT NULL,
  `genero` varchar(255) DEFAULT NULL,
  `conteo` int(10) DEFAULT NULL,
  PRIMARY KEY (`id_pelicula`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for votacion
-- ----------------------------
DROP TABLE IF EXISTS `votacion`;
CREATE TABLE `votacion` (
  `id_votacion` int(11) NOT NULL AUTO_INCREMENT,
  `id_pelicula` int(11) DEFAULT NULL,
  `usuario` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_votacion`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records 
-- ----------------------------
INSERT INTO `administradores` VALUES ('30', '17799537', 'Yeison ', 'Quintero', 'YQuintero', '$2y$10$Rwht86pvlvYkiBl8cbELIetHpxXATkaM3i2loFiymtses4Vughvcq', 'GtCtamGoPlrpwYsmPsjG7EbqsqzcKSoGVIsiNGrRivy6cezFRZVasb5mmaQL', '2019-08-08 09:11:16', '2020-10-05 18:08:08');
INSERT INTO `administradores` VALUES ('31', '15896475', 'Pedro', 'Perez', 'pperez', '$2y$10$Rwht86pvlvYkiBl8cbELIetHpxXATkaM3i2loFiymtses4Vughvcq', 'nMUg6E4bIjrkaeNCtzcOowyNoJuCqsMB5ZaA1h9rRSOxbbnYYTQKaL2TJ5Fu', '2020-10-05 07:37:33', '2020-10-05 18:08:41');
INSERT INTO `administradores` VALUES ('32', '18965236', 'Maria', 'Rodriguez', 'mrodriguez', '$2y$10$Rwht86pvlvYkiBl8cbELIetHpxXATkaM3i2loFiymtses4Vughvcq', 'oPNaJ72CPUxRK6x4nWZhNUW42mrPpVJGLtqYx6VsaSLPobkSNPwdT6HzNBJq', '2020-10-05 07:38:10', '2020-10-05 18:10:15');
INSERT INTO `peliculas` VALUES ('3', 'Irene yo y mi Otro yo', '2000', 'Comedia', '1');
INSERT INTO `peliculas` VALUES ('4', 'Midway', '2019', 'Otros', '1');
INSERT INTO `peliculas` VALUES ('5', 'Star Wars The Phamton Menace', '1999', 'Otros', '2');
INSERT INTO `votacion` VALUES ('1', '5', 'yquintero');
INSERT INTO `votacion` VALUES ('2', '5', 'pperez');
INSERT INTO `votacion` VALUES ('3', '3', 'pperez');
INSERT INTO `votacion` VALUES ('4', '4', 'mrodriguez');
INSERT INTO `votacion` VALUES ('5', '38', 'yquintero');
