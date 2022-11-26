<?php

class ValidacionesBase {
    
    function recogerValoresAtributosPeticion($arrayAtributos){
        $arrayValores = array();
        foreach($arrayAtributos as $atributo){
            if(!isset($_POST[$atributo])){
                $arrayValores[$atributo] = null;
            }else{
                $arrayValores[$atributo] = $_POST[$atributo];
            }
        }

        return $arrayValores;
    }


}

?>