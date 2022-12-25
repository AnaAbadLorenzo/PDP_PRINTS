<?php

class RolAtributos extends ValidacionesFormato {

	public $respuesta;
	
	function validarAtributosAdd($atributos){
		$this -> validarNombreRol($atributos['nombre_rol']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarDescripcionRol($atributos['descripcion_rol']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}
	
	function validarAtributosEdit($atributos){
		$this -> validarIdRol($atributos['id_rol']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarNombreRol($atributos['nombre_rol']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarDescripcionRol($atributos['descripcion_rol']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}
	
	function validarAtributosDelete($atributos){
		$this -> validarIdRol($atributos['id_rol']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}
	
	function validarAtributosSearch($atributos){
		$this -> validarNombreRolSearch($atributos['nombre_rol']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarDescripcionRolSearch($atributos['descripcion_rol']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}

	function validarIdRol($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'ID_ROL_VACIO';
		}
	}

	function validarNombreRol($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'NOMBRE_ROL_VACIO';
		} else if (sizeof($atributo) > 50) {
			$this -> respuesta = 'NOMBRE_ROL_DEMASIADO_LARGO';
		} else if (!ctype_alnum($atributo)) {
			$this -> respuesta = 'NOMBRE_ROL_CARACTERES_INCORRECTOS';
		}
	}

	function validarNombreRolSearch($atributo) {
		$this -> respuesta = '';
		if (sizeof($atributo) > 50) {
			$this -> respuesta = 'NOMBRE_ROL_DEMASIADO_LARGO';
		} else if (!ctype_alnum($atributo)) {
			$this -> respuesta = 'NOMBRE_ROL_CARACTERES_INCORRECTOS';
		}
	}

	function validarDescripcionRol($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'DESCRIPCION_ROL_VACIO';
		}
	}

	function validarDescripcionRolSearch($atributo) {
		$this -> respuesta = '';
		if (sizeof($atributo) > 80) {
			$this -> respuesta = 'DESCRIPCION_ROL_DEMASIADO_LARGO';
		} else if (!ctype_alnum($atributo)) {
			$this -> respuesta = 'DESCRIPCION_ROL_CARACTERES_INCORRECTOS';
		}
	}

	function validarBorradoRol($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'BORRADO_ROL_VACIO';
		}
	}

}

?>