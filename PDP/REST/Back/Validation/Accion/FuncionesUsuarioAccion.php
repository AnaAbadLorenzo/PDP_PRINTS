<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class FuncionesUsuarioAccion extends ValidacionesBase{

	private $usuario;
	public $respuesta;

	function __construct()
	{
		$this->usuario = new UsuarioModel();
	}
	function comprobarFuncionesUsuarioAccion($datosFuncionesUsuario){
		$this->existeUsuario($datosFuncionesUsuario);
	}

function existeUsuario($datosFuncionesUsuario){

		$datoBuscar = array();
		$datoBuscar['dni_usuario'] = $datosFuncionesUsuario['dni_usuario'];
		$resultado = $this->usuario->getByDNI('usuario', $datoBuscar)['resource'];

		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'USUARIO_NO_EXISTE';
		}}




}
?>