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

	function comprobarReactivar($datos) {
		$this -> existeUsuarioReactivar($datos);
		$this -> estaBorradoAUno($datos); //aqui salta un warning si no existe el id a revisar
	}

	function estaBorradoAUno($datos) {
		$resultado = $this -> usuario -> getByDNI('usuario', $datos)['resource'];

		if ($resultado['borrado_usuario'] === 0) {
			$this -> respuesta = 'USUARIO_YA_ESTABA_ACTIVADO';
		} else {
			return true;
		}

	}

	function existeUsuarioReactivar($datos) {

		$resultado = $this -> usuario -> getByDNI('usuario', $datos)['resource'];

		if(!empty($resultado)) {
			return true;
		}else{
			$this->respuesta = 'USUARIO_NO_EXISTE';
		}

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