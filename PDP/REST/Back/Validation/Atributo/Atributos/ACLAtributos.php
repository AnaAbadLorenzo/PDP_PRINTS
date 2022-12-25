<?php

class ACLAtributos extends ValidacionesFormato {

	public $respuesta;
	
	function validarAtributosAdd($acl_datos){
		$this -> validarIdRol($acl_datos['id_rol']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarIdFuncionalidad($acl_datos['id_funcionalidad']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarIdAccion($acl_datos['id_accion']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}
	
	function validarAtributosDelete($acl_datos){
		$this -> validarIdRol($acl_datos['id_rol']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarIdFuncionalidad($acl_datos['id_funcionalidad']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarIdAccion($acl_datos['id_accion']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}
	
	function validarAtributos($acl_datos){
		$this -> validarNombreUsuario($acl_datos['usuario']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarIdFuncionalidad($acl_datos['id_funcionalidad']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}
	
	function validarAtributosUsuario($atributos){
		$this -> validarNombreUsuario($atributos['usuario']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}

	function validarNombreUsuario($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'NOMBRE_USUARIO_VACIO';
		} else if (sizeof($atributo) > 50) {
			$this -> respuesta = 'NOMBRE_USUARIO_DEMASIADO_LARGO';
		} else if (!ctype_alnum($atributo)) {
			$this -> respuesta = 'NOMBRE_USUARIO_CARACTERES_INCORRECTOS';
		}
	}

	function validarIdRol($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'ID_ROL_VACIO';
		} else if (sizeof($atributo) > 50) {
			$this -> respuesta = 'ID_ROL_DEMASIADO_LARGO';
		} else if (!ctype_digit($atributo)) {
			$this -> respuesta = 'ID_ROL_CARACTERES_INCORRECTOS';
		}
	}

	function validarIdFuncionalidad($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'ID_FUNCIONALIDAD_VACIO';
		} else if (sizeof($atributo) > 50) {
			$this -> respuesta = 'ID_FUNCIONALIDAD_DEMASIADO_LARGO';
		} else if (!ctype_digit($atributo)) {
			$this -> respuesta = 'ID_FUNCIONALIDAD_CARACTERES_INCORRECTOS';
		}
	}

	function validarIdAccion($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'ID_ACCION_VACIO';
		} else if (sizeof($atributo) > 50) {
			$this -> respuesta = 'ID_ACCION_DEMASIADO_LARGO';
		} else if (!ctype_digit($atributo)) {
			$this -> respuesta = 'ID_ACCION_CARACTERES_INCORRECTOS';
		}
	}

}

?>