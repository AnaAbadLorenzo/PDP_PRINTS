<?php
    
    include_once './Validation/ValidacionesFormato.php';
    include_once './Validation/Atributo/Atributos/AutenticacionAtributos.php';
    include_once './Validation/ValidacionesBase.php';

class RegistroValidation extends ValidacionesBase {

    function validarRegistro()  {
        $validacionAutenticacion = new AutenticacionAtributos();
        $atributosValidacion = array('usuario', 'passwd_usuario');
        $atributos = $this ->recogerValoresAtributosPeticion($atributosValidacion);
        $validacionAutenticacion->validarAtributosLogin($atributos);

        $validacionRegistro = new RegistroAtributos();
        $atributosRegistro = array('dni_persona', 'nombre_persona' ,'apellidos_persona' ,'fecha_nac_persona', 'direccion_persona', 'email_persona', 'telefono_persona');
        $atributos = $this ->recogerValoresAtributosPeticion($atributosValidacion);
        $validacionRegistro->validarAtributosRegistro($atributos);
    }
}

?>