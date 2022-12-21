<?php
class categoriaAtributos extends ValidacionesFormato{
	public $respuesta;

	function validarAtributosCategoria($atributos){
			$this->respuesta = '';
			
			$this->validar_nombre_categoria($atributos['nombre_categoria']);
			

		
			if($this->respuesta == ''){
				$this->validar_descripcion_categoria($atributos['descripcion_categoria']);
			}

			
			
			
	}

	
	function validar_nombre_categoria($atributo){
		$this->respuesta = '';
		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'NOMBRE_CATEGORIA_VACIO';
		}
		if($this->Longitud_minima($atributo,3)===false){
			$this->respuesta = 'NOMBRE_CATEGORIA_MENOR_QUE_3';
		}
		if($this->Longitud_maxima($atributo,48)===false){
			$this->respuesta = 'NOMBRE_CATEGORIA_MAYOR_QUE_48';
		}
		if($this->comprobarLetras($atributo)===false){
			$this->respuesta = 'NOMBRE_CATEGORIA_ALFABETICO_INCORRECTO';
		}	

	}

	
	function validar_descripcion_categoria($atributo){

		$this->respuesta = '';

		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'DESCRIPCION_CATEGORIA_VACIO';
		}
		if($this->Longitud_minima($atributo,3)===false){
			$this->respuesta = 'DESCRIPCION_CATEGORIA_MENOR_QUE_3';
		}
		if($this->comprobarLetras($atributo)===false){
			$this->respuesta = 'DESCRIPCION_CATEGORIA_ALFABETICO_INCORRECTO';
		}
	}

    

}
?>