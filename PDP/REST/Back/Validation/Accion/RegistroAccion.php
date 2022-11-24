<?php

include_once './Validation/ValidacionesBase.php';
include_once './Validation/Excepciones/UsuarioNoEncontradoException.php';
include_once './Validation/Excepciones/PasswdUsuarioNoCoincideException.php';
include_once './Comun/funcionesComunes.php';

class RegistroAccion extends ValidacionesBase{

	private $usuario;
	private $persona;

	function __construct()
	{
		$this->usuario = new UsuarioModel();
		$this->persona = new PersonaModel();
	}
	function comprobarRegistro($datosRegistroPersona, $datosRegistroUsuario){

		$this->existeUsuario($datosRegistroUsuario);
		$this->existeDNI($datosRegistroPersona);

	}

	function existeUsuario($datosRegistroUsuario){
		$datoBuscar = array();
		$datoBuscar['usuario'] = $datosRegistroUsuario['usuario'];
		
		$resultado = $this->usuario->getByLogin('usuario', $datoBuscar)['resource'];
		if(sizeof($resultado) == 0) {
			throw new UsuarioNoEncontradoException('USUARIO_NO_ENCONTRADO');
		}else if($resultado['borrado_usuario'] == 1){
			throw new UsuarioNoEncontradoException('USUARIO_NO_ENCONTRADO');
		}else{
			if($datosRegistroUsuario['passwd_usuario'] == $resultado['passwd_usuario']){
				return true;
			}else{
				throw new PasswdUsuarioNoCoincideException('PASSWD_USUARIO_NO_COINCIDE');
			}
		}
	}

function existeDNI($datosRegistroPersona){
		$datoBuscar = array();
		$datoBuscar['dni_persona'] = $datosRegistroPersona['dni_persona'];
		$resultado = $this->persona->getByDNI('persona', $datoBuscar)['resource'];
		
		/*if(sizeof($resultado) == 0) {
			throw new UsuarioNoEncontradoException('USUARIO_NO_ENCONTRADO');
		}else if($resultado['borrado_usuario'] == 1){
			throw new UsuarioNoEncontradoException('USUARIO_NO_ENCONTRADO');
		}else{
			if($datosUsuario['passwd_usuario'] == $resultado['passwd_usuario']){
				return true;
			}else{
				throw new PasswdUsuarioNoCoincideException('PASSWD_USUARIO_NO_COINCIDE');
			}
		}*/
	}
		

}
?>