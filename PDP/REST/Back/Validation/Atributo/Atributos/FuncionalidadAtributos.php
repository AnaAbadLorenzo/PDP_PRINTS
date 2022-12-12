<?php
class FuncionalidadAtributos extends ValidacionesFormato{
	public $respuesta;

	function validarAtributosFuncionalidad($atributos){
			$this->respuesta = '';
			
			$this->validar_nombre_funcionalidad($atributos['nombre_funcionalidad']);
			

		
			if($this->respuesta == ''){
				$this->validar_descripcion_funcionalidad($atributos['descripcion_funcionalidad']);
			}

			
			
			
	}

	
	function validar_nombre_funcionalidad($atributo){
		$this->respuesta = '';
		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'NOMBRE_FUNCIONALIDAD_VACIO';
		}
		if($this->Longitud_minima($atributo,3)===false){
			$this->respuesta = 'NOMBRE_FUNCIONALIDAD_MENOR_QUE_3';
		}
		if($this->Longitud_maxima($atributo,48)===false){
			$this->respuesta = 'NOMBRE_FUNCIONALIDAD_MAYOR_QUE_48';
		}
		if($this->comprobarLetras($atributo)===false){
			$this->respuesta = 'NOMBRE_FUNCIONALIDAD_ALFABETICO_INCORRECTO';
		}	

	}

	
	function validar_descripcion_funcionalidad($atributo){

		$this->respuesta = '';

		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'DESCRIPCION_FUNCIONALIDAD_VACIO';
		}
		if($this->Longitud_minima($atributo,3)===false){
			$this->respuesta = 'DESCRIPCION_FUNCIONALIDAD_MENOR_QUE_3';
		}
		if($this->comprobarLetras($atributo)===false){
			$this->respuesta = 'DESCRIPCION_FUNCIONALIDAD_ALFABETICO_INCORRECTO';
		}
	}

    

}
?>