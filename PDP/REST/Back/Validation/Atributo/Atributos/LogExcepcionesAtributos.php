<?php
class LogExcepcionesAtributos extends ValidacionesFormato{
	
	function validarAtributosLogExcepciones($atributos){
        $this->comprobarLogExcepcionesBlank($atributos);
	}

    function comprobarLogExcepcionesBlank($datosExcepciones){
        if(empty($datosExcepciones['usuario']) || empty($datosExcepciones['tipo_excepcion']) || empty($datosExcepciones['descripcion_excepcion'])){
            return true;
        }else{
            return false;
        }
    }

}

?>