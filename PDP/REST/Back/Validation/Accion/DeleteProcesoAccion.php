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

	function comprobarReactivar($datos) {
		$this->existeIdProceso($datos);
		$this -> estaBorradoAUno($datos); //aqui salta un warning si no existe el id a revisar
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
		}
}

function estaBorradoAUno($datos) {
	$resultado = $this -> proceso -> getById('proceso', $datos)['resource'];
	if ($resultado['borrado_proceso'] === 0) {
		$this -> respuesta = 'PROCESO_YA_ESTABA_ACTIVADO';
	} else {
		return true;
	}
}
		
	
		

}
?>