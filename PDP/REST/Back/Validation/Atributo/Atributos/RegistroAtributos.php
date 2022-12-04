<?php
class RegistroAtributos extends ValidacionesFormato{
	public $respuesta;

	function validarAtributosRegistro($atributos){
			$this->respuesta = '';
			
			$this->validar_dni_persona($atributos['dni_persona']);
			if($this->respuesta = ''){
				$this->validar_nombre_persona($atributos['nombre_persona']);
			}

			if($this->respuesta = ''){
				$this->validar_apellidos_persona($atributos['apellidos_persona']);
			}

			if($this->respuesta = ''){
				$this->validar_fecha_nac_persona($atributos['fecha_nac_persona']);		
			}

			if($this->respuesta = ''){
				$this->validar_direccion_persona($atributos['direccion_persona']);
			}

			if($this->respuesta = ''){
				$this->validar_email_persona($atributos['email_persona']);		
			}

			if($this->respuesta = ''){
				$this->validar_telefono_persona($atributos['telefono_persona']);
			}
	}

	
	function validar_dni_persona($atributo){
		$this->respuesta = '';

		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'DNI_PERSONA_VACIO';
		}
		if($this->Formato_dni($atributo)===false){
			$this->respuesta = 'DNI_PERSONA_ALFANUMERICO_INCORRECTO';
		}
		if($this->LetraNIF($atributo)===false){
			$this->respuesta = 'DNI_PERSONA_LETRA_INCORRECTO';
		}	
	}

	
	function validar_nombre_persona($atributo){

		$this->respuesta = '';

		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'NOMBRE_PERSONA_VACIO';
		}
		if($this->Longitud_minima($atributo,3)===false){
			$this->respuesta = 'NOMBRE_PERSONA_MENOR_QUE_3';
		}
		if($this->Longitud_maxima($atributo,128)===false){
			$this->respuesta = 'NOMBRE_PERSONA_MAYOR_QUE_128';
		}
		if($this->comprobarLetras($atributo)===false){
			$this->respuesta = 'NOMBRE_PERSONA_ALFABETICO_INCORRECTO';
		}
	}

    function validar_apellidos_persona($atributo){
		$this->respuesta = '';

		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'APELLIDOS_PERSONA_VACIO';
		}

		if($this->Longitud_minima($atributo,3)===false){
			$this->respuesta = 'APELLIDOS_PERSONA_MENOR_QUE_3';
		}

		if($this->Longitud_maxima($atributo,128)===false){
			$this->respuesta = 'APELLIDOS_PERSONA_MAYOR_QUE_128';
		}	
	
		if($this->comprobarLetrasEspacios($atributo)===false){
			$this->respuesta =  'APELLIDOS_PERSONA_ALFABETICO_INCORRECTO';
		}
	}

    function validar_fecha_nac_persona($atributo){
		$this->respuesta = '';

		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'FECHA_NAC_PERSONA_VACIO';
		}

		if($this->Longitud_minima($atributo,10)===false){
			$this->respuesta = 'FECHA_NAC_PERSONA_MENOR_QUE_10';
		}

		if($this->Longitud_maxima($atributo,10)===false){
			$this->respuesta = 'FECHA_NAC_PERSONA_MAYOR_QUE_10';
		}	
		
		if($this->Formato_fecha($atributo)===false){
			$this->respuesta = 'FECHA_NAC_PERSONA_FECHA_INCORRECTO';
		}
	}

    function validar_direccion_persona($atributo){

		$this->respuesta = '';

		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'DIRECCION_PERSONA_VACIO';
		}	
		if($this->Longitud_minima($atributo,3)===false){
			$this->respuesta = 'DIRECCION_PERSONA_MENOR_QUE_3';
		}

		if($this->Longitud_maxima($atributo,128)===false){
			$this->respuesta = 'DIRECCION_PERSONA_MAYOR_QUE_128';
		}	

		if($this->FormatoCalle($atributo)===false){
			$this->respuesta = 'DIRECCION_PERSONA_ALFANUMERICO_INCORRECTO';
		}
	}

    function validar_email_persona($atributo){
		$this->respuesta = '';

		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'EMAIL_PERSONA_VACIO';
		}
		if($this->Longitud_minima($atributo,3)===false){
			$this->respuesta = 'EMAIL_PERSONA_MENOR_QUE_3';
		}

		if($this->Longitud_maxima($atributo,128)===false){
			$this->respuesta = 'EMAIL_PERSONA_MAYOR_QUE_128';
		}	

		if($this->Formato_email($atributo)===false){
			$this->respuesta = 'EMAIL_PERSONA_EMAIL_INCORRECTO';
		}
	}

    function validar_telefono_persona($atributo){
		$this->respuesta = '';

		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'TELEFONO_PERSONA_VACIO';
		}
		if($this->Longitud_minima($atributo,9)===false){
			$this->respuesta = 'TELEFONO_PERSONA_MENOR_QUE_9';
		}

		if($this->Longitud_maxima($atributo,9)===false){
			$this->respuesta = 'TELEFONO_PERSONA_MAYOR_QUE_9';
		}	

		if($this->Es_numerico($atributo)===false){
			$this->respuesta = 'TELEFONO_PERSONA_NUMERICO_INCORRECTO';
		}
	}

}
?>