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
				$this->validar_passwd_usuario($atributos['usuario']);
            }
	}

	function validar_dni_usuario($atributo){
		$this->respuesta = '';
		if($atributo === null || $this->Es_Vacio($atributo)===true){
			$this->respuesta = 'DNI_PERSONA_VACIO';
		}
		if($this->Formato_dni($atributo)===false){
			$this->respuesta = 'DNI_PERSONA_ALFANUMERICO_INCORRECTO';
		}
		if($this->LetraNIF($atributo)===false){
			$this->respuesta = 'DNI_PERSONA_LETRA_INCORRECTO';
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

    

}
?>