<?php
    
    include_once './Validation/ValidacionesFormato.php';
    include_once './Validation/Atributo/Atributos/AutenticacionAtributos.php';
    include_once './Validation/ValidacionesBase.php';

class AutenticacionValidation extends ValidacionesBase {

    public $respuesta;

    function validarLogin()  {
        $validacionAutenticacion = new AutenticacionAtributos();
        $atributosValidacion = array('usuario', 'passwd_usuario');
        $atributos = $this -> recogerValoresAtributosPeticion($atributosValidacion);
        $validacionAutenticacion->validarAtributosLogin($atributos);
        $this->respuesta = $validacionAutenticacion->respuesta;
    }

    function validarRecuperarPass() {
        $validacionAutenticacion = new AutenticacionAtributos();
        $atributosValidacion = array('usuario', 'emailUsuario');
        $atributos = $this -> recogerValoresAtributosPeticion($atributosValidacion);
        $this -> respuesta = $validacionAutenticacion -> validarAtributosRecuperarPass($atributos);
        return $this -> respuesta;
    }

}

?>