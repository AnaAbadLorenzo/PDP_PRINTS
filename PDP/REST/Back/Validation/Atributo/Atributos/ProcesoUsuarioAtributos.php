<?php

class ProcesoUsuarioAtributos extends ValidacionesFormato {

	public $respuesta;
	
	function validarAtributosAdd($atributos) {
		$this -> validarCalculoHuellaCarbono($atributos['calculo_huella_carbono']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarUsuario($atributos['usuario']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarIdProceso($atributos['id_proceso']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}
	
	function validarAtributosEdit($atributos) {
		$this -> validarIdProcesoUsuario($atributos['id_proceso_usuario']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarFechaProcesoUsuario($atributos['fecha_proceso_usuario']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarCalculoHuellaCarbono($atributos['calculo_huella_carbono']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarDniUsuario($atributos['dni_usuario']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarIdProceso($atributos['id_proceso']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}
	
	function validarAtributosDelete($atributos) {
		$this -> validarIdProcesoUsuario($atributos['id_proceso_usuario']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}
	
	function validarAtributosSearch($atributos) {
		$this -> validarFechaProcesoUsuarioSearch($atributos['fecha_proceso_usuario']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarCalculoHuellaCarbonoSearch($atributos['calculo_huella_carbono']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarDniUsuarioSearch($atributos['dni_usuario']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarIdProcesoSearch($atributos['id_proceso']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}

	function validarDniUsuario($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'DNI_USUARIO_VACIO';
		} else if (!ctype_alnum($atributo)) {
			$this -> respuesta = 'DNI_USUARIO_CARACTERES_INCORRECTOS';
		} else if (strlen($atributo) > 10) {
			$this -> respuesta = 'DNI_USUARIO_DEMASIADO_LARGO';
		}
	}

	function validarUsuario($atributo){
		if ($atributo === null || $this->Es_Vacio($atributo)===true) {
			$this->respuesta = 'LOGIN_USUARIO_VACIO';
		}

		if ($this->Longitud_minima($atributo,3)===false) {
			$this->respuesta = 'LOGIN_USUARIO_MENOR_QUE_3';
		}

		if($this->Longitud_maxima($atributo,48)===false){
			$this->respuesta = 'LOGIN_USUARIO_MAYOR_QUE_48';
		}
		if($this->comprobarFormatoLoginContrasena($atributo)===false){
			$this->respuesta = 'LOGIN_USUARIO_ALFANUMERICO_INCORRECTO';
		}	
	}

	function validarDniUsuarioSearch($atributo) {
		$this -> respuesta = '';
		if (!ctype_alnum($atributo)) {
			$this -> respuesta = 'DNI_USUARIO_CARACTERES_INCORRECTOS';
		} else if (strlen($atributo) > 10) {
			$this -> respuesta = 'DNI_USUARIO_DEMASIADO_LARGO';
		}
	}

	function validarFechaProcesoUsuario($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'FECHA_PROCESO_USUARIO_VACIO';
		} else if (!$this -> Formato_fecha($atributo)) {
			$this -> respuesta = 'FECHA_PROCESO_USUARIO_CARACTERES_INCORRECTOS';
		}
	}

	function validarFechaProcesoUsuarioSearch($atributo) {
		$this -> respuesta = '';
		if (!$this -> Formato_fecha($atributo)) {
			$this -> respuesta = 'FECHA_PROCESO_USUARIO_CARACTERES_INCORRECTOS';
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

	function validarIdProcesoUsuario($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'ID_PROCESO_USUARIO_VACIO';
		} else if (!ctype_digit($atributo)) {
			$this -> respuesta = 'ID_PROCESO_USUARIO_CARACTERES_INCORRECTOS';
		}
	}

	function validarCalculoHuellaCarbono($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'calculo_huella_carbono_VACIO';
		}
	}

	function validarCalculoHuellaCarbonoSearch($atributo) {
		$this -> respuesta = '';
		if (strlen($atributo) > 80) {
			$this -> respuesta = 'calculo_huella_carbono_DEMASIADO_LARGO';
		} else if (!ctype_alnum($atributo)) {
			$this -> respuesta = 'calculo_huella_carbono_CARACTERES_INCORRECTOS';
		}
	}

	function validarBorradoProcesoUsuario($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'BORRADO_PARAMETRO_VACIO';
		}
	}

}

?>