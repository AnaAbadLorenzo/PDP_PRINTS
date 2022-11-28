<?php
class AutenticacionAtributos extends ValidacionesFormato{
	public $respuesta;
	function validarAtributosLogin($atributos){
		$this->validar_usuario($atributos['usuario']);
		$this->validar_contrasena($atributos['passwd_usuario']);	
	}

	
	function validar_usuario($atributo){
		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'LOGIN_USUARIO_VACIO';
		}

		if($this->Longitud_minima($atributo,3)===false){
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
		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'PASSWD_USUARIO_VACIO';
		}
	}
}
?>