<?php

include_once './Validation/ValidacionesBase.php';
include_once './Validation/Excepciones/UsuarioNoEncontradoException.php';
include_once './Validation/Excepciones/PasswdUsuarioNoCoincideException.php';
include_once './Validation/Excepciones/UsuarioYaExisteException.php';
include_once './Validation/Excepciones/DNIYaExisteException.php';
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
 
	function existeUsuario($datosUsuario){
		
		$datoBuscar = array();
		$datoBuscar['usuario'] = $datosUsuario['usuario'];
		$resultado = $this->usuario->getByLogin('usuario', $datoBuscar)['resource'];
		if(sizeof($resultado) == 0) {
			return true;
		}else{
			throw new UsuarioYaExisteException('USUARIO_YA_EXISTE');
		}
		
	}

function existeDNI($datosRegistroPersona){

		$datoBuscar = array();
		$datoBuscar['dni_persona'] = $datosRegistroPersona['dni_persona'];
		$resultado = $this->persona->getByDNI('persona', $datoBuscar)['resource'];
		
		if(sizeof($resultado) == 0) {
			return true;
		}else{
			throw new DNIYaExisteException('DNI_YA_EXISTE');
		}}
		
	
		

}
?>