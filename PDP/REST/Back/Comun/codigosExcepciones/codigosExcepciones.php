<?php

define('TOKEN_CLAVE_VACIA', 'La clave del token no puede ser vacía');
define('TOKEN_INCORRECTO', 'El token es incorrecto');
define('TOKEN_HEADER_NO_VALIDO', 'La cabecera del token no es válida');
define('TOKEN_PAYLOAD_NO_VALIDO', 'El payload del token no es válido');
define('TOKEN_SIGN_NO_VALIDO', 'El token no es válido');
define('TOKEN_CADUCADO', 'El token se encuentra caducado');
define('TOKEN_FALLO_VERIFICACION_SIGN', 'No se ha podido verificar la firma del token');
define('CONEXION_BD_KO', 'No se ha podido establecer conexión con la BD');
define('SQL_KO', 'La sentencia SQL ha fallado');

define('LOGIN_USUARIO_VACIO', 'El login del usuario no puede ser vacío');
define('LOGIN_USUARIO_MENOR_QUE_3', 'El login del usuario no puede tener menos de 3 caracteres');
define('LOGIN_USUARIO_MAYOR_QUE_48', 'El login del usuario no puede tener más de 48 caracteres');
define('LOGIN_USUARIO_ALFANUMERICO_INCORRECTO', 'El login del usuario solo puede contener números y letras');

define('PASSWD_USUARIO_VACIO', 'La contraseña del usuario no puede ser vacía');
define('PASSWD_USUARIO_MENOR_QUE_3', 'La contraseña del usuario no puede tener menos de 3 caracteres');
define('PASSWD_USUARIO_MAYOR_QUE_32', 'La contraseña del usuario no puede tener más de 32 caracteres');
define('PASSWD_USUARIO_ALFANUMERICO_INCORRECTO', 'La contraseña sólo puede contener números, letras y caracteres especiales');

define('USUARIO_NO_ENCONTRADO', 'El usuario no existe');
define('PASSWD_USUARIO_NO_COINCIDE', 'La contraseña introducida no coincide con la del usuario');

define('USUARIO_YA_EXISTE', 'El usuario ya existe');
define('DNI_YA_EXISTE', 'El DNI ya existe');
?>