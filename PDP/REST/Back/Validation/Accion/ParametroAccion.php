<?php

include_once './Validation/ValidacionesBase.php';

include_once './Comun/funcionesComunes.php';

include_once './Modelos/ParametroModel.php';

class ParametroAccion extends ValidacionesBase {

	private $parametro;

	public $respuesta;

	function __construct() {
		$this -> parametro = new ParametroModel;
	}

	function comprobarAdd($parametro_datos){
		$this -> noExisteParametro($parametro_datos);
		return $this -> respuesta;
	}

	function comprobarDelete($parametro_datos){
		$this -> existeParametro($parametro_datos);
		return $this -> respuesta;
	}
 
	function noExisteParametro($parametro_datos) {

		$this -> parametro -> getByName('Parametro', $parametro_datos);
		$resultado = $this -> parametro -> mapping -> resource;

		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'PARAMETRO_YA_EXISTE';
		}
		
	}
 
	function existeParametro($parametro_datos) {

		$this -> parametro -> getById('Parametro', $parametro_datos);
		$resultado = $this -> parametro -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'PARAMETRO_NO_EXISTE';
		}
		
	}

}

?>