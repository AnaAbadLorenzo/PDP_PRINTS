<?php
    
    include_once './Validation/ValidacionesFormato.php';
    include_once './Validation/Atributo/Atributos/AutenticacionAtributos.php';
    include_once './Validation/Atributo/Atributos/RegistroAtributos.php';
    include_once './Validation/ValidacionesBase.php';

class RegistroValidation extends ValidacionesBase {
        public $respuesta;

    function validarRegistro()  {
        $validacionRegistro = new RegistroAtributos();
        $atributosValidacion = array('dni_persona', 'nombre_persona' ,'apellidos_persona' ,'fecha_nac_persona', 'direccion_persona', 'email_persona', 'telefono_persona');
        $atributos = $this ->recogerValoresAtributosPeticion($atributosValidacion);
        $validacionRegistro->validarAtributosRegistro($atributos);

        $this->respuesta = $validacionRegistro->respuesta;

        if($this->respuesta == ''){

            $validacionAutenticacion = new AutenticacionAtributos();
            $atributosValidacion = array('usuario', 'passwd_usuario');
            $atributos = $this ->recogerValoresAtributosPeticion($atributosValidacion);
            $validacionAutenticacion->validarAtributosLogin($atributos);
            $this->respuesta = $validacionAutenticacion->respuesta;
        }
       
    }
}

?>