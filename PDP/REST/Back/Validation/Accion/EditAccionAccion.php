<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class EditAccionAccion extends ValidacionesBase{

	
	private $accion;
	public $respuesta;

	function __construct()
	{
		$this->accion = new AccionModel();
	}

	function comprobarAccionEdit($datosAccion){

		$this->existeIdAccion($datosAccion);
	}

	
	function existeIdAccion($datosEditAccion){

			$datoBuscar = array();
			$datoBuscar['id_accion'] = $datosEditAccion['id_accion'];

			$resultado = $this->accion->getById('accion', $datoBuscar)['resource'];
			
			if(!sizeof($resultado) == 0) {
				return true;
			}else{
				$this->respuesta = 'ACCION_NO_EXISTE';
			}
	}
}
?>