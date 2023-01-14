<?php

class ParametroAtributos extends ValidacionesFormato {

	public $respuesta;
	
	function validarAtributosAdd($atributos){
		$this -> validarParametroFormula($atributos['parametro_formula']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarDescripcionParametro($atributos['descripcion_parametro']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarIdProceso($atributos['id_proceso']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}
	
	function validarAtributosEdit($atributos){
		$this -> validarAtributosAdd($atributos); // Se hacen las mismas validaciones
	}
	
	function validarAtributosDelete($atributos){
		$this -> validarIdParametro($atributos['id_parametro']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}
	
	function validarAtributosSearch($atributos){
		$this -> validarParametroFormulaSearch($atributos['parametro_formula']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarDescripcionParametroSearch($atributos['descripcion_parametro']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarIdProcesoSearch($atributos['id_proceso']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}

	function validarIdParametro($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'ID_PARAMETRO_VACIO';
		} else if (!ctype_digit($atributo)) {
			$this -> respuesta = 'ID_PARAMETRO_CARACTERES_INCORRECTOS';
		}
	}

	function validarIdProceso($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'ID_PROCESO_VACIO';
		} else if (!ctype_digit($atributo)) {
			$this -> respuesta = 'ID_PROCESO_CARACTERES_INCORRECTOS';
		}
	}

	function validarIdProcesoSearch($atributo) {
		$this -> respuesta = '';
		if (!ctype_digit($atributo)) {
			$this -> respuesta = 'ID_PROCESO_CARACTERES_INCORRECTOS';
		}
	}

	function validarParametroFormula($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'PARAMETRO_FORMULA_VACIO';
		} else if (strlen($atributo) > 50) {
			$this -> respuesta = 'PARAMETRO_FORMULA_DEMASIADO_LARGO';
		} else if (!ctype_alnum($atributo)) {
			$this -> respuesta = 'PARAMETRO_FORMULA_CARACTERES_INCORRECTOS';
		}
	}

	function validarParametroFormulaSearch($atributo) {
		$this -> respuesta = '';
		if (strlen($atributo) > 50) {
			$this -> respuesta = 'PARAMETRO_FORMULA_DEMASIADO_LARGO';
		} else if (!ctype_alnum($atributo)) {
			$this -> respuesta = 'PARAMETRO_FORMULA_CARACTERES_INCORRECTOS';
		}
	}

	function validarDescripcionParametro($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'DESCRIPCION_PARAMETRO_VACIO';
		}
	}

	function validarDescripcionParametroSearch($atributo) {
		$this -> respuesta = '';
		if (strlen($atributo) > 80) {
			$this -> respuesta = 'DESCRIPCION_PARAMETRO_DEMASIADO_LARGO';
		} else if (!ctype_alnum($atributo)) {
			$this -> respuesta = 'DESCRIPCION_PARAMETRO_CARACTERES_INCORRECTOS';
		}
	}

	function validarBorradoParametro($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'BORRADO_PARAMETRO_VACIO';
		}
	}

}

?>