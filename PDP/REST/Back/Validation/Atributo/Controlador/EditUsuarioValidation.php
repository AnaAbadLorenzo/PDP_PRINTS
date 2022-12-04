<?php

    include_once './Validation/ValidacionesFormato.php';
    include_once './Validation/Atributo/Atributos/AutenticacionAtributos.php';
    include_once './Validation/Atributo/Atributos/LoginAtributos.php'; //¿Login o registro?
    include_once './Validation/ValidacionesBase.php';

class EditUsuarioValidation extends ValidacionesBase { //¿Por que hace falta?

    function validarEditUsuario()  {

        $validacionEditUsuario = new LoginAtributos();
        $atributosValidacion = array('dni_persona', 'usuario' ,'passwd_usuario');
        $atributos = $this ->recogerValoresAtributosPeticion($atributosValidacion);
        $validacionEditUsuario->validarAtributosLogin($atributos);
    }
}

?>