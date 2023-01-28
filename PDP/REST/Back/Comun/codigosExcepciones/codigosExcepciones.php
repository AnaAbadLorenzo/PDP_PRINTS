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
define('TEST_ATRIBUTOS_GESTION_NOTICIAS_OK', 'Los test de atributos para la gestión de noticias se han ejecutado correctamente');
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



//CODIGOS_EXCEPCIONES_ATRIBUTOS 

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

define('ADD_USUARIO_COMPLETO', 'El usuario se ha insertado correctamente');
define('EDIT_PASS_USUARIO_COMPLETO', 'La contraseña del usuario se ha editado correctamente');
define('EDIT_USUARIO_COMPLETO', 'El rol del usuario se ha editado correctamente');
define('USUARIO_NO_EXISTE', 'El usuario no existe');
define('USUARIO_YA_EXISTE', 'El usuario ya existe');
define('DELETE_USUARIO_COMPLETO', 'El usuario ha sido eliminado correctamente');
define('PERSONA_YA_EXISTE', 'La persona ya existe');
define('DNI_NO_EXISTE', 'El DNI no existe');
define('REACTIVAR_USUARIO_CORRECTO', 'El usuario se ha reactivado correctamente');

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

define('NOMBRE_CATEGORIA_VACIO', 'El nombre de la categoria no puede ser vacío');
define('NOMBRE_CATEGORIA_MENOR_QUE_3', 'El nombre de la categoria no puede tener menos de 3 caracteres');
define('NOMBRE_CATEGORIA_MAYOR_QUE_128', 'El nombre de la categoria no puede tener más de 128 caracteres');
define('NOMBRE_CATEGORIA_ALFABETICO_INCORRECTO', 'El nombre de la categoria sólo puede contener letras');

define('DESCRIPCION_CATEGORIA_VACIO', 'La descripción  de la categoria no puede ser vacía');
define('DESCRIPCION_CATEGORIA_MENOR_QUE_3', 'La descripción de la categoria no puede tener menos de 3 caracteres');
define('DESCRIPCION_CATEGORIA_ALFABETICO_INCORRECTO', 'La descripción de la categoria sólo puede contener letras, acentos y espacios');

define('DNI_RESPONSABLE_VACIO', 'El DNI de la persona responsable no puede ser vacío');
define('DNI_RESPONSABLE_MENOR_QUE_9', 'El DNI de la persona responsable no puede tener menos de 9 caracteres');
define('DNI_RESPONSABLE_MAYOR_QUE_9', 'El DNI de la persona responsable no puede tener más de 9 caracteres');
define('DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO', 'El DNI de la persona responsable solo puede tener números y una letra');
DEFINE('DNI_RESPONSABLE_LETRA_INCORRECTO', 'La letra del DNI es incorrecta');

define('DESCRIPCION_FUNCIONALIDAD_VACIO', 'La descripción  de la funcionalidad no puede ser vacía');
define('DESCRIPCION_FUNCIONALIDAD_MENOR_QUE_3', 'La descripción de la funcionalidad no puede tener menos de 3 caracteres');
define('DESCRIPCION_FUNCIONALIDAD_ALFABETICO_INCORRECTO', 'La descripción de la funcionalidad sólo puede contener letras, acentos y espacios');

define('NOMBRE_FUNCIONALIDAD_VACIO', 'El nombre de la funcionalidad no puede ser vacío');
define('NOMBRE_FUNCIONALIDAD_MENOR_QUE_3', 'El nombre de la funcionalidad no puede tener menos de 3 caracteres');
define('NOMBRE_FUNCIONALIDAD_MAYOR_QUE_128', 'El nombre de la funcionalidad no puede tener más de 128 caracteres');
define('NOMBRE_FUNCIONALIDAD_ALFABETICO_INCORRECTO', 'El nombre de la funcionalidad sólo puede contener letras');

define('CONTENIDO_NOTICIA_VACIO', 'El contenido de la noticia no puede ser vací0');
define('CONTENIDO_NOTICIA_MENOR_QUE_3', 'El contenido de la noticia no puede tener menos de 3 caracteres');

define('FECHA_NOTICIA_VACIO', 'La fecha de la noticia no puede ser vacía');
define('FECHA_NOTICIA_MENOR_QUE_10', 'La fecha de la noticia no puede tener menos de 10 caracteres');
define('FECHA_NOTICIA_MAYOR_QUE_10', 'La fecha de la noticia no puede tener más de 8 caracteres');
define('FECHA_NOTICIA_INCORRECTO', 'La fecha de la noticia solo puede tener números y dos /');

define('TITULO_NOTICIA_VACIO', 'El titulo de la noticia no puede ser vacío');
define('TITULO_NOTICIA_MENOR_QUE_3', 'El titulo de la noticia no puede tener menos de 3 caracteres');
define('TITULO_NOTICIA_MAYOR_QUE_255', 'El titulo de la noticia no puede tener más de 255 caracteres');
define('TITULO_NOTICIA_ALFABETICO_INCORRECTO', 'El titulo de la noticia sólo puede contener letras');

define('DESCRIPCION_PARAMETRO_VACIO', 'La descripción  del parametro no puede ser vacía');
define('DESCRIPCION_PARAMETRO_MENOR_QUE_3', 'La descripción del parametro no puede tener menos de 3 caracteres');
define('DESCRIPCION_PARAMETRO_ALFANUMERICO_INCORRECTO', 'La descripción del parametro sólo puede contener letras, acentos y espacios');

define('PARAMETRO_FORMULA_VACIO', 'El parametro de la formula no puede ser vacía');
define('PARAMETRO_FORMULA_MAYOR_QUE_50', 'El parametro de la formula no puede ser mayor de 50');
define('PARAMETRO_FORMULA_INCORRECTO', 'Los parametros de la formula no aceptan cualquier tipo de caracter');

define('DESCRIPCION_PROCESO_VACIO', 'La descripción  del proceso no puede ser vacía');
define('DESCRIPCION_PROCESO_MENOR_QUE_3', 'La descripción del proceso no puede tener menos de 3 caracteres');
define('DESCRIPCION_PROCESO_ALFANUMERO_INCORRECTO', 'La descripcion del proceso no acepta cualquier tipo de caracter');

define('NOMBRE_PROCESO_VACIO', 'El nombre del proceso no puede ser vacío');
define('NOMBRE_PROCESO_MENOR_QUE_3', 'El nombre del proceso no puede tener menos de 3 caracteres');
define('NOMBRE_PROCESO_MAYOR_QUE_48', 'El nombre del proceso no puede tener más de 48 caracteres');
define('NOMBRE_PROCESO_ALFANUMERO_INCORRECTO', 'El nombre de la funcionalidadno acepta cualquier tipo de caracter');

define('CALCULO_HUELLA_CARBONO_VACIO', 'La huella de carbono no puede ser vacía');
define('CALCULO_HUELLA_CARBONO_MAYOR_QUE_80', 'El  calculo de la huella no puede tener más de 80 caracteres');
define('CALCULO_HUELLA_CARBONO_INCORRECTO', 'El calculo de la huella de carbono no acepta cualquier tipo de caracter');


define('FECHA_PROCESO_USUARIO_VACIO', 'La fecha del proceso de usuario no puede ser vacía');
define('FECHA_PROCESO_USUARIO_MENOR_10', 'La fecha del proceso usuario no puede tener menos de 10 caracteres');
define('FECHA_PROCESO_USUARIO_MAYOR_QUE_10', 'La fecha del proceso usuario no puede tener más de 10 caracteres');
define('FECHA_PROCESO_USUARIO_FECHA_INCORRECTO', 'La fecha del proceso usuario solo puede tener números y dos /');

define('VALOR_PARAMETRO_VACIO', 'El valor del parametro no puede ser vacía');
define('VALOR_PARAMETRO_ALFABETICO_INCORRECTO', 'El valor del parametro de carbono no acepta cualquier tipo de caracter');

//CODIGOS_EXCEPCIONES_ACCIONES
define('ADD_ACCION_COMPLETO', 'La acción se ha insertado correctamente');
define('ACCION_YA_EXISTE', 'La acción ya existe');
define('EDIT_ACCION_COMPLETO', 'La acción se ha editado correctamente');
define('ACCION_NO_EXISTE', 'La acción no existe');
define('DELETE_ACCION_COMPLETO', 'La acción se ha eliminado correctamente');
define('REACTIVAR_ACCION_CORRECTO', 'La acción se ha reactivado correctamente');
define('ACCION_TIENE_PERMISOS_ASOCIADOS', 'La acción está asociada a un usuario y a una funcionalidad');

define('ADD_NOTICIA_COMPLETO', 'La noticia se ha insertado correctamente');
define('NOTICIA_YA_EXISTE', 'La noticia ya existe');
define('EDIT_NOTICIA_COMPLETO', 'La noticia se ha editado correctamente');
define('NOTICIA_NO_EXISTE', 'La noticia no existe');
define('DELETE_NOTICIA_COMPLETO', 'La noticia se ha eliminado correctamente');

define('ADD_FUNCIONALIDAD_COMPLETO', 'La funcionalidad se ha insertado correctamente');
define('FUNCIONALIDAD_YA_EXISTE', 'La funcionalidad ya existe');
define('EDIT_FUNCIONALIDAD_COMPLETO', 'La funcionalidad se ha editado correctamente');
define('FUNCIONALIDAD_NO_EXISTE', 'La funcionalidad no existe');
define('DELETE_FUNCIONALIDAD_COMPLETO', 'La funcionalidad se ha eliminado correctamente');
define('REACTIVAR_FUNCIONALIDAD_CORRECTO', 'La funcionalidad se ha reactivado correctamente');
define('FUNCIONALIDAD_TIENE_PERMISOS_ASOCIADOS', 'La funcionalidad no puede eliminarse porque tiene permisos asociados');

define('ADD_ROL_COMPLETO', 'El rol se ha insertado correctamente');
define('ROL_YA_EXISTE', 'El rol ya existe');
define('EDIT_ROL_COMPLETO', 'El rol se ha editado correctamente');
define('ROL_NO_EXISTE', 'El rol no existe');
define('DELETE_ROL_COMPLETO', 'El rol se ha eliminado correctamente');
define('REACTIVAR_ROL_CORRECTO', 'El rol se ha reactivado correctamente');
define('ROL_TIENE_PERMISOS_ASOCIADOS', 'El rol no se puede borrar porque está asociado a una acción y a una funcionalidad');

define('ADD_PERSONA_COMPLETO', 'La persona se ha insertado correctamente');
define('EDIT_PERSONA_COMPLETO', 'La persona se ha editado correctamente');
define('PERSONA_NO_EXISTE', 'La persona no existe');
define('DELETE_PERSONA_COMPLETO', 'La persona se ha eliminado correctamente');


define('ADD_USUARIO_COMPLETO', 'El usuario se ha insertado correctamente');
define('EDIT_USUARIO_COMPLETO', 'El usuario se ha editado correctamente');
define('USUARIO_NO_EXISTE', 'El usuario no existe');
define('DELETE_USUARIO_COMPLETO', 'El usuario se ha eliminado correctamente');
?>