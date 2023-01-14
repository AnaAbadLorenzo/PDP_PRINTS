<?php

include_once './Validation/ValidacionesBase.php';

include_once './Comun/funcionesComunes.php';

include_once './Modelos/ParametroModel.php';
include_once './Modelos/ProcesoModel.php';

class ParametroAccion extends ValidacionesBase {

	private $parametro;
	private $proceso;

	public $respuesta;

	function __construct() {
		$this -> parametro = new ParametroModel;
		$this -> proceso = new ProcesoModel;
	}

	function comprobarAdd($parametro_datos){
		$this -> noExisteParametro($parametro_datos);
		$this -> existeProceso($parametro_datos);
		return $this -> respuesta;
	}

	function comprobarEdit($parametro_datos){
		$this -> existeParametro($parametro_datos);
		$this -> existeProceso($parametro_datos);
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
 
	function existeProceso($parametro_datos) {

		$this -> proceso -> getById('Proceso', $parametro_datos);
		$resultado = $this -> proceso -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'PROCESO_NO_EXISTE';
		}
		
	}

}

?>