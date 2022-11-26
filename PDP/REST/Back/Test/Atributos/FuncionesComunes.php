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
                    }
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
                    }
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
                    }
            }
        }

        return $mensaje;
    }

    function comprobarAtributoEnhe($atributo, $funcionalidad, $nombreAtributo) {
        $mensaje = '';
        if(strpos($atributo, 'ñ') || strpos($atributo, 'Ñ')){
            switch($funcionalidad){
                case 'login' :
                    switch($nombreAtributo){
                        case 'usuario':
                            $mensaje = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO'." - ".LOGIN_USUARIO_ALFANUMERICO_INCORRECTO;
                        break; 
                    }
            }
        }

        return $mensaje;
    }

    function comprobarAtributoAcentos($atributo, $funcionalidad, $nombreAtributo) {
        $mensaje = '';
        $patronAcentos = '[áéíóúÁÉÍÓÚ]';
        preg_match($patronAcentos, $atributo, $matches, PREG_UNMATCHED_AS_NULL);

        if(!empty($matches)){
            switch($funcionalidad){
                case 'login' :
                    switch($nombreAtributo){
                        case 'usuario':
                            $mensaje = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO'." - ".LOGIN_USUARIO_ALFANUMERICO_INCORRECTO;
                        break; 
                    }
            }
        }

        return $mensaje;
    }

    function comprobarAtributoCaracteresEspeciales($atributo, $funcionalidad, $nombreAtributo) {
        $mensaje = '';
        $patronCaracteresEspeciales = '[/¡/!/¿/?/@/#/$/%/(/)/=/+/-/€/./,//]';
        preg_match($patronCaracteresEspeciales, $atributo, $matches, PREG_UNMATCHED_AS_NULL);

        if(!empty($matches)){
            switch($funcionalidad){
                case 'login' :
                    switch($nombreAtributo){
                        case 'usuario':
                            $mensaje = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO'." - ".LOGIN_USUARIO_ALFANUMERICO_INCORRECTO;
                        break; 
                    }
            }
        }

        return $mensaje;
    }
    function comprobarAtributoEspacios($atributo, $funcionalidad, $nombreAtributo) {
        $mensaje = '';
        $patronEspacios = '[\s]';
        preg_match($patronEspacios, $atributo, $matches, PREG_UNMATCHED_AS_NULL);

        if(!empty($matches)){
            switch($funcionalidad){
                case 'login' :
                    switch($nombreAtributo){
                        case 'usuario':
                            $mensaje = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO'." - ".LOGIN_USUARIO_ALFANUMERICO_INCORRECTO;
                        break; 
                    }
            }
        }

        return $mensaje;
    }

    function comprobarAtributoCorrectoAlfanumerico($atributo){
        $mensaje = '';
        $patronAlfanumerico = '[^[a-zA-Z0-9]+$]';

        preg_match($patronAlfanumerico, $atributo, $matches, PREG_UNMATCHED_AS_NULL);

        if(!empty($matches)){
            $mensaje = 'AVANZAR_SIGUIENTE_CAMPO'." - ".AVANZAR_SIGUIENTE_CAMPO;
        }

        return $mensaje;
    }
}