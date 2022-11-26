<?php

include_once './Validation/Excepciones/AtributoIncorrectoException.php';
class RegistroAtributos extends ValidacionesFormato{
	
	function validarAtributosRegistro($atributos){
	

		$this->validar_dni_persona($atributos['dni_persona']);
		$this->validar_nombre_persona($atributos['nombre_persona']);
        $this->validar_apellidos_persona($atributos['apellidos_persona']);
		$this->validar_fecha_nac_persona($atributos['fecha_nac_persona']);		
        $this->validar_direccion_persona($atributos['direccion_persona']);
		$this->validar_email_persona($atributos['email_persona']);		
        $this->validar_telefono_persona($atributos['telefono_persona']);		

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