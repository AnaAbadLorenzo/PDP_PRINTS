<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class DeleteUsuarioAccion extends ValidacionesBase{


	private $usuario;
	public $respuesta;

	function __construct()
	{
		$this->usuario = new UsuarioModel();
	}
	function comprobarDeleteUsuario($datosDeleteUsuario){


		$this->existeUsuario($datosDeleteUsuario);

	}

function existeUsuario($datosDeleteUsuario){

		$datoBuscar = array();
		$datoBuscar['dni_usuario'] = $datosDeleteUsuario['dni_usuario'];
		$resultado = $this->usuario->getByDNI('usuario', $datoBuscar)['resource'];

		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'USUARIO_NO_EXISTE';
		}}




}
?>