<?php

include_once './Validation/ValidacionesBase.php';
include_once './Validation/ValidacionesFormato.php';
include_once './Validation/Atributo/Atributos/ProcesoUsuarioAtributos.php';
include_once './Validation/Accion/ProcesoUsuarioAccion.php';

class ProcesoUsuarioValidation extends ValidacionesBase {

    public $respuesta_formato;
    public $respuesta_accion;

    function validarAdd() {

        $parametro_validation_formato = new ProcesoUsuarioAtributos;
        $parametro_validation_accion = new ProcesoUsuarioAccion;

        $atributos_validacion = array(
            'fecha_proceso_usuario',
            'calculo_huella_carbono',
            'dni_usuario',
            'id_proceso'
        );
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $parametro_validation_formato -> validarAtributosAdd($atributos);
        $this -> respuesta_formato = $parametro_validation_formato -> respuesta;

        $this -> respuesta_accion = $parametro_validation_accion -> comprobarAdd($atributos);

    }

    function validarEdit() {

        $parametro_validation_formato = new ProcesoUsuarioAtributos;
        $parametro_validation_accion = new ProcesoUsuarioAccion;

        $atributos_validacion = array(
            'id_proceso_usuario',
            'fecha_proceso_usuario',
            'calculo_huella_carbono',
            'dni_usuario',
            'id_proceso'
        );
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $parametro_validation_formato -> validarAtributosEdit($atributos);
        $this -> respuesta_formato = $parametro_validation_formato -> respuesta;

        $this -> respuesta_accion = $parametro_validation_accion -> comprobarEdit($atributos);

    }

    function validarDelete() {

        $parametro_validation_formato = new ProcesoUsuarioAtributos();
        $parametro_validation_accion = new ProcesoUsuarioAccion;

        $atributos_validacion = array('id_proceso_usuario');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $parametro_validation_formato -> validarAtributosDelete($atributos);
        $this -> respuesta_formato = $parametro_validation_formato -> respuesta;
        
        $this -> respuesta_accion = $parametro_validation_accion -> comprobarDelete($atributos);

    }

    function validarSearch()  {

        $parametro_validation_formato = new ProcesoUsuarioAtributos();

        $atributos_validacion = array(
            'id_proceso_usuario',
            'fecha_proceso_usuario',
            'calculo_huella_carbono',
            'dni_usuario',
            'id_proceso'
        );
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);
        
        $parametro_validation_formato -> validarAtributosSearch($atributos);
        $this -> respuesta_formato = $parametro_validation_formato -> respuesta;

    }

}

?>