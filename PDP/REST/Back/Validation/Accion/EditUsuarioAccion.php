<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class EditUsuarioAccion extends ValidacionesBase{


	private $usuario;
	public $respuesta;

	function __construct()
	{
		$this->usuario = new UsuarioModel();
	}
	function comprobarEditUsuario($datosEditUsuario){


		$this->existeUsuario($datosEditUsuario);

	}

function existeUsuario($datosEditUsuario){

		$datoBuscar = array();
		$datoBuscar['dni_usuario'] = $datosEditUsuario['dni_usuario'];
		$resultado = $this->usuario->getByDNI('usuario', $datoBuscar)['resource'];

		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'USUARIO_NO_EXISTE';
		}}




}
?>