<?php
    
    include_once './Validation/ValidacionesFormato.php';
    include_once './Validation/Atributo/Atributos/FuncionalidadAtributos.php';
    include_once './Validation/Atributo/Atributos/RegistroAtributos.php';
    include_once './Validation/ValidacionesBase.php';

class EditFuncionalidadValidation extends ValidacionesBase {

    public $respuesta;

    function validarEditFuncionalidad()  {

        $this->respuesta = '';

        $validacionEditFuncionalidad = new FuncionalidadAtributos();
        $atributosValidacion = array('nombre_funcionalidad', 'descripcion_funcionalidad');
        $atributos = $this ->recogerValoresAtributosPeticion($atributosValidacion);
        $validacionEditFuncionalidad->validarAtributosFuncionalidad($atributos);

        $this->respuesta = $validacionEditFuncionalidad->respuesta;
    }
}

?>