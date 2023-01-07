<?php
class procesoAtributos extends ValidacionesFormato{
	public $respuesta;

	function validarAtributosProceso($atributos){
			$this->respuesta = '';
		
			$this->validar_nombre_proceso($atributos['nombre_proceso']);
			

		
			if($this->respuesta == ''){
				$this->validar_descripcion_proceso($atributos['descripcion_proceso']);
			}

			
			
			
	}

	
	function validar_nombre_proceso($atributo){
		$this->respuesta = '';
		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'NOMBRE_PROCESO_VACIO';
		}
		if($this->Longitud_minima($atributo,3)===false){
			$this->respuesta = 'NOMBRE_PROCESO_MENOR_QUE_3';
		}
		if($this->Longitud_maxima($atributo,48)===false){
			$this->respuesta = 'NOMBRE_PROCESO_MAYOR_QUE_48';
		}
		if($this->comprobarLetras($atributo)===false){
			$this->respuesta = 'NOMBRE_PROCESO_ALFABETICO_INCORRECTO';
		}	

	}

	
	function validar_descripcion_proceso($atributo){

		$this->respuesta = '';

		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'DESCRIPCION_PROCESO_VACIO';
		}
		if($this->Longitud_minima($atributo,3)===false){
			$this->respuesta = 'DESCRIPCION_PROCESO_MENOR_QUE_3';
		}
		if($this->comprobarLetras($atributo)===false){
			$this->respuesta = 'DESCRIPCION_PROCESO_ALFABETICO_INCORRECTO';
		}
	}

    

}
?>