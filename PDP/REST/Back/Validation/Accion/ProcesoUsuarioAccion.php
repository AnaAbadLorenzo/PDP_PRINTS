<?php

include_once './Validation/ValidacionesBase.php';

include_once './Comun/funcionesComunes.php';

include_once './Modelos/ProcesoUsuarioModel.php';
include_once './Modelos/ProcesoModel.php';
include_once './Modelos/UsuarioModel.php';

class ProcesoUsuarioAccion extends ValidacionesBase {

	private $proceso_usuario;
	private $proceso;
	private $usuario;

	public $respuesta;

	function __construct() {
		$this -> proceso_usuario = new ProcesoUsuarioModel;
		$this -> proceso = new ProcesoModel;
		$this -> usuario = new UsuarioModel;
	}

	function comprobarAdd($proceso_usuario_datos){
		$this -> existeDniUsuario($proceso_usuario_datos);
		$this -> existeIdProceso($proceso_usuario_datos);
		return $this -> respuesta;
	}

	function comprobarEdit($proceso_usuario_datos){
		$this -> existeProcesoUsuario($proceso_usuario_datos);
		$this -> existeDniUsuario($proceso_usuario_datos);
		$this -> existeIdProceso($proceso_usuario_datos);
		return $this -> respuesta;
	}

	function comprobarDelete($proceso_usuario_datos){
		$this -> existeProcesoUsuario($proceso_usuario_datos);
		return $this -> respuesta;
	}
 
	function existeDniUsuario($proceso_usuario_datos) {

		$this -> usuario -> getById('Usuario', $proceso_usuario_datos);
		$resultado = $this -> usuario -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'USUARIO_NO_EXISTE';
		}
		
	}
 
	function existeIdProceso($proceso_usuario_datos) {

		$this -> proceso -> getById('Proceso', $proceso_usuario_datos);
		$resultado = $this -> proceso -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'PROCESO_NO_EXISTE';
		}
		
	}
 
	function existeProcesoUsuario($proceso_usuario_datos) {

		$this -> proceso_usuario -> getById('ProcesoUsuario', $proceso_usuario_datos);
		$resultado = $this -> proceso_usuario -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'PROCESO_USUARIO_NO_EXISTE';
		}
		
	}
 
	function noExisteProcesoUsuario($proceso_usuario_datos) {

		$this -> proceso_usuario -> getById('ProcesoUsuario', $proceso_usuario_datos);
		$resultado = $this -> proceso_usuario -> mapping -> resource;

		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'PROCESO_USUARIO_YA_EXISTE';
		}
		
	}

}

?>