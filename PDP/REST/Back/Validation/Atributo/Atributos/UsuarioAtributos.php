<?php
class UsuarioAtributos extends ValidacionesFormato {
	public $respuesta;

	function validarAtributosUsuario($atributos){
			$this->respuesta = '';
			$this->validar_dni_usuario($atributos['dni_usuario']);
			if($this->respuesta == ''){
				$this->validar_usuario($atributos['usuario']);
			}
            if($this->respuesta == ''){
				$this->validar_passwd_usuario($atributos['passwd_usuario']);
            }
	}

	function validarAtributoPass($atributo){
		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'PASSWD_USUARIO_VACIO';
		}
	}

	function validar_dni_usuario($atributo){
		$this->respuesta = '';
		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'DNI_USUARIO_VACIO';
		}
		if($this->Formato_dni($atributo)===false){
			$this->respuesta = 'DNI_USUARIO_ALFANUMERICO_INCORRECTO';
		}
		if($this->LetraNIF($atributo)===false){
			$this->respuesta = 'DNI_USUARIO_LETRA_INCORRECTO';
		}
	}

    function validar_usuario($atributo){
		$this->respuesta = '';

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
    
	function validar_passwd_usuario($atributo){
        $this->respuesta = '';

		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'PASSWD_USUARIO_VACIO';
		}
	}
    function comprobarSearchUsuario($datosUsuario){
		$this -> validarUsuarioSearch($datosUsuario['usuario']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarIdRolSearch($datosUsuario['id_rol']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}

	function validarUsuarioSearch($atributo) {
		$this -> respuesta = '';
		if (strlen($atributo) > 40) {
			$this -> respuesta = 'USUARIO_DEMASIADO_LARGO';
		} else if (!ctype_alnum($atributo)) {
			$this -> respuesta = 'CARACTERES_USUARIO_INCORRECTOS';
		}
	}

	function validarIdRolSearch($atributo) {
		$this -> respuesta = '';
		if (strlen($atributo) > 40) {
			$this -> respuesta = 'ID_ROL_DEMASIADO_LARGO';
		} else if (!ctype_digit($atributo)) {
			$this -> respuesta = 'CARACTERES_ID_ROL_INCORRECTOS';
		}
	}
    

}
?>