<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class RolAccion extends ValidacionesBase {

	private $rol;

	public $respuesta;

	function __construct() {
		$this -> rol = new RolModel();
	}

	function comprobarRegistro($datosRegistroRol){
		$this -> existeRol($datosRegistroRol);
		return $this -> respuesta;
	}
 
	function existeRol($datosRol) {

		$datoBuscar = array();
		$datoBuscar['id_rol'] = $datosRol['id_rol'];
		$resultado = $this -> rol -> getById('rol', $datoBuscar['resource']);

		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'ROL_YA_EXISTE';
		}
		
	}

}

?>