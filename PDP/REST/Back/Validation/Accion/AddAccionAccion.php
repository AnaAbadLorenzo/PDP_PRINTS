<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class AddAccionAccion extends ValidacionesBase{

	
	private $accion;
	public $respuesta;

	function __construct()
	{
		$this->accion = new AccionModel();
	}
	
	function comprobarAccionAdd($datosAccion){

		$this->existeNombreAccion($datosAccion);
	}

	function existeNombreAccion($datosAccion){
		$datoBuscar = array();
		$datoBuscar['nombre_accion'] = $datosAccion['nombre_accion'];

		$resultado = $this->accion->getByName('accion', $datoBuscar)['resource'];
        
		if(sizeof($resultado) != 0) {
			$this->respuesta = 'ACCION_YA_EXISTE';
		}else{
			return true;
		}
}

}
?>