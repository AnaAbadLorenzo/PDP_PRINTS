<?php

class RegistroFormato extends ValidacionesFormato{

    function comprobarRegistroBlank($datosPersona){
        if(empty($datosPersona['dni_persona']) || empty($datosPersona['nombre_persona'])
        || empty($datosPersona['apellidos_persona'])|| empty($datosPersona['fecha_nac_persona'])
        || empty($datosPersona['direccion_persona'])|| empty($datosPersona['email_persona'])
        || empty($datosPersona['telefono_persona'])){
            return true;
        }else{
            return false;
        }
    }
}
?>