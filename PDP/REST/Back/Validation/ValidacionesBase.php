<?php

class ValidacionesBase {
    
    function recogerValoresAtributosPeticion($arrayAtributos){
        $arrayValores = array();
        foreach($arrayAtributos as $atributo){
            if(!isset($_POST[$atributo])){
                array_push($arrayValores, null);
            }else{
                array_push($arrayValores, $_POST[$atributo]);
            }
        }

        return $arrayValores;
    }


}

?>