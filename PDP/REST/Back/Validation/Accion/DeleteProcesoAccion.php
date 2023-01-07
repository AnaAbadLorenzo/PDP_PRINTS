<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class DeleteProcesoAccion extends ValidacionesBase{

	
	private $proceso;
	public $respuesta;

	function __construct()
	{
		$this->proceso = new ProcesoModel();
	}
	function comprobarDeleteProceso($datosDeleteProceso){

		
		$this->existeIdProceso($datosDeleteProceso);
		
	}

function existeIdProceso($datosDeleteProceso){

		$datoBuscar = array();
		$datoBuscar['id_proceso'] = $datosDeleteProceso['id_proceso'];
		$resultado = $this->proceso->getById('proceso', $datoBuscar)['resource'];
		
		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'ID_PROCESO_NO_EXISTE';
			//throw new DNINoExisteException('DNI_NO_EXISTE');
		}}
		
	
		

}
?>