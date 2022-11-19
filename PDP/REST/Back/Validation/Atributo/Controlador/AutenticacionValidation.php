<?php
    
    include_once './Validation/ValidacionesFormato.php';
    include_once './Validation/Atributo/Atributos/AutenticacionAtributos.php';
    include_once './Validation/ValidacionesBase.php';

class AutenticacionValidation extends ValidacionesBase {

    function validarLogin()  {
        $validacionAutenticacion = new AutenticacionAtributos();
        $atributosValidacion = array('usuario', 'passwd_usuario');
        $atributos = $this ->recogerValoresAtributosPeticion($atributosValidacion);
        $validacionAutenticacion->validarAtributosLogin($atributos);
    }
}

?>