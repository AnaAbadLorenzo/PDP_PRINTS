<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class AutenticacionAccion extends ValidacionesBase{

	private $usuario;

	public $respuesta;

	function __construct()
	{
		$this->usuario = new UsuarioModel();
	}
	function comprobarLogin($datosUsuario){	
		$this->existeUsuario($datosUsuario);
	}

	function existeUsuario($datosUsuario){
		$datoBuscar = array();
		$datoBuscar['usuario'] = $datosUsuario['usuario'];
		$resultado = $this->usuario->getByLogin('usuario', $datoBuscar)['resource'];
		if(sizeof($resultado) == 0) {
			$this->respuesta = 'USUARIO_NO_ENCONTRADO';
		}else if($resultado['borrado_usuario'] == 1){
			$this->respuesta = 'USUARIO_NO_ENCONTRADO';
		}else{
			if($datosUsuario['passwd_usuario'] == $resultado['passwd_usuario']){
				true;
			}else{
				$this->respuesta = 'PASSWD_USUARIO_NO_COINCIDE';
			}
		}

	}
}
?>