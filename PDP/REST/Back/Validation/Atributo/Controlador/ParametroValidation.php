<?php

include_once './Validation/ValidacionesBase.php';
include_once './Validation/ValidacionesFormato.php';
include_once './Validation/Atributo/Atributos/ParametroAtributos.php';
include_once './Validation/Accion/ParametroAccion.php';

class ParametroValidation extends ValidacionesBase {

    public $respuesta_formato;
    public $respuesta_accion;

    function validarAdd() {

        $parametro_validation_formato = new ParametroAtributos;
        $parametro_validation_accion = new ParametroAccion;

        $atributos_validacion = array('parametro_formula', 'descripcion_parametro', 'id_proceso');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $parametro_validation_formato -> validarAtributosAdd($atributos);
        $this -> respuesta_formato = $parametro_validation_formato -> respuesta;

        $this -> respuesta_accion = $parametro_validation_accion -> comprobarAdd($atributos);

    }

    function validarDelete() {

        $parametro_validation_formato = new ParametroAtributos();
        $parametro_validation_accion = new ParametroAccion;

        $atributos_validacion = array('id_parametro');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $parametro_validation_formato -> validarAtributosDelete($atributos);
        $this -> respuesta_formato = $parametro_validation_formato -> respuesta;
        
        $this -> respuesta_accion = $parametro_validation_accion -> comprobarDelete($atributos);

    }

    function validarSearch()  {

        $parametro_validation_formato = new ParametroAtributos();

        $atributos_validacion = array('id_parametro', 'parametro_formula', 'descripcion_parametro', 'id_proceso');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);
        
        $parametro_validation_formato -> validarAtributosSearch($atributos);
        $this -> respuesta_formato = $parametro_validation_formato -> respuesta;

    }

}

?>