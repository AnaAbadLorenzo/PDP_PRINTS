<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';
include_once './Modelos/RolModel.php';

class RolAccion extends ValidacionesBase {

	private $rol;

	public $respuesta;

	function __construct() {
		$this -> rol = new RolModel();
	}

	function comprobarAddRol($rol_datos){
		$this -> existeRol($rol_datos);
		return $this -> respuesta;
	}

	function comprobarEditRol($rol_datos){
		$this -> noExisteRol($rol_datos);
		return $this -> respuesta;
	}

	function comprobarDeleteRol($rol_datos){
		$this -> noExisteRol($rol_datos);
		return $this -> respuesta;
	}
 
	function existeRol($rol_datos) {

		$this -> rol -> getByName('Rol', $rol_datos);
		$resultado = $this -> rol -> mapping -> resource;

		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'ROL_YA_EXISTE';
		}
		
	}
 
	function noExisteRol($rol_datos) {

		$this -> rol -> getById('Rol', $rol_datos);
		$resultado = $this -> rol -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'ROL_NO_EXISTE';
		}
		
	}

}

?>