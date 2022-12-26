<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

include_once './Mapping/AccionMapping.php';

class DeleteAccionAccion extends ValidacionesBase {
	
	private $accion;
	public $respuesta;

	function __construct()
	{
		$this->accion = new AccionModel();
	}

	function comprobarDeleteAccion($datosDeleteAccion){

		
		$this->existeIdAccion($datosDeleteAccion);
		
	}

	function comprobarReactivar($datos) {
		$this -> existeIdAccion($datos);
		$this -> estaBorradoACero($datos); //aqui salta un warning si no existe el id a revisar
	}

	function estaBorradoACero($datos) {
		$resultado = $this -> accion -> getById('accion', $datos)['resource'];
		if ($resultado['borrado_accion'] == 0) {
			$this -> respuesta = 'ACCION_YA_ESTABA_ACTIVADA';
		} else {
			return true;
		}
	}

function existeIdAccion($datosDeleteAccion){

		$datoBuscar = array();
		$datoBuscar['id_accion'] = $datosDeleteAccion['id_accion'];
		$resultado = $this->accion->getById('accion', $datoBuscar)['resource'];
		
		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'ID_ACCION_NO_EXISTE';
			//throw new DNINoExisteException('DNI_NO_EXISTE');
		}}
		
	
		

}
?>