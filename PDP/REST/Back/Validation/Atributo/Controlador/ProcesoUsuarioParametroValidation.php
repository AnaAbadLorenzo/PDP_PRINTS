<?php

include_once './Validation/ValidacionesBase.php';
include_once './Validation/ValidacionesFormato.php';
include_once './Validation/Atributo/Atributos/ProcesoUsuarioParametroAtributos.php';
include_once './Validation/Accion/ProcesoUsuarioParametroAccion.php';

class ProcesoUsuarioParametroValidation extends ValidacionesBase {

    public $respuesta_formato;
    public $respuesta_accion;

    function validarAdd() {

        $proceso_usuario_parametro_validation_formato = new ProcesoUsuarioParametroAtributos;
        $proceso_usuario_parametro_validation_accion = new ProcesoUsuarioParametroAccion;

        $atributos_validacion = array(
            'id_proceso_usuario',
            'id_parametro',
            'valor_parametro'
        );
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $proceso_usuario_parametro_validation_formato -> validarAtributosAdd($atributos);
        $this -> respuesta_formato = $proceso_usuario_parametro_validation_formato -> respuesta;

        $this -> respuesta_accion = $proceso_usuario_parametro_validation_accion -> comprobarAdd($atributos);

    }

    function validarEdit() {

        $proceso_usuario_parametro_validation_formato = new ProcesoUsuarioParametroAtributos;
        $proceso_usuario_parametro_validation_accion = new ProcesoUsuarioParametroAccion;

        $atributos_validacion = array(
            'id_proceso_usuario',
            'id_parametro',
            'valor_parametro'
        );
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $proceso_usuario_parametro_validation_formato -> validarAtributosEdit($atributos);
        $this -> respuesta_formato = $proceso_usuario_parametro_validation_formato -> respuesta;

        $this -> respuesta_accion = $proceso_usuario_parametro_validation_accion -> comprobarEdit($atributos);

    }

    function validarDelete() {

        $proceso_usuario_parametro_validation_formato = new ProcesoUsuarioParametroAtributos();
        $proceso_usuario_parametro_validation_accion = new ProcesoUsuarioParametroAccion;

        $atributos_validacion = array(
            'id_proceso_usuario',
            'id_parametro'
        );
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $proceso_usuario_parametro_validation_formato -> validarAtributosDelete($atributos);
        $this -> respuesta_formato = $proceso_usuario_parametro_validation_formato -> respuesta;
        
        $this -> respuesta_accion = $proceso_usuario_parametro_validation_accion -> comprobarDelete($atributos);

    }

    function validarSearch()  {

        $proceso_usuario_parametro_validation_formato = new ProcesoUsuarioParametroAtributos();

        $atributos_validacion = array(
            'id_proceso_usuario',
            'id_parametro',
            'valor_parametro'
        );
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);
        
        $proceso_usuario_parametro_validation_formato -> validarAtributosSearch($atributos);
        $this -> respuesta_formato = $proceso_usuario_parametro_validation_formato -> respuesta;

    }

}

?>