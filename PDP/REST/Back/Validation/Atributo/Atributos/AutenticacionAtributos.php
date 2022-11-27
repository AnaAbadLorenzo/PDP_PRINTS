<?php

include_once './Validation/Excepciones/AtributoIncorrectoException.php';
class AutenticacionAtributos extends ValidacionesFormato{
	
	function validarAtributosLogin($atributos){
		header('Content-type: application/json');
		echo(json_encode($atributos)); 
		echo("------------");
		$this->validar_usuario($atributos['usuario']);
		$this->validar_contrasena($atributos['passwd_usuario']);		
	}

	
	function validar_usuario($atributo){
		if($atributo === null || $this->Es_Vacio($atributo)===true){
			throw new AtributoIncorrectoException('LOGIN_USUARIO_VACIO');
		}

		if($this->Longitud_minima($atributo,3)===false){
			throw new AtributoIncorrectoException('LOGIN_USUARIO_MENOR_QUE_3');
		}

		if($this->Longitud_maxima($atributo,48)===false){
			throw new AtributoIncorrectoException('LOGIN_USUARIO_MAYOR_QUE_48');
		}
		if($this->comprobarFormatoLoginContrasena($atributo)===false){
			throw new AtributoIncorrectoException('LOGIN_USUARIO_ALFANUMERICO_INCORRECTO');
		}	
	}

	
	function validar_contrasena($atributo){
		if($atributo === null || $this->Es_Vacio($atributo)===true){
			throw new AtributoIncorrectoException('PASSWD_USUARIO_VACIO');
		}
	}
}
?>