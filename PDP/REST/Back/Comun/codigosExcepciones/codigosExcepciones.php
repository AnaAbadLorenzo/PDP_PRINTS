<?php

define('AVANZAR_SIGUIENTE_CAMPO', 'Campo correcto');
define('TEST_ATRIBUTOS_LOGIN_OK', 'Los test de atributos para el login se han ejecutado correctamente');
define('TEST_ACCIONES_LOGIN_OK', 'Los test de acciones para el login se han ejecutado correctamente');
define('LOGIN_USUARIO_OK', 'El login de usuario se ha realizado correctamente');
define('TEST_ATRIBUTOS_REGISTRO_OK', 'Los test de atributos para el registro se han ejecutado correctamente');
define('TEST_ACCIONES_REGISTRO_OK', 'Los test de acciones para el registro se han ejecutado correctamente');
define('REGISTRO_USUARIO_OK', 'El registro del usuario se ha realizado correctamente');
define('TEST_ATRIBUTOS_RECUPERAR_PASS_OK', 'Los test de atributos para la recuperación de contraseña se han ejecutado correctamente');
define('TEST_ACCIONES_RECUPERAR_PASS_OK', 'Los test de acciones para para la recuperación de contraseña se han ejecutado correctamente');
define('TEST_ATRIBUTOS_GESTION_ACCIONES_OK', 'Los test de atributos para la gestión de acciones se han ejecutado correctamente');
define('TEST_ATRIBUTOS_GESTION_FUNCIONALIDADES_OK', 'Los test de atributos para la gestión de funcionalidades se han ejecutado correctamente');
define('TEST_ACCIONES_GESTION_ACCIONES_PASS_OK', 'Los test de acciones para para la gestión de acciones se han ejecutado correctamente');

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

define('NOMBRE_PERSONA_VACIO', 'El nombre de la persona no puede ser vacío');
define('NOMBRE_PERSONA_MENOR_QUE_3', 'El nombre de la persona no puede tener menos de 3 caracteres');
define('NOMBRE_PERSONA_MAYOR_QUE_128', 'El nombre de la persona no puede tener más de 128 caracteres');
define('NOMBRE_PERSONA_ALFABETICO_INCORRECTO', 'El nombre de la persona solo puede contener letras');

define('DNI_PERSONA_VACIO', 'El DNI de la persona no puede ser vacío');
define('DNI_PERSONA_MENOR_QUE_9', 'El DNI de la persona no puede tener menos de 9 caracteres');
define('DNI_PERSONA_MAYOR_QUE_9', 'El DNI de la persona no puede tener más de 9 caracteres');
define('DNI_PERSONA_ALFANUMERICO_INCORRECTO', 'El DNI de la persona solo puede tener números y una letra');
DEFINE('DNI_PERSONA_LETRA_INCORRECTO', 'La letra del DNI es incorrecta');

define('APELLIDOS_PERSONA_VACIO', 'Los apellidos de la persona no pueden ser vacíos');
define('APELLIDOS_PERSONA_MENOR_QUE_3', 'Los apellidos de la persona no puedeN tener menos de 3 caracteres');
define('APELLIDOS_PERSONA_MAYOR_QUE_128', 'Los apellidos de la persona no puede tener más de 128 caracteres');
define('APELLIDOS_PERSONA_ALFABETICO_INCORRECTO', 'Los apellidos de la persona solo pueden contener letras');

define('FECHA_NAC_PERSONA_VACIO', 'La fecha de nacimiento de la persona no puede ser vacía');
define('FECHA_NAC_PERSONA_MENOR_QUE_10', 'La fecha de nacimiento de la persona no puede tener menos de 8 caracteres');
define('FECHA_NAC_PERSONA_MAYOR_QUE_10', 'La fecha de nacimiento de la persona no puede tener más de 8 caracteres');
define('FECHA_NAC_PERSONA_FECHA_INCORRECTO', 'La fecha de nacimiento de la persona solo puede tener números y dos /');

define('DIRECCION_PERSONA_VACIO', 'La dirección de la persona no puede ser vacía');
define('DIRECCION_PERSONA_MENOR_QUE_3', 'La dirección de la persona no puede tener menos de 3 caracteres');
define('DIRECCION_PERSONA_MAYOR_QUE_256', 'La dirección de la persona no puede tener más de 256 caracteres');
define('DIRECCION_PERSONA_ALFANUMERICO_INCORRECTO', 'La dirección de la persona solo puede tener números y una letra');

define('EMAIL_PERSONA_VACIO', 'El email de la persona no puede ser vacío');
define('EMAIL_PERSONA_MENOR_QUE_3', 'El email de la persona no puede tener menos de 3 caracteres');
define('EMAIL_PERSONA_MAYOR_QUE_128', 'El email de la persona no puede tener más de 128 caracteres');
define('EMAIL_PERSONA_EMAIL_INCORRECTO', 'El email de la persona debe contener un @, letras y números');

define('TELEFONO_PERSONA_VACIO', 'El teléfono de la persona no puede ser vacío');
define('TELEFONO_PERSONA_MENOR_QUE_9', 'El teléfono de la persona no puede tener menos de 9 caracteres');
define('TELEFONO_PERSONA_MAYOR_QUE_9', 'El teléfono de la persona no puede tener más de 9 caracteres');
define('TELEFONO_PERSONA_NUMERICO_INCORRECTO', 'El teléfono de la persona solo debe contener un números');

define('USUARIO_NO_ENCONTRADO', 'El usuario no existe');
define('PASSWD_USUARIO_NO_COINCIDE', 'La contraseña introducida no coincide con la del usuario');

define('USUARIO_YA_EXISTE', 'El usuario ya existe');
define('PERSONA_YA_EXISTE', 'La persona ya existe');
define('DNI_NO_EXISTE', 'El DNI no existe');

define('NOMBRE_ACCION_VACIO', 'El nombre de la acción no puede ser vacío');
define('NOMBRE_ACCION_MENOR_QUE_3', 'El nombre de la acción no puede tener menos de 3 caracteres');
define('NOMBRE_ACCION_MAYOR_QUE_32', 'El nombre de la acción no puede tener más de 32 caracteres');
define('NOMBRE_ACCION_ALFABETICO_INCORRECTO', 'El nombre de la acción sólo puede contener letras');

define('DESCRIPCION_ACCION_VACIO', 'La descripción  de la acción no puede ser vacía');
define('DESCRIPCION_ACCION_MENOR_QUE_3', 'La descripción de la acción no puede tener menos de 3 caracteres');
define('DESCRIPCION_ACCION_ALFABETICO_INCORRECTO', 'La descripción de la acción sólo puede contener letras, acentos y espacios');

define('NOMBRE_FUNCIONALIDAD_VACIO', 'El nombre de la funcionalidad no puede ser vacío');
define('NOMBRE_FUNCIONALIDAD_MENOR_QUE_3', 'El nombre de la funcionalidad no puede tener menos de 3 caracteres');
define('NOMBRE_FUNCIONALIDAD_MAYOR_QUE_128', 'El nombre de la funcionalidad no puede tener más de 128 caracteres');
define('NOMBRE_FUNCIONALIDAD_ALFABETICO_INCORRECTO', 'El nombre de la funcionalidad sólo puede contener letras');

define('DESCRIPCION_FUNCIONALIDAD_VACIO', 'La descripción  de la funcionalidad no puede ser vacía');
define('DESCRIPCION_FUNCIONALIDAD_MENOR_QUE_3', 'La descripción de la funcionalidad no puede tener menos de 3 caracteres');
define('DESCRIPCION_FUNCIONALIDAD_ALFABETICO_INCORRECTO', 'La descripción de la funcionalidad sólo puede contener letras, acentos y espacios');

define('NOMBRE_ROL_VACIO', 'El nombre del rol no puede ser vacío');
define('NOMBRE_ROL_MENOR_QUE_3', 'El nombre del rol no puede tener menos de 3 caracteres');
define('NOMBRE_ROL_MAYOR_QUE_32', 'El nombre del rol no puede tener más de 32 caracteres');
define('NOMBRE_ROL_ALFABETICO_INCORRECTO', 'El nombre del rol sólo puede contener letras');

define('DESCRIPCION_ROL_VACIO', 'La descripción del rol no puede ser vacía');
define('DESCRIPCION_ROL_MENOR_QUE_3', 'La descripción del rol no puede tener menos de 3 caracteres');
define('DESCRIPCION_ROL_ALFABETICO_INCORRECTO', 'La descripción del rol sólo puede contener letras, acentos y espacios');

define('ADD_ACCION_COMPLETO', 'La acción se ha insertado correctamente');
define('ACCION_YA_EXISTE', 'La acción ya existe');
define('EDIT_ACCION_COMPLETO', 'La acción se ha editado correctamente');
define('ACCION_NO_EXISTE', 'La acción no existe');
define('DELETE_ACCION_COMPLETO', 'La acción se ha eliminado correctamente');
define('REACTIVAR_ACCION_CORRECTO', 'La acción se ha reactivado correctamente');
define('ACCION_TIENE_PERMISOS_ASOCIADOS', 'La acción está asociada a un usuario y a una funcionalidad');
?>