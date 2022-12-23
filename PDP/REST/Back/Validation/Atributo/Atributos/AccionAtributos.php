<?php
class AccionAtributos extends ValidacionesFormato{
	public $respuesta;

	function validarAtributosAccion($atributos){
			$this->respuesta = '';
			
			$this->validar_nombre_accion($atributos['nombre_accion']);
			

		
			if($this->respuesta == ''){
				$this->validar_descripcion_accion($atributos['descripcion_accion']);
			}
	}

	
	function validar_nombre_accion($atributo){
		$this->respuesta = '';
		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'NOMBRE_ACCION_VACIO';
		}
		if($this->Longitud_minima($atributo,3)===false){
			$this->respuesta = 'NOMBRE_ACCION_MENOR_QUE_3';
		}
		if($this->Longitud_maxima($atributo,48)===false){
			$this->respuesta = 'NOMBRE_ACCION_MAYOR_QUE_48';
		}
		if($this->comprobarLetras($atributo)===false){
			$this->respuesta = 'NOMBRE_ACCION_ALFABETICO_INCORRECTO';
		}	

	}

	
	function validar_descripcion_accion($atributo){

		$this->respuesta = '';

		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'DESCRIPCION_ACCION_VACIO';
		}
		if($this->Longitud_minima($atributo,3)===false){
			$this->respuesta = 'DESCRIPCION_ACCION_MENOR_QUE_3';
		}
		if($this->comprobarLetras($atributo)===false){
			$this->respuesta = 'DESCRIPCION_ACCION_ALFABETICO_INCORRECTO';
		}
	}

    

}
?>