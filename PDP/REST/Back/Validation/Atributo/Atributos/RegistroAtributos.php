<?php

include_once './Validation/Excepciones/AtributoIncorrectoException.php';
class RegistroAtributos extends ValidacionesFormato{
	
	function validarAtributosRegistro($atributos){
	
		
		header('Content-type: application/json');
		echo(json_encode($atributos)); 
		echo("------------");
		
		$this->validar_dni_persona($atributos['dni_persona']);
		
		$this->validar_nombre_persona($atributos['nombre_persona']);
		
        $this->validar_apellidos_persona($atributos['apellidos_persona']);
		$this->validar_fecha_nac_persona($atributos['fecha_nac_persona']);		
        $this->validar_direccion_persona($atributos['direccion_persona']);
		$this->validar_email_persona($atributos['email_persona']);		
        $this->validar_telefono_persona($atributos['telefono_persona']);	
		

	}

	
	function validar_dni_persona($atributo){
		
		/*if($atributo === null || $this->Es_Vacio($atributo)===true){
			throw new AtributoIncorrectoException('DNI_PERSONA_VACIO');
		}
		if($this->Formato_dni($atributo)===false){
			throw new AtributoIncorrectoException('DNI_PERSONA_FORMATO_INCORRECTO');
		}
		if($this->LetraNIF($atributo)===false){
			throw new AtributoIncorrectoException('DNI_PERSONA_LETRA_INCORRECTO');
		}
		*/
				
	}

	
	function validar_nombre_persona($atributo){
		
		/*if($atributo === null || $this->Es_Vacio($atributo)===true){
			throw new AtributoIncorrectoException('NOMBRE_PERSONA_VACIO');
		}
		if($this->Longitud_minima($atributo,3)===false){
		
			throw new AtributoIncorrectoException('NOMBRE_PERSONA_MENOR_QUE_3');
			
		}
		

		if($this->Longitud_maxima($atributo,56)===false){
			throw new AtributoIncorrectoException('NOMBRE_PERSONA_MAYOR_QUE_56');
		}
		if($this->comprobarLetras($atributo)===false){
			throw new AtributoIncorrectoException('NOMBRE_PERSONA_FORMATO_INCORRECTO');
		}*/
		
	
	
	}

    function validar_apellidos_persona($atributo){

		/*if($atributo === null || $this->Es_Vacio($atributo)===true){
			throw new AtributoIncorrectoException('APELLIDOS_PERSONA_VACIO');
		}

		if($this->Longitud_minima($atributo,3)===false){
			throw new AtributoIncorrectoException('APELLIDOS_PERSONA_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($atributo,128)===false){
			throw new AtributoIncorrectoException('APELLIDOS_PERSONA_MAYOR_QUE_128');
		}	
	
		if($this->comprobarLetrasEspacios($atributo)===false){
			throw new AtributoIncorrectoException('APELLIDOS_PERSONA_FORMATO_INCORRECTO');
		}*/
		
	}

    function validar_fecha_nac_persona($atributo){
	/*	if($atributo === null || $this->Es_Vacio($atributo)===true){
			throw new AtributoIncorrectoException('FECHA_NAC_PERSONA_VACIO');
		}
		
		if($this->Formato_fecha($atributo)===false){
			throw new AtributoIncorrectoException('FECHA_NAC_PERSONA_FORMATO_INCORRECTO');
		}*/	

	}

    function validar_direccion_persona($atributo){
		/*if($atributo === null || $this->Es_Vacio($atributo)===true){
			throw new AtributoIncorrectoException('DIRECCION_PERSONA_VACIO');
		}	
		if($this->Longitud_minima($atributo,3)===false){
			throw new AtributoIncorrectoException('DIRECCION_PERSONA_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($atributo,128)===false){
			throw new AtributoIncorrectoException('DIRECCION_PERSONA_MAYOR_QUE_128');
		}	

		if($this->FormatoCalle($atributo)===false){
			throw new AtributoIncorrectoException('DIRECCION_PERSONA_FORMATO_INCORRECTO');
		}*/	
		
	}

    function validar_email_persona($atributo){
		/*if($atributo === null || $this->Es_Vacio($atributo)===true){
			throw new AtributoIncorrectoException('EMAIL_PERSONA_VACIO');
		}
		if($this->Longitud_minima($atributo,4)===false){
			throw new AtributoIncorrectoException('EMAIL_PERSONA_MENOR_QUE_4');
		}

		if($this->Longitud_maxima($atributo,128)===false){
			throw new AtributoIncorrectoException('EMAIL_PERSONA_MAYOR_QUE_128');
		}	

		if($this->Formato_email($atributo)===false){
			throw new AtributoIncorrectoException('EMAIL_PERSONA_FORMATO_INCORRECTO');
		}	*/		
	}

    function validar_telefono_persona($atributo){
		/*if($atributo === null || $this->Es_Vacio($atributo)===true){
			throw new AtributoIncorrectoException('TELEFONO_PERSONA_VACIO');
		}
		if($this->Longitud_exacta($atributo,9)===false){
			throw new AtributoIncorrectoException('TELEFONO_PERSONA_EXACTA_9');
		}
		if($this->Es_numerico($atributo)===false){
			throw new AtributoIncorrectoException('TELEFONO_PERSONA_FORMATO_INCORRECTO');
		}*/
		
	}

}
?>