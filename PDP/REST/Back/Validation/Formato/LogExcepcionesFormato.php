<?php

class LogExcepcionesFormato extends ValidacionesFormato{

    function comprobarLogExcepcionesBlank($datosExcepciones){
        if(empty($datosExcepciones['usuario']) || empty($datosExcepciones['tipo_excepcion']) || empty($datosExcepciones['descripcion_excepcion'])){
            return true;
        }else{
            return false;
        }
    }
}
?>