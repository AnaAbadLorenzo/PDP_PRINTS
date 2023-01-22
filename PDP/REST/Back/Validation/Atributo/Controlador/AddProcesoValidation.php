<?php
    
    include_once './Validation/ValidacionesFormato.php';
    include_once './Validation/Atributo/Atributos/ProcesoAtributos.php';
    include_once './Validation/Atributo/Atributos/RegistroAtributos.php';
    include_once './Validation/ValidacionesBase.php';

class AddProcesoValidation extends ValidacionesBase {

    public $respuesta;

    function validarAddProceso()  {

        $this->respuesta = '';

        $validacionAddProceso = new ProcesoAtributos();
        $atributosValidacion = array('nombre_proceso', 'descripcion_proceso','formula_proceso');
        $atributos = $this ->recogerValoresAtributosPeticion($atributosValidacion);
        $validacionAddProceso->validarAtributosProceso($atributos);

        $this->respuesta = $validacionAddProceso->respuesta;
    }
}

?>