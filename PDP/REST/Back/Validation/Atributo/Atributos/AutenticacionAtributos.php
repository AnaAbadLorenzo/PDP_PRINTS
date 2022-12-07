<?php

class AutenticacionAtributos extends ValidacionesFormato {

	public $respuesta;
	
	function validarAtributosLogin($atributos){
		$this->validar_usuario($atributos['usuario']);
		if($this->respuesta == ''){
			$this->validar_contrasena($atributos['passwd_usuario']);
		}
	}
	
	function validarAtributosRecuperarPass($atributos){
		$this->validar_usuario($atributos['usuario']);
		if ($this -> respuesta != ''){
			return $this -> respuesta;
		}
		$this->validar_email($atributos['emailUsuario']);
		if ($this -> respuesta != ''){
			return $this -> respuesta;
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

	function validar_contrasena($atributo){
		$this->respuesta = '';

		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'PASSWD_USUARIO_VACIO';
		}
	}

	function validar_email($atributo){
		$this->respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true){
			$this -> respuesta = 'EMAIL_VACIO';
		}
		if ($this -> Formato_Email($atributo) === false){
			$this -> respuesta = 'EMAIL_INCORRECTO';
		}
	}

}
?>