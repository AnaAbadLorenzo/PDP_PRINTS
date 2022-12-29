<?php

    include_once './Validation/ValidacionesFormato.php';
    include_once './Validation/Atributo/Atributos/UsuarioAtributos.php';
    include_once './Validation/Accion/UsuarioAccion.php';
    include_once './Validation/ValidacionesBase.php';

class UsuarioValidation extends ValidacionesBase {

    function validarUsuarioAdd()  {
        $usuarioValidationFormato = new UsuarioAtributos();
        $usuarioValidationAccion = new UsuarioAccion();

        $atributosValidacion = array('dni_usuario', 'usuario' ,'passwd_usuario');
        $atributos = $this -> recogerValoresAtributosPeticion($atributosValidacion);

        $usuarioValidationFormato -> validarAtributosUsuario($atributos);
        $this -> respuesta_formato = $usuarioValidationFormato -> respuesta;

        $this -> respuesta_accion = $usuarioValidationAccion -> comprobarAddUsuario($atributos);
    }

    function validarEditPassUsuario()  {
        $usuarioValidationFormato = new UsuarioAtributos();
        $usuarioValidationAccion = new UsuarioAccion();

        $atributosValidacion = array('usuario', 'passwd_usuario');
        $atributos = $this -> recogerValoresAtributosPeticion($atributosValidacion);

        $usuarioValidationFormato -> validarAtributoPass($atributos['passwd_usuario']);
        $this -> respuesta_formato = $usuarioValidationFormato -> respuesta;

        $this -> respuesta_accion = $usuarioValidationAccion -> comprobarEditPassUsuario($atributos);
    }

    function validarEditRolUsuario()  {
        $usuarioValidationFormato = new UsuarioAtributos();
        $usuarioValidationAccion = new UsuarioAccion();

        $atributosValidacion = array('dni_usuario', 'usuario', 'passwd_usuario', 'id_rol');
        $atributos = $this -> recogerValoresAtributosPeticion($atributosValidacion);

        $usuarioValidationFormato -> validarAtributoRolUsuario($atributos['id_rol']);
        $this -> respuesta_formato = $usuarioValidationFormato -> respuesta;

        $this -> respuesta_accion = $usuarioValidationAccion -> comprobarEditRolUsuario($atributos);
    }
}

?>