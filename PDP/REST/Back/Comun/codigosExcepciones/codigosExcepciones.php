<?php

define('AVANZAR_SIGUIENTE_CAMPO', 'Campo correcto');
define('TEST_ATRIBUTOS_LOGIN_OK', 'Los test de atributos para el login se han ejecutado correctamente');


define('TOKEN_CLAVE_VACIA', 'La clave del token no puede ser vacía');
define('TOKEN_INCORRECTO', 'El token es incorrecto');
define('TOKEN_HEADER_NO_VALIDO', 'La cabecera del token no es válida');
define('TOKEN_PAYLOAD_NO_VALIDO', 'El payload del token no es válido');
define('TOKEN_SIGN_NO_VALIDO', 'El token no es válido');
define('TOKEN_CADUCADO', 'El token se encuentra caducado');
define('TOKEN_FALLO_VERIFICACION_SIGN', 'No se ha podido verificar la firma del token');
define('CONEXION_BD_KO', 'No se ha podido establecer conexión con la BD');
define('SQL_KO', 'La sentencia SQL ha fallado');
define('TEST_FALLIDOS', 'Los test han fallado');

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

define('DNI_PERSONA_VACIO', 'El DNI de persona no puede ser vacío');
define('DNI_PERSONA_FORMATO_INCORRECTO', 'El DNI de persona es incorecto');
define('DNI_PERSONA_LETRA_INCORRECTO', 'La letra del DNI de persona es incorrecta');
define('NOMBRE_PERSONA_VACIO', 'El nombre de persona no puede ser vacío');
define('NOMBRE_PERSONA_MENOR_QUE_3', 'El nombre de persona no puede tener menos de 3 caracteres');
define('NOMBRE_PERSONA_MAYOR_QUE_56', 'El nombre de persona no puede tener más de 56 caracteres');
define('NOMBRE_PERSONA_FORMATO_INCORRECTO', 'El nombre de persona sólo puede contener letras y acentos');
define('APELLIDOS_PERSONA_VACIO', 'Los apellidos de persona no pueden ser vacíos');
define('APELLIDOS_PERSONA_MENOR_QUE_3', 'Los apellidos de persona no pueden tener menos de 3 caracteres');
define('APELLIDOS_PERSONA_MAYOR_QUE_128', 'Los apellidos de persona no pueden tener más de 128 caracteres');
define('APELLIDOS_PERSONA_FORMATO_INCORRECTO', 'Los apellidos de persona sólo pueden contender letras, acentos y espacios');
define('FECHA_NAC_PERSONA_VACIO', 'La fecha de nacimiento de persona no puede ser vacía');
define('FECHA_NAC_PERSONA_FORMATO_INCORRECTO', 'La fecha de persona es incorrecta');
define('DIRECCION_PERSONA_VACIO', 'La dirección persona no puede ser vacía');
define('DIRECCION_PERSONA_MENOR_QUE_3', 'La dirección de persona no puede tener menos de 3 caracteres');
define('DIRECCION_PERSONA_MAYOR_QUE_128', 'La dirección de persona no puede tener más de 128 caracteres');
define('DIRECCION_PERSONA_FORMATO_INCORRECTO', 'La dirección de persona es incorrecta');
define('EMAIL_PERSONA_VACIO', 'El email de persona no puede ser vacío');
define('EMAIL_PERSONA_MENOR_QUE_4', 'El email de persona no puede tener menos de 4 caracteres');
define('EMAIL_PERSONA_MAYOR_QUE_128', 'El email de persona no puede tener más de 128 caracteres');
define('EMAIL_PERSONA_FORMATO_INCORRECTO', 'El email de persona es incorrecto');
define('TELEFONO_PERSONA_VACIO', 'El teléfono de persona no puede ser vacío');
define('TELEFONO_PERSONA_EXACTA_9', 'El teléfono de persona debe tener 9 caracteres');
define('TELEFONO_PERSONA_FORMATO_INCORRECTO', 'El teléfono de persona sólo puede contener números');



?>