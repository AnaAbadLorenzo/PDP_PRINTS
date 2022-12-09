<?php
    
    include_once './Validation/ValidacionesFormato.php';
    include_once './Validation/Atributo/Atributos/AutenticacionAtributos.php';
    include_once './Validation/Atributo/Atributos/RegistroAtributos.php';
    include_once './Validation/ValidacionesBase.php';

class EditPersonaValidation extends ValidacionesBase {

    public $respuesta;

    function validarEditPersona()  {
        $this->respuesta = '';

        $validacionEditPersona = new RegistroAtributos();
        $atributosValidacion = array('dni_persona', 'nombre_persona' ,'apellidos_persona' ,'fecha_nac_persona', 'direccion_persona', 'email_persona', 'telefono_persona');
        $atributos = $this ->recogerValoresAtributosPeticion($atributosValidacion);
        $validacionEditPersona->validarAtributosRegistro($atributos);

        $this->respuesta = $validacionEditPersona->respuesta;
    }
}

?>