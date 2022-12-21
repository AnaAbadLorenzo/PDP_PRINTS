<?php
    
    include_once './Validation/ValidacionesFormato.php';
    include_once './Validation/Atributo/Atributos/CategoriaAtributos.php';
    include_once './Validation/Atributo/Atributos/RegistroAtributos.php';
    include_once './Validation/ValidacionesBase.php';

class AddCategoriaValidation extends ValidacionesBase {

    public $respuesta;

    function validarAddCategoria()  {

        $this->respuesta = '';

        $validacionAddCategoria = new CategoriaAtributos();
        $atributosValidacion = array('nombre_categoria', 'descripcion_categoria');
        $atributos = $this ->recogerValoresAtributosPeticion($atributosValidacion);
        $validacionAddCategoria->validarAtributosCategoria($atributos);

        $this->respuesta = $validacionAddCategoria->respuesta;
    }
}

?>