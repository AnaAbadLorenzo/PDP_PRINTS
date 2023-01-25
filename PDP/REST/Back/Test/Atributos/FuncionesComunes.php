<?php

include_once './Comun/codigosExcepciones/codigosExcepciones.php';
class FuncionesComunes {

    function __construct(){}
    function comprobarAtributoBlank($atributo, $funcionalidad, $nombreAtributo){
        $mensaje = '';
        if(empty($atributo)){
            switch($funcionalidad){
                case 'login' :
                    switch($nombreAtributo){
                        case 'usuario':
                            $mensaje = 'LOGIN_USUARIO_VACIO'. " - ".LOGIN_USUARIO_VACIO;
                        break; 
                        case 'passwd_usuario':
                            $mensaje = 'PASSWD_USUARIO_VACIO'. " - ".PASSWD_USUARIO_VACIO;
                    }
                break;
                case 'registro' :
                    switch($nombreAtributo){
                        case 'dni_persona':
                            $mensaje = 'DNI_PERSONA_VACIO'. " - ". DNI_PERSONA_VACIO;
                        break;
                        case 'nombre_persona':
                            $mensaje = 'NOMBRE_PERSONA_VACIO'. " - ". NOMBRE_PERSONA_VACIO;
                        break;
                        case 'apellidos_persona':
                            $mensaje = 'APELLIDOS_PERSONA_VACIO'. " - ". APELLIDOS_PERSONA_VACIO;
                        break;
                        case 'fecha_nac_persona':
                            $mensaje = 'FECHA_NAC_PERSONA_VACIO'. " - ". FECHA_NAC_PERSONA_VACIO;
                        break;
                        case 'direccion_persona':
                            $mensaje = 'DIRECCION_PERSONA_VACIO'. " - ". DIRECCION_PERSONA_VACIO;
                        break;
                        case 'email_persona':
                            $mensaje = 'EMAIL_PERSONA_VACIO'. " - ". EMAIL_PERSONA_VACIO;
                        break;
                        case 'telefono_persona':
                            $mensaje = 'TELEFONO_PERSONA_VACIO'. " - ". TELEFONO_PERSONA_VACIO;
                        break;
                    }
                break;
                case 'gestAcciones':
                    switch($nombreAtributo){
                        case 'nombre_accion':
                            $mensaje = 'NOMBRE_ACCION_VACIO'. " - ". NOMBRE_ACCION_VACIO;
                        break;
                        case 'descripcion_accion':
                            $mensaje = 'DESCRIPCION_ACCION_VACIO'. " - ". DESCRIPCION_ACCION_VACIO;
                        break;
                    }
                break;
                case 'gestCategorias':
                    switch($nombreAtributo){
                        case 'nombre_categoria':
                            $mensaje = 'NOMBRE_CATEGORIA_VACIO'. " - ". NOMBRE_CATEGORIA_VACIO;
                        break;
                        case 'descripcion_categoria':
                            $mensaje = 'DESCRIPCION_CATEGORIA_VACIO'. " - ". DESCRIPCION_CATEGORIA_VACIO;
                        break;
                        case 'dni_responsable':
                            $mensaje = 'DNI_RESPONSABLE_VACIO'. " - ". DNI_RESPONSABLE_VACIO;
                        break;
                    }
                break;
                case 'gestFuncionalidades':
                    switch($nombreAtributo){
                        case 'nombre_funcionalidad':
                            $mensaje = 'NOMBRE_FUNCIONALIDAD_VACIO'. " - ". NOMBRE_FUNCIONALIDAD_VACIO;
                        break;
                        case 'descripcion_funcionalidad':
                            $mensaje = 'DESCRIPCION_FUNCIONALIDAD_VACIO'. " - ". DESCRIPCION_FUNCIONALIDAD_VACIO;
                        break;
                    }
                break;
                case 'gestRoles':
                    switch($nombreAtributo){
                        case 'nombre_rol':
                            $mensaje = 'NOMBRE_ROL_VACIO'. " - ". NOMBRE_ROL_VACIO;
                        break;
                        case 'descripcion_rol':
                            $mensaje = 'DESCRIPCION_ROL_VACIO'. " - ". DESCRIPCION_ROL_VACIO;
                        break;
                    }
                break;
                case 'gestNoticias':
                    switch($nombreAtributo){
                        case 'titulo_noticia':
                            $mensaje = 'TITULO_NOTICIA_VACIO'. " - ". TITULO_NOTICIA_VACIO;
                        break;
                        case 'contenido_noticia':
                            $mensaje = 'CONTENIDO_NOTICIA_VACIO'. " - ". CONTENIDO_NOTICIA_VACIO;
                        break;
                        case 'fecha_noticia':
                            $mensaje = 'FECHA_NOTICIA_VACIO'. " - ". FECHA_NOTICIA_VACIO;
                        break;
                    }
                break;
                case: 'gestParametros':
                    switch($nombreAtributo){
                        case: 'parametro_formula':
                            $mensaje = 'PARAMETRO_FORMULA_VACIO'. " - ". PARAMETRO_FORUMLA_VACIO;
                        break; 
                        case 'descripcion_parametro':
                            $mensaje = 'DESCRIPCION_PARAMETRO_VACIO'. " - ". DESCRIPCION_PARAMETRO_VACIO;
                        break;

                    }
                break;
                case 'gestProcesos':
                    switch($nombreAtributo){
                        case 'nombre_proceso':
                            $mensaje = 'NOMBRE_PROCESO_VACIO'. " - ". NOMBRE_PROCESO_VACIO;
                        break;
                        case 'descripcion_proceso':
                            $mensaje = 'DESCRIPCION_PROCESO_VACIO'. " - ". DESCRIPCION_PROCESO_VACIO;
                        break;
                    }
                break;
                case 'gestProcesosusuario':
                    switch($nombreAtributo){
                        case 'fecha_proceso_usuario':
                            $mensaje = 'FECHA_PROCESO_USUARIO_VACIO'. " - ". FECHA_PROCESO_USUARIO_VACIO;
                        break;
                        case 'calculo_huella_carbono':
                            $mensaje = 'CALCULO_HUELLA_CARBONO_VACIO'. " - ". CALCULO_HUELLA_CARBONO_VACIO;
                        break;
                    }
                break;
                case 'gestProcesosusuarioparametro' :
                    switch($nombreAtributo){
                        case 'valor_parametro':
                            $mensaje = 'VALOR_PARAMETRO_VACIO'. " - ".VALOR_PARAMETRO_VACIO;
                        break; 
                    }
                break;
                
            }
        }

        return $mensaje;
    }
    function comprobarAtributosLongitudMenor($atributo, $funcionalidad, $nombreAtributo, $tamanhoMinimo){
        $mensaje = '';
        if(strlen($atributo)<$tamanhoMinimo){
            switch($funcionalidad){
                case 'login' :
                    switch($nombreAtributo){
                        case 'usuario':
                            $mensaje = 'LOGIN_USUARIO_MENOR_QUE_3'." - ".LOGIN_USUARIO_MENOR_QUE_3;
                        break; 
                        case 'passwd_usuario':
                            $mensaje = 'PASSWD_USUARIO_MENOR_QUE_3'." - ".PASSWD_USUARIO_MENOR_QUE_3;
                        break; 
                    }
                break;
                case 'registro' :
                    switch($nombreAtributo){
                        case 'dni_persona':
                            $mensaje = 'DNI_PERSONA_MENOR_QUE_9'. " - ". DNI_PERSONA_MENOR_QUE_9;
                        break;
                        case 'nombre_persona':
                            $mensaje = 'NOMBRE_PERSONA_MENOR_QUE_3'. " - ". NOMBRE_PERSONA_MENOR_QUE_3;
                        break;
                        case 'apellidos_persona':
                            $mensaje = 'APELLIDOS_PERSONA_MENOR_QUE_3'. " - ". APELLIDOS_PERSONA_MENOR_QUE_3;
                        break;
                        case 'fecha_nac_persona':
                            $mensaje = 'FECHA_NAC_PERSONA_MENOR_QUE_10'. " - ". FECHA_NAC_PERSONA_MENOR_QUE_10;
                        break;
                        case 'direccion_persona':
                            $mensaje = 'DIRECCION_PERSONA_MENOR_QUE_3'. " - ". DIRECCION_PERSONA_MENOR_QUE_3;
                        break;
                        case 'email_persona':
                            $mensaje = 'EMAIL_PERSONA_MENOR_QUE_3'. " - ". EMAIL_PERSONA_MENOR_QUE_3;
                        break;
                        case 'telefono_persona':
                            $mensaje = 'TELEFONO_PERSONA_MENOR_QUE_9'. " - ". TELEFONO_PERSONA_MENOR_QUE_9;
                        break;
                    }
                break;
                case 'gestAcciones':
                    switch($nombreAtributo){
                        case 'nombre_accion':
                            $mensaje = 'NOMBRE_ACCION_MENOR_QUE_3'. " - ". NOMBRE_ACCION_MENOR_QUE_3;
                        break;
                        case 'descripcion_accion':
                            $mensaje = 'DESCRIPCION_ACCION_MENOR_QUE_3'. " - ". DESCRIPCION_ACCION_MENOR_QUE_3;
                        break;
                    }
                break;
                case 'gestCategorias':
                    switch($nombreAtributo){
                        case 'nombre_categoria':
                            $mensaje = 'NOMBRE_CATEGORIA_MENOR_QUE_3'. " - ". NOMBRE_CATEGORIA_MENOR_QUE_3;
                        break;
                        case 'descripcion_categoria':
                            $mensaje = 'DESCRIPCION_CATEGORIA_MENOR_QUE_3'. " - ". DESCRIPCION_CATEGORIA_MENOR_QUE_3;
                        break;
                        case 'dni_responsable':
                            $mensaje = 'DNI_RESPONSABLE_MENOR_QUE_9'. " - ". DNI_RESPONSABLE_MENOR_QUE_9;
                        break;
                    }
                break;
                case 'gestFuncionalidades':
                    switch($nombreAtributo){
                        case 'nombre_funcionalidad':
                            $mensaje = 'NOMBRE_FUNCIONALIDAD_MENOR_QUE_3'. " - ". NOMBRE_FUNCIONALIDAD_MENOR_QUE_3;
                        break;
                        case 'descripcion_funcionalidad':
                            $mensaje = 'DESCRIPCION_FUNCIONALIDAD_MENOR_QUE_3'. " - ". DESCRIPCION_FUNCIONALIDAD_MENOR_QUE_3;
                        break;
                    }
                break;
                case 'gestRoles':
                    switch($nombreAtributo){
                        case 'nombre_rol':
                            $mensaje = 'NOMBRE_ROL_MENOR_QUE_3'. " - ". NOMBRE_ROL_MENOR_QUE_3;
                        break;
                        case 'descripcion_rol':
                            $mensaje = 'DESCRIPCION_ROL_MENOR_QUE_3'. " - ". DESCRIPCION_ROL_MENOR_QUE_3;
                        break;
                    }
                break;
                case 'gestNoticias':
                    switch($nombreAtributo){
                        case 'titulo_noticia':
                            $mensaje = 'TITULO_NOTICIA_MENOR_QUE_3'. " - ". TITULO_NOTICIA_MENOR_QUE_3;
                        break;
                        case 'contenido_noticia':
                            $mensaje = 'CONTENIDO_NOTICIA_MENOR_QUE_3'. " - ". CONTENIDO_NOTICIA_MENOR_QUE_3;
                        break;
                        case 'fecha_noticia':
                            $mensaje = 'FECHA_NOTICIA_MENOR_QUE_10'. " - ". FECHA_NOTICIA_MENOR_QUE_10;
                        break:
                    }
                case 'gestParametros':
                    switch($nombreAtributo){
                        case 'descripcion_parametro':
                            $mensaje = 'DESCRIPCION_PARAMETRO_MENOR_QUE_3'. " - ". DESCRIPCION_PARAMETRO_MENOR_QUE_3;
                        break;
                    }
                break;
                case 'gestProcesos':
                    switch($nombreAtributo){
                        case 'nombre_proceso':
                            $mensaje = 'NOMBRE_PROCESO_MENOR_QUE_3'. " - ". NOMBRE_PROCESO_MENOR_QUE_3;
                        break;
                        case 'descripcion_proceso':
                            $mensaje = 'DESCRIPCION_PROCESO_MENOR_QUE_3'. " - ". DESCRIPCION_PROCESO_MENOR_QUE_3;
                        break;
                    }
                break;
                case 'gestProcesosusuario':
                    switch($nombreAtributo){
                        case 'fecha_proceso_usuario':
                            $mensaje = 'FECHA_PROCESO_USUARIO_MENOR_10'. " - ". FECHA_PROCESO_USUARIO_MENOR_10;
                        break;
                    }
                break;
                
            }
        }

        return $mensaje;
    }

    function comprobarAtributosLongitudMayor($atributo, $funcionalidad, $nombreAtributo, $tamanhoMaximo){
        $mensaje = '';
        if(strlen($atributo) > $tamanhoMaximo){
            switch($funcionalidad){
                case 'login' :
                    switch($nombreAtributo){
                        case 'usuario':
                            $mensaje = 'LOGIN_USUARIO_MAYOR_QUE_48'." - ".LOGIN_USUARIO_MAYOR_QUE_48;
                        break; 
                        case 'passwd_usuario':
                            $mensaje = 'PASSWD_USUARIO_MAYOR_QUE_32'." - ".PASSWD_USUARIO_MAYOR_QUE_32;
                        break; 
                    }
                break;
                case 'registro' :
                    switch($nombreAtributo){
                        case 'dni_persona':
                            $mensaje = 'DNI_PERSONA_MAYOR_QUE_9'. " - ". DNI_PERSONA_MAYOR_QUE_9;
                        break;
                        case 'nombre_persona':
                            $mensaje = 'NOMBRE_PERSONA_MAYOR_QUE_128'. " - ". NOMBRE_PERSONA_MAYOR_QUE_128;
                        break;
                        case 'apellidos_persona':
                            $mensaje = 'APELLIDOS_PERSONA_MAYOR_QUE_128'. " - ". APELLIDOS_PERSONA_MAYOR_QUE_128;
                        break;
                        case 'fecha_nac_persona':
                            $mensaje = 'FECHA_NAC_PERSONA_MAYOR_QUE_10'. " - ". FECHA_NAC_PERSONA_MAYOR_QUE_10;
                        break;
                        case 'direccion_persona':
                            $mensaje = 'DIRECCION_PERSONA_MAYOR_QUE_256'. " - ". DIRECCION_PERSONA_MAYOR_QUE_256;
                        break;
                        case 'email_persona':
                            $mensaje = 'EMAIL_PERSONA_MAYOR_QUE_128'. " - ". EMAIL_PERSONA_MAYOR_QUE_128;
                        break;
                        case 'telefono_persona':
                            $mensaje = 'TELEFONO_PERSONA_MAYOR_QUE_9'. " - ". TELEFONO_PERSONA_MAYOR_QUE_9;
                        break;
                    }
                break;
                case 'gestAcciones':
                    switch($nombreAtributo){
                        case 'nombre_accion':
                            $mensaje = 'NOMBRE_ACCION_MAYOR_QUE_32'. " - ". NOMBRE_ACCION_MAYOR_QUE_32;
                        break;
                    }
                break;
                case 'gestCategorias':
                    switch($nombreAtributo){
                        case 'nombre_categoria':
                            $mensaje = 'NOMBRE_CATEGORIA_MAYOR_QUE_48'. " - ". NOMBRE_CATEGORIA_MAYOR_QUE_48;
                        break;
                        case 'dni_responsable':
                            $mensaje = 'DNI_RESPONSABLE_MAYOR_QUE_9'. " - ". DNI_RESPONSABLE_MAYOR_QUE_9;
                        break;
                    }
                break;
                case 'gestFuncionalidades':
                    switch($nombreAtributo){
                        case 'nombre_funcionalidad':
                            $mensaje = 'NOMBRE_FUNCIONALIDAD_MAYOR_QUE_128'. " - ". NOMBRE_FUNCIONALIDAD_MAYOR_QUE_128;
                        break;
                    }
                break;
                case 'gestRoles':
                    switch($nombreAtributo){
                        case 'nombre_rol':
                            $mensaje = 'NOMBRE_ROL_MAYOR_QUE_32'. " - ". NOMBRE_ROL_MAYOR_QUE_32;
                        break;
                    }
                break;
                case 'gestNoticias':
                    switch($nombreAtributo){
                        case 'titulo_noticia':
                            $mensaje = 'TITULO_NOTICIA_MAYOR_QUE_255'. " - ". TITULO_NOTICIA_MAYOR_QUE_255;
                        break;
                        case 'fecha_noticia':
                            $mensaje = 'FECHA_NOTICIA_MAYOR_QUE_10'. " - ". FECHA_NOTICIA_MAYOR_QUE_10;
                        break;
                    }
                break;
                case: 'gestParametros':
                    switch($nombreAtributo){
                        case: 'parametro_formula':
                            $mensaje = 'PARAMETRO_FORMULA_MAYOR_QUE_50'. " - ". PARAMETRO_FORUMLA_MAYOR_QUE_50;
                        break; 
                    }
                break;
                case 'gestProcesos':
                    switch($nombreAtributo){
                        case 'nombre_proceso':
                            $mensaje = 'NOMBRE_PROCESO_MAYOR_QUE_48'. " - ". NOMBRE_PROCESO_MENOR_QUE_3;
                        break;
                break;
            }
            case 'gestProcesosusuario':
                switch($nombreAtributo){
                    case 'fecha_proceso_usuario':
                        $mensaje = 'FECHA_PROCESO_USUARIO_MAYOR_10'. " - ". FECHA_PROCESO_USUARIO_MAYOR_10;
                    break;
                    case 'calculo_huella_carbono':
                        $mensaje = 'CALCULO_HUELLA_CARBONO_MAYOR_QUE_80'. " - ". CALCULO_HUELLA_CARBONO_MAYOR_QUE_80;
                    break;
                }
            break;
                
            }
        }

        return $mensaje;
    }

    function comprobarAtributoEnhe($atributo, $funcionalidad, $nombreAtributo) {
        $mensaje = '';
        $patronEnhe = '/[ñÑ]/';
        preg_match($patronEnhe, $atributo, $matches, PREG_UNMATCHED_AS_NULL);

        if(!empty($matches)){
            switch($funcionalidad){
                case 'login' :
                    switch($nombreAtributo){
                        case 'usuario':
                            $mensaje = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO'." - ".LOGIN_USUARIO_ALFANUMERICO_INCORRECTO;
                        break; 
                        case 'passwd_usuario':
                            $mensaje = 'PASSWD_USUARIO_ALFANUMERICO_INCORRECTO'." - ".PASSWD_USUARIO_ALFANUMERICO_INCORRECTO;
                        break; 
                    }
                break;
                case 'registro' :
                    switch($nombreAtributo){
                        case 'dni_persona':
                            $mensaje = 'DNI_PERSONA_ALFANUMERICO_INCORRECTO'. " - ". DNI_PERSONA_ALFANUMERICO_INCORRECTO;
                        break;
                        case 'fecha_nac_persona':
                            $mensaje = 'FECHA_NAC_PERSONA_FECHA_INCORRECTO'. " - ". FECHA_NAC_PERSONA_FECHA_INCORRECTO;
                        break;
                        case 'email_persona':
                            $mensaje = 'EMAIL_PERSONA_EMAIL_INCORRECTO'. " - ". EMAIL_PERSONA_EMAIL_INCORRECTO;
                        break;
                        case 'telefono_persona':
                            $mensaje = 'TELEFONO_PERSONA_NUMERICO_INCORRECTO'. " - ". TELEFONO_PERSONA_NUMERICO_INCORRECTO;
                        break;
                    }
                break;
                case 'gestCategorias' :
                    switch($nombreAtributo){
                        case 'dni_responsable':
                            $mensaje = 'DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO'. " - ". DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO;   
                        break;
                    }
                break;
                case 'gestNoticias' :
                    switch($nombreAtributo){
                        case 'fecha_noticia':
                            $mensaje = 'FECHA_NOTICIA_INCORRECTO'. " - ". FECHA_NOTICIA_INCORRECTO;
                        break;
                    }
                break;
                case: 'gestParametros':
                    switch($nombreAtributo){
                        case: 'parametro_formula':
                            $mensaje = 'PARAMETRO_FORMULA_INCORRECTO'. " - ". PARAMETRO_FORMULA_INCORRECTO;
                        break; 

                    }
                break;
                case 'gestProcesosusuario':
                    switch($nombreAtributo){
                        case 'fecha_proceso_usuario':
                            $mensaje = 'FECHA_PROCESO_USUARIO_FECHA_INCORRECTO'. " - ". FECHA_PROCESO_USUARIO_FECHA_INCORRECTO;
                        break;
                        case 'calculo_huella_carbono':
                            $mensaje = 'CALCULO_HUELLA_CARBONO_INCORRECTO'. " - ". CALCULO_HUELLA_CARBONO_INCORRECTO;
                        break;
                    }
                break;
                case 'gestProcesosusuarioparametro' :
                    switch($nombreAtributo){
                        case 'valor_parametro':
                            $mensaje = 'VALOR_PARAMETRO_ALFABETICO_INCORRECTO'. " - ".VALOR_PARAMETRO_ALFABETICO_INCORRECTO;
                        break; 
                    }
                break;
                
            }
        }

        return $mensaje;
    }

    function comprobarAtributoAcentos($atributo, $funcionalidad, $nombreAtributo) {
        $mensaje = '';
        $patronAcentos = '/[áéíóúÁÉÍÓÚ]/';
        preg_match($patronAcentos, $atributo, $matches, PREG_UNMATCHED_AS_NULL);

        if(!empty($matches)){
            switch($funcionalidad){
                case 'login' :
                    switch($nombreAtributo){
                        case 'usuario':
                            $mensaje = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO'." - ".LOGIN_USUARIO_ALFANUMERICO_INCORRECTO;
                        break;
                        case 'passwd_usuario':
                            $mensaje = 'PASSWD_USUARIO_ALFANUMERICO_INCORRECTO'." - ".PASSWD_USUARIO_ALFANUMERICO_INCORRECTO;
                        break; 
                    }
                break;
                case 'registro' :
                    switch($nombreAtributo){
                        case 'dni_persona':
                            $mensaje = 'DNI_PERSONA_ALFANUMERICO_INCORRECTO'. " - ". DNI_PERSONA_ALFANUMERICO_INCORRECTO;
                        break;
                        case 'fecha_nac_persona':
                            $mensaje = 'FECHA_NAC_PERSONA_FECHA_INCORRECTO'. " - ". FECHA_NAC_PERSONA_FECHA_INCORRECTO;
                        break;
                        case 'email_persona':
                            $mensaje = 'EMAIL_PERSONA_EMAIL_INCORRECTO'. " - ".EMAIL_PERSONA_EMAIL_INCORRECTO;
                        break;
                        case 'telefono_persona':
                            $mensaje = 'TELEFONO_PERSONA_NUMERICO_INCORRECTO'. " - ". TELEFONO_PERSONA_NUMERICO_INCORRECTO;
                        break;
                    }
                break;
                case 'gestCategorias' :
                    switch($nombreAtributo){
                        case 'dni_responsable':
                            $mensaje = 'DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO'. " - ". DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO;   
                        break;
                    }
                case 'gestNoticias' :
                    switch($nombreAtributo){
                        case 'fecha_noticia':
                            $mensaje = 'FECHA_NOTICIA_ALFANUMERICO_INCORRECTO'. " - ". FECHA_NOTICIA_ALFANUMERICO_INCORRECTO;
                        break;
                        }
                break;
                case: 'gestParametros':
                    switch($nombreAtributo){
                        case: 'parametro_formula':
                            $mensaje = 'PARAMETRO_FORMULA_INCORRECTO'. " - ". PARAMETRO_FORMULA_INCORRECTO;
                        break; 

                    }
                break;
                case 'gestProcesosusuario':
                    switch($nombreAtributo){
                        case 'fecha_proceso_usuario':
                            $mensaje = 'FECHA_PROCESO_USUARIO_FECHA_INCORRECTO'. " - ". FECHA_PROCESO_USUARIO_FECHA_INCORRECTO;
                        break;
                        case 'calculo_huella_carbono':
                            $mensaje = 'CALCULO_HUELLA_CARBONO_INCORRECTO'. " - ". CALCULO_HUELLA_CARBONO_INCORRECTO;
                        break;
                    }
                break;
            }
        }

        return $mensaje;
    }

    function comprobarAtributoCaracteresEspeciales($atributo, $funcionalidad, $nombreAtributo) {
        $mensaje = '';
        $patronCaracteresEspeciales = '[/¡/!/¿/?/@/#/$/%/(/)/=/+/-/€/./,//]';
        preg_match_all($patronCaracteresEspeciales, $atributo, $matches, PREG_UNMATCHED_AS_NULL);

        if(!empty($matches)){
            switch($funcionalidad){
                case 'login' :
                    switch($nombreAtributo){
                        case 'usuario':
                            $mensaje = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO'." - ".LOGIN_USUARIO_ALFANUMERICO_INCORRECTO;
                        break; 
                        case 'passwd_usuario':
                            $mensaje = 'PASSWD_USUARIO_ALFANUMERICO_INCORRECTO'." - ".PASSWD_USUARIO_ALFANUMERICO_INCORRECTO;
                        break; 
                    }
                break;
                case 'registro' :
                    switch($nombreAtributo){
                        case 'dni_persona':
                            $mensaje = 'DNI_PERSONA_ALFANUMERICO_INCORRECTO'. " - ". DNI_PERSONA_ALFANUMERICO_INCORRECTO;
                        break;
                        case 'nombre_persona':
                            $mensaje = 'NOMBRE_PERSONA_ALFABETICO_INCORRECTO'. " - ". NOMBRE_PERSONA_ALFABETICO_INCORRECTO;
                        break;
                        case 'apellidos_persona':
                            $mensaje = 'APELLIDOS_PERSONA_ALFABETICO_INCORRECTO'. " - ". APELLIDOS_PERSONA_ALFABETICO_INCORRECTO;
                        break;
                        case 'fecha_nac_persona':
                            $mensaje = 'FECHA_NAC_PERSONA_FECHA_INCORRECTO'. " - ". FECHA_NAC_PERSONA_FECHA_INCORRECTO;
                        break;
                        case 'direccion_persona':
                            $mensaje = 'DIRECCION_PERSONA_ALFANUMERICO_INCORRECTO'. " - ". DIRECCION_PERSONA_ALFANUMERICO_INCORRECTO;
                        break;
                        case 'telefono_persona':
                            $mensaje = 'TELEFONO_PERSONA_NUMERICO_INCORRECTO'. " - ". TELEFONO_PERSONA_NUMERICO_INCORRECTO;
                        break;
                    }
                break;
                case 'gestAcciones':
                    switch($nombreAtributo){
                        case 'nombre_accion':
                            $mensaje = 'NOMBRE_ACCION_ALFABETICO_INCORRECTO'. " - ". NOMBRE_ACCION_ALFABETICO_INCORRECTO;
                        break;
                        case 'descripcion_accion':
                            $mensaje = 'DESCRIPCION_ACCION_ALFABETICO_INCORRECTO'. " - ". DESCRIPCION_ACCION_ALFABETICO_INCORRECTO;
                        break;
                    }
                break;
                case 'gestCategorias':
                    switch($nombreAtributo){
                        case 'nombre_categoria':
                            $mensaje = 'NOMBRE_CATEGORIA_ALFABETICO_INCORRECTO'. " - ". NOMBRE_CATEGORIA_ALFABETICO_INCORRECTO;
                        break;
                        case 'descripcion_categoria':
                            $mensaje = 'DESCRIPCION_CATEGORIA_ALFABETICO_INCORRECTO'. " - ". DESCRIPCION_CATEGORIA_ALFABETICO_INCORRECTO;
                        break;
                        case 'dni_responsable':
                            $mensaje = 'DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO'. " - ". DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO;
                        break;
                    }
                break;
                case 'gestFuncionalidades':
                    switch($nombreAtributo){
                        case 'nombre_funcionalidad':
                            $mensaje = 'NOMBRE_FUNCIONALIDAD_ALFABETICO_INCORRECTO'. " - ". NOMBRE_FUNCIONALIDAD_ALFABETICO_INCORRECTO;
                        break;
                        case 'descripcion_funcionalidad':
                            $mensaje = 'DESCRIPCION_FUNCIONALIDAD_ALFABETICO_INCORRECTO'. " - ". DESCRIPCION_FUNCIONALIDAD_ALFABETICO_INCORRECTO;
                        break;
                    }
                break;
                case 'gestRoles':
                    switch($nombreAtributo){
                        case 'nombre_rol':
                            $mensaje = 'NOMBRE_ROL_ALFABETICO_INCORRECTO'. " - ". NOMBRE_ROL_ALFABETICO_INCORRECTO;
                        break;
                        case 'descripcion_rol':
                            $mensaje = 'DESCRIPCION_ROL_ALFABETICO_INCORRECTO'. " - ". DESCRIPCION_ROL_ALFABETICO_INCORRECTO;
                        break;
                    }
                break;
                case 'gestNoticias':
                    switch($nombreAtributo){
                        case 'titulo_noticia':
                            $mensaje = 'TITULO_NOTICIA_ALFABETICO_INCORRECTO'. " - ". NOMBRE_ROL_ALFABETICO_INCORRECTO;
                        break;
                        case 'descripcion_rol':
                            $mensaje = 'DESCRIPCION_ROL_ALFABETICO_INCORRECTO'. " - ". DESCRIPCION_ROL_ALFABETICO_INCORRECTO;
                        break;
                        case 'fecha_noticia':
                            $mensaje = 'FECHA_NOTICIA_ALFANUMERICO_INCORRECTO'. " - ". FECHA_NOTICIA_ALFANUMERICO_INCORRECTO;
                        break;
                    }

                break;
                case: 'gestParametros':
                    switch($nombreAtributo){
                        case: 'parametro_formula':
                            $mensaje = 'PARAMETRO_FORMULA_INCORRECTO'. " - ". PARAMETRO_FORMULA_INCORRECTO;
                        break; 
                        case 'descripcion_parametro':
                            $mensaje = 'DESCRIPCION_PARAMETRO_ALFANUMERICO_INCORRECTO'. " - ". DESCRIPCION_PARAMETRO_ALFANUMERICO_INCORRECTO;
                        break;
                    }
                break;
                case 'gestProcesos':
                    switch($nombreAtributo){
                        case 'nombre_proceso':
                            $mensaje = 'NOMBRE_PROCESO_ALFANUMERO_INCORRECTO'. " - ". NOMBRE_PROCESO_ALFANUMERO_INCORRECTO;
                        break;
                        case 'descripcion_proceso':
                            $mensaje = 'DESCRIPCION_PROCESO_ALFANUMERO_INCORRECTO'. " - ". DESCRIPCION_PROCESO_ALFANUMERO_INCORRECTO;
                        break;
                    }
                break;
                case 'gestProcesosusuario':
                    switch($nombreAtributo){
                        case 'fecha_proceso_usuario':
                            $mensaje = 'FECHA_PROCESO_USUARIO_FECHA_INCORRECTO'. " - ". FECHA_PROCESO_USUARIO_FECHA_INCORRECTO;
                        break;
                        case 'calculo_huella_carbono':
                            $mensaje = 'CALCULO_HUELLA_CARBONO_INCORRECTO'. " - ". CALCULO_HUELLA_CARBONO_INCORRECTO;
                        break;
                    }
                break;
            }
 
            }
        }
    }

        return $mensaje;
    }
    function comprobarAtributoEspacios($atributo, $funcionalidad, $nombreAtributo) {
        $mensaje = '';
        $patronEspacios = '/\s/';
        preg_match_all($patronEspacios, $atributo, $matches, PREG_UNMATCHED_AS_NULL);

            if(!empty($matches)){
                switch($funcionalidad){
                    case 'login' :
                        switch($nombreAtributo){
                            case 'usuario':
                                $mensaje = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO'." - ".LOGIN_USUARIO_ALFANUMERICO_INCORRECTO;
                            break; 
                            case 'passwd_usuario':
                                $mensaje = 'PASSWD_USUARIO_ALFANUMERICO_INCORRECTO'." - ".PASSWD_USUARIO_ALFANUMERICO_INCORRECTO;
                            break; 
                        }
                    break;
                    case 'registro' :
                        switch($nombreAtributo){
                            case 'dni_persona':
                                $mensaje = 'DNI_PERSONA_ALFANUMERICO_INCORRECTO'. " - ". DNI_PERSONA_ALFANUMERICO_INCORRECTO;
                            break;
                            case 'fecha_nac_persona':
                                $mensaje = 'FECHA_NAC_PERSONA_FECHA_INCORRECTO'. " - ". FECHA_NAC_PERSONA_FECHA_INCORRECTO;
                            break;
                            case 'email_persona':
                                $mensaje = 'EMAIL_PERSONA_EMAIL_INCORRECTO'. " - ". EMAIL_PERSONA_EMAIL_INCORRECTO;
                            break;
                            case 'telefono_persona':
                                $mensaje = 'TELEFONO_PERSONA_NUMERICO_INCORRECTO'. " - ". TELEFONO_PERSONA_NUMERICO_INCORRECTO;
                            break;
                        }
                    break;
                    case 'gestAcciones':
                        switch($nombreAtributo){
                            case 'nombre_accion':
                                $mensaje = 'NOMBRE_ACCION_ALFABETICO_INCORRECTO'. " - ". NOMBRE_ACCION_ALFABETICO_INCORRECTO;
                            break;
                        }
                    break;
                    case 'gestCategorias':
                        switch($nombreAtributo){
                            case 'nombre_categoria':
                                $mensaje = 'NOMBRE_CATEGORIA_ALFABETICO_INCORRECTO'. " - ". NOMBRE_CATEGORIA_ALFABETICO_INCORRECTO;
                            break;
                            case 'dni_responsable':
                                $mensaje = 'DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO'. " - ". DNI_RESPONSABLE_ALFANUMERICO_INCORRECTO;
                        }
                    break;
                    case 'gestRoles':
                        switch($nombreAtributo){
                            case 'nombre_rol':
                                $mensaje = 'NOMBRE_ROL_ALFABETICO_INCORRECTO'. " - ". NOMBRE_ROL_ALFABETICO_INCORRECTO;
                            break;
                            case 'descripcion_funcionalidad':
                                $mensaje = 'DESCRIPCION_ROL_ALFABETICO_INCORRECTO'. " - ". DESCRIPCION_ROL_ALFABETICO_INCORRECTO;
                            break;
                        }
                    break;
                    case: 'gestNoticias':
                        switch($nombreAtributo){
                            case 'fecha_noticia':
                                $mensaje = 'FECHA_NOTICIA_ALFANUMERICO_INCORRECTO'. " - ". FECHA_NOTICIA_ALFANUMERICO_INCORRECTO;
                            break;
                            }
                        }
                    break;
                    case 'gestProcesos':
                        switch($nombreAtributo){
                            case 'nombre_proceso':
                                $mensaje = 'NOMBRE_PROCESO_ALFANUMERO_INCORRECTO'. " - ". NOMBRE_PROCESO_ALFANUMERO_INCORRECTO;
                            break;
                        }
                    break;
                }
                case 'gestProcesosusuario':
                    switch($nombreAtributo){
                        case 'fecha_proceso_usuario':
                            $mensaje = 'FECHA_PROCESO_USUARIO_FECHA_INCORRECTO'. " - ". FECHA_PROCESO_USUARIO_FECHA_INCORRECTO;
                        break;
                        case 'calculo_huella_carbono':
                            $mensaje = 'CALCULO_HUELLA_CARBONO_INCORRECTO'. " - ". CALCULO_HUELLA_CARBONO_INCORRECTO;
                        break;
                    }
                break;
        }
      

        return $mensaje;
    }

    function comprobarAtributoCorrectoAlfanumerico($atributo){
        $mensaje = '';
        $patronAlfanumerico = '/^[a-zA-Z0-9]+$/';

        preg_match_all($patronAlfanumerico, $atributo, $matches, PREG_UNMATCHED_AS_NULL);

        if(!empty($matches)){
            $mensaje = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        }

        return $mensaje;
    }

    function comprobarAtributoCorrectoAlfanumericoEspacios($atributo){
        $mensaje = '';
        $patronAlfanumericoEspacios = '/^[a-zA-Z0-9]\s+$/';

        preg_match_all($patronAlfanumericoEspacios, $atributo, $matches, PREG_UNMATCHED_AS_NULL);

        if(!empty($matches)){
            $mensaje = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        }

        return $mensaje;
    }

    function comprobarAtributoCorrectoAlfabetico($atributo){
        $mensaje = '';
        $patronAlfabetico = '/^[a-zA-ZáéíóúÁÉÍÓÚ]\s+$/';

        preg_match_all($patronAlfabetico, $atributo, $matches, PREG_UNMATCHED_AS_NULL);

        if(!empty($matches)){
            $mensaje = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        }

        return $mensaje;
    }

    
    function comprobarAtributoCorrectoFecha($atributo){
        $mensaje = '';
        $patronFecha = '/^[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}/';

        preg_match_all($patronFecha, $atributo, $matches, PREG_UNMATCHED_AS_NULL);

        if(!empty($matches)){
            $mensaje = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        }

        return $mensaje;
    }

    function comprobarAtributoCorrectoEmail($atributo){
        $mensaje = '';
        $patronEmail = '/^[a-zA-Z0-9_!#$%&*+/=?{|}~^.-]+@[a-zA-Z0-9.-]+$/';

        preg_match_all($patronEmail, $atributo, $matches, PREG_UNMATCHED_AS_NULL);

        if(!empty($matches)){
            $mensaje = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        }

        return $mensaje;
    }

    function comprobarAtributoCorrectoNumerico($atributo){
        $mensaje = '';
        $patronAlfanumerico = '/^[0-9]+$/';

        preg_match_all($patronAlfanumerico, $atributo, $matches, PREG_UNMATCHED_AS_NULL);

        if(!empty($matches)){
            $mensaje = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        }

        return $mensaje;
    }

}