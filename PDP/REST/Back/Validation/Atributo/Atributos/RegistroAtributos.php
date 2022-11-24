<?php

include_once './Validation/Excepciones/AtributoIncorrectoException.php';
class RegistroAtributos extends ValidacionesFormato{
	
	function validarAtributosRegistro($atributos){


		$this->validar_dni_persona($atributos[0]);
		$this->validar_nombre_persona($atributos[1]);
        $this->validar_apellidos_persona($atributos[2]);
		$this->validar_fecha_nac_persona($atributos[3]);		
        $this->validar_direccion_persona($atributos[4]);
		$this->validar_email_persona($atributos[5]);		
        $this->validar_telefono_persona($atributos[6]);		

	}

	
	function validar_dni_persona($atributo){
				
	}

	
	function validar_nombre_persona($atributo){
				
	}

    function validar_apellidos_persona($atributo){
			
	}

    function validar_fecha_nac_persona($atributo){
			
	}

    function validar_direccion_persona($atributo){
			
	}

    function validar_email_persona($atributo){
				
	}

    function validar_telefono_persona($atributo){
			
	}

}
?>