<?php

include_once './Validation/ValidacionesBase.php';
include_once './Validation/Excepciones/UsuarioNoEncontradoException.php';
include_once './Validation/Excepciones/PasswdUsuarioNoCoincideException.php';
include_once './Comun/funcionesComunes.php';

class AutenticacionAccion extends ValidacionesBase{

	private $usuario;

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
			throw new UsuarioNoEncontradoException('USUARIO_NO_ENCONTRADO');
		}else if($resultado['borrado_usuario'] == 1){
			throw new UsuarioNoEncontradoException('USUARIO_NO_ENCONTRADO');
		}else{
			if($datosUsuario['passwd_usuario'] == $resultado['passwd_usuario']){
				return true;
			}else{
				throw new PasswdUsuarioNoCoincideException('PASSWD_USUARIO_NO_COINCIDE');
			}
		}
	}

		

}
?>