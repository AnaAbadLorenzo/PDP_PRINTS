<?php

class ProcesoUsuarioParametroAtributos extends ValidacionesFormato {

	public $respuesta;
	
	function validarAtributosAdd($atributos) {
		$this -> validarIdProcesoUsuario($atributos['id_proceso_usuario']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarIdParametro($atributos['id_parametro']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarValorParametro($atributos['valor_parametro']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}
	
	function validarAtributosEdit($atributos) {
		$this -> validarAtributosAdd($atributos); // Son las mismas validaciones
	}
	
	function validarAtributosDelete($atributos) {
		$this -> validarIdProcesoUsuario($atributos['id_proceso_usuario']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarIdParametro($atributos['id_parametro']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}
	
	function validarAtributosSearch($atributos) {
		$this -> validarIdProcesoUsuarioSearch($atributos['id_proceso_usuario']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarIdParametroSearch($atributos['id_parametro']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarValorParametroSearch($atributos['valor_parametro']);
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

	function validarIdParametroSearch($atributo) {
		$this -> respuesta = '';
		if (!ctype_digit($atributo)) {
			$this -> respuesta = 'ID_PARAMETRO_CARACTERES_INCORRECTOS';
		}
	}

	function validarIdProcesoUsuario($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'ID_PROCESO_USUARIO_VACIO';
		} else if (!ctype_digit($atributo)) {
			$this -> respuesta = 'ID_PROCESO_USUARIO_CARACTERES_INCORRECTOS';
		}
	}

	function validarIdProcesoUsuarioSearch($atributo) {
		$this -> respuesta = '';
		if (!ctype_digit($atributo)) {
			$this -> respuesta = 'ID_PROCESO_USUARIO_CARACTERES_INCORRECTOS';
		}
	}

	function validarValorParametro($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'VALOR_PARAMETRO_VACIO';
		} else if (!ctype_digit($atributo)) {
			$this -> respuesta = 'VALOR_PARAMETRO_CARACTERES_INCORRECTOS';
		}
	}

	function validarValorParametroSearch($atributo) {
		$this -> respuesta = '';
		if (!ctype_digit($atributo)) {
			$this -> respuesta = 'VALOR_PARAMETRO_CARACTERES_INCORRECTOS';
		}
	}

}

?>