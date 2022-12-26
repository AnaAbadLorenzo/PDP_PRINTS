<?php

include_once './Validation/ValidacionesBase.php';
include_once './Validation/ValidacionesFormato.php';
include_once './Validation/Atributo/Atributos/ACLAtributos.php';
include_once './Validation/Accion/ACLAccion.php';

class ACLValidation extends ValidacionesBase {

    public $respuesta_formato;
    public $respuesta_accion;

    function validarAdd() {

        $acl_validation_formato = new ACLAtributos;
        $acl_validation_accion = new ACLAccion;

        $atributos_validacion = array('id_rol', 'id_accion', 'id_funcionalidad');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $acl_validation_formato -> validarAtributosAdd($atributos);
        $this -> respuesta_formato = $acl_validation_formato -> respuesta;

        $this -> respuesta_accion = $acl_validation_accion -> comprobarAdd($atributos);

    }

    function validarDelete() {

        $acl_validation_formato = new ACLAtributos;
        $acl_validation_accion = new ACLAccion;

        $atributos_validacion = array('id_rol', 'id_accion', 'id_funcionalidad');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $acl_validation_formato -> validarAtributosDelete($atributos);
        $this -> respuesta_formato = $acl_validation_formato -> respuesta;
        
        $this -> respuesta_accion = $acl_validation_accion -> comprobarDelete($atributos);

    }

    function validarSearchFuncionalidades() {

        $acl_validation_formato = new ACLAtributos;
        $acl_validation_accion = new ACLAccion;

        $atributos_validacion = array('usuario');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $acl_validation_formato -> validarAtributosUsuario($atributos);
        $this -> respuesta_formato = $acl_validation_formato -> respuesta;
        
        $this -> respuesta_accion = $acl_validation_accion -> comprobarUsuario($atributos);

    }

    function validarSearchAccionesporFuncionalidadesUsuario() {

        $acl_validation_formato = new ACLAtributos;
        $acl_validation_accion = new ACLAccion;

        $atributos_validacion = array('usuario', 'nombre_funcionalidad');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $acl_validation_formato -> validarAtributos($atributos);
        $this -> respuesta_formato = $acl_validation_formato -> respuesta;
        
        $this -> respuesta_accion = $acl_validation_accion -> comprobarUsuarioYFuncionalidad($atributos);

    }

    function validarPermisosUsuario() {

        $acl_validation_formato = new ACLAtributos;
        $acl_validation_accion = new ACLAccion;

        $atributos_validacion = array('usuario');
        $atributos = $this -> recogerValoresAtributosPeticion($atributos_validacion);

        $acl_validation_formato -> validarAtributos($atributos);
        $this -> respuesta_formato = $acl_validation_formato -> respuesta;
        
        $this -> respuesta_accion = $acl_validation_accion -> comprobarUsuario($atributos);

    }

}

?>