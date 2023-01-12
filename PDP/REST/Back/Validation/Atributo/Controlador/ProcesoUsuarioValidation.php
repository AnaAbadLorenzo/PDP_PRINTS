<?php

include_once './Validation/ValidacionesBase.php';
include_once './Validation/ValidacionesFormato.php';
include_once './Validation/Atributo/Atributos/ProcesoUsuarioAtributos.php';
include_once './Validation/Accion/ProcesoUsuarioAccion.php';

class ProcesoUsuarioValidation extends ValidacionesBase {

    public $respuesta_formato;
    public $respuesta_accion;

    function validarAdd() {

        $proceso_usuario_validation_formato = new ProcesoUsuarioAtributos;
        $proceso_usuario_validation_accion = new ProcesoUsuarioAccion;

        $atributos_validacion = array(
            'fecha_proceso_usuario',
            'calculo_huella_carbono',
            'dni_usuario',
            'id_proceso'
        );
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $proceso_usuario_validation_formato -> validarAtributosAdd($atributos);
        $this -> respuesta_formato = $proceso_usuario_validation_formato -> respuesta;

        $this -> respuesta_accion = $proceso_usuario_validation_accion -> comprobarAdd($atributos);

    }

    function validarEdit() {

        $proceso_usuario_validation_formato = new ProcesoUsuarioAtributos;
        $proceso_usuario_validation_accion = new ProcesoUsuarioAccion;

        $atributos_validacion = array(
            'id_proceso_usuario',
            'fecha_proceso_usuario',
            'calculo_huella_carbono',
            'dni_usuario',
            'id_proceso'
        );
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $proceso_usuario_validation_formato -> validarAtributosEdit($atributos);
        $this -> respuesta_formato = $proceso_usuario_validation_formato -> respuesta;

        $this -> respuesta_accion = $proceso_usuario_validation_accion -> comprobarEdit($atributos);

    }

    function validarDelete() {

        $proceso_usuario_validation_formato = new ProcesoUsuarioAtributos();
        $proceso_usuario_validation_accion = new ProcesoUsuarioAccion;

        $atributos_validacion = array('id_proceso_usuario');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $proceso_usuario_validation_formato -> validarAtributosDelete($atributos);
        $this -> respuesta_formato = $proceso_usuario_validation_formato -> respuesta;
        
        $this -> respuesta_accion = $proceso_usuario_validation_accion -> comprobarDelete($atributos);

    }

    function validarSearch()  {

        $proceso_usuario_validation_formato = new ProcesoUsuarioAtributos();

        $atributos_validacion = array(
            'id_proceso_usuario',
            'fecha_proceso_usuario',
            'calculo_huella_carbono',
            'dni_usuario',
            'id_proceso'
        );
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);
        
        $proceso_usuario_validation_formato -> validarAtributosSearch($atributos);
        $this -> respuesta_formato = $proceso_usuario_validation_formato -> respuesta;

    }

}

?>