<?php

include_once './Validation/ValidacionesBase.php';

include_once './Comun/funcionesComunes.php';

include_once './Modelos/ParametroModel.php';
include_once './Modelos/ProcesoUsuarioModel.php';
include_once './Modelos/ProcesoUsuarioParametroModel.php';

class ProcesoUsuarioParametroAccion extends ValidacionesBase {

	private $proceso_usuario_parametro;
	private $proceso_usuario;
	private $parametro;

	public $respuesta;

	function __construct() {
		$this -> proceso_usuario_parametro = new ProcesoUsuarioParametroModel;
		$this -> proceso_usuario = new ProcesoUsuarioModel;
		$this -> parametro = new ParametroModel;
	}

	function comprobarAdd($proceso_usuario_parametro_datos) {
		$this -> noExisteClaveProcesoUsuarioParametro($proceso_usuario_parametro_datos);
		$this -> existeIdProcesoUsuario($proceso_usuario_parametro_datos);
		$this -> existeIdParametro($proceso_usuario_parametro_datos);
		return $this -> respuesta;
	}

	function comprobarEdit($proceso_usuario_parametro_datos) {
		$this -> existeClaveProcesoUsuarioParametro($proceso_usuario_parametro_datos);
		return $this -> respuesta;
	}

	function comprobarDelete($proceso_usuario_parametro_datos) {
		$this -> existeClaveProcesoUsuarioParametro($proceso_usuario_parametro_datos);
		return $this -> respuesta;
	}
 
	function existeClaveProcesoUsuarioParametro($proceso_usuario_parametro_datos) {

		$this -> proceso_usuario_parametro -> getById('ProcesoUsuarioParametro', $proceso_usuario_parametro_datos);
		$resultado = $this -> proceso_usuario_parametro -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'PROCESO_USUARIO_PARAMETRO_NO_EXISTE';
		}
		
	}
 
	function existeIdProcesoUsuario($proceso_usuario_parametro_datos) {

		$this -> proceso_usuario -> getById('ProcesoUsuario', $proceso_usuario_parametro_datos);
		$resultado = $this -> proceso_usuario -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'PROCESO_USUARIO_NO_EXISTE';
		}
		
	}
 
	function existeIdParametro($proceso_usuario_parametro_datos) {

		$this -> parametro -> getById('Parametro', $proceso_usuario_parametro_datos);
		$resultado = $this -> parametro -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'PARAMETRO_NO_EXISTE';
		}
		
	}
 
	function noExisteClaveProcesoUsuarioParametro($proceso_usuario_parametro_datos) {

		$this -> proceso_usuario_parametro -> getById('ProcesoUsuarioParametro', $proceso_usuario_parametro_datos);
		$resultado = $this -> proceso_usuario_parametro -> mapping -> resource;

		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'PROCESO_USUARIO_PARAMETRO_YA_EXISTE';
		}
		
	}

}

?>