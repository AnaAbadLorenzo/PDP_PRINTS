<?php

class AutenticacionFormato extends ValidacionesFormato{

    function comprobarLoginBlank($datosUsuario){
        if(empty($datosUsuario['usuario']) || empty($datosUsuario['passwd_usuario'])){
            return true;
        }else{
            return false;
        }
    }
}
?>