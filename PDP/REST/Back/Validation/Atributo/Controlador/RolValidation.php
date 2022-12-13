<?php

include_once './Validation/ValidacionesBase.php';
include_once './Validation/ValidacionesFormato.php';
include_once './Validation/Atributo/Atributos/RolAtributos.php';
include_once './Validation/Accion/RolAccion.php';

class RolValidation extends ValidacionesBase {

    public $respuesta_formato;
    public $respuesta_accion;

    function validarAdd() {

        $rol_validation_formato = new RolAtributos;
        $rol_validation_accion = new RolAccion;

        $atributos_validacion = array('nombre_rol', 'descripcion_rol');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $rol_validation_formato -> validarAtributosAdd($atributos);
        $this -> respuesta_formato = $rol_validation_formato -> respuesta;

        $this -> respuesta_accion = $rol_validation_accion -> comprobarAddRol($atributos);

    }

    function validarEdit() {

        $rol_validation_formato = new RolAtributos;
        $rol_validation_accion = new RolAccion;

        $atributos_validacion = array('id_rol', 'nombre_rol', 'descripcion_rol');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $rol_validation_formato -> validarAtributosEdit($atributos);
        $this -> respuesta_formato = $rol_validation_formato -> respuesta;
        
        $this -> respuesta_accion = $rol_validation_accion -> comprobarEditRol($atributos);

    }

    function validarDelete() {

        $rol_validation_formato = new RolAtributos();
        $rol_validation_accion = new RolAccion;

        $atributos_validacion = array('id_rol');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $rol_validation_formato -> validarAtributosDelete($atributos);
        $this -> respuesta_formato = $rol_validation_formato -> respuesta;
        
        $this -> respuesta_accion = $rol_validation_accion -> comprobarDeleteRol($atributos);

    }

    function validarSearch()  {

        $rol_validation_formato = new RolAtributos();

        $atributos_validacion = array('id_rol', 'nombre_rol', 'descripcion_rol');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        header('Content-type: application/json');
        echo(json_encode($atributos)); 
        exit();
        $rol_validation_formato -> validarAtributosSearch($atributos);
        $this -> respuesta_formato = $rol_validation_formato -> respuesta;

    }

}

?>