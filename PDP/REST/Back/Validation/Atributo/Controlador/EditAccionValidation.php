<?php
    
    include_once './Validation/ValidacionesFormato.php';
    include_once './Validation/Atributo/Atributos/AccionAtributos.php';
    include_once './Validation/Atributo/Atributos/RegistroAtributos.php';
    include_once './Validation/ValidacionesBase.php';

class EditAccionValidation extends ValidacionesBase {

    public $respuesta;

    function validarEditAccion()  {

        $this->respuesta = '';

        $validacionEditAccion = new AccionAtributos();
        $atributosValidacion = array('nombre_accion', 'descripcion_accion');
        $atributos = $this ->recogerValoresAtributosPeticion($atributosValidacion);
        $validacionEditAccion->validarAtributosAccion($atributos);

        $this->respuesta = $validacionEditAccion->respuesta;
    }
}

?>