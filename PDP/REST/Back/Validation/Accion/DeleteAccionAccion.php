<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

include_once './Mapping/AccionMapping.php';
include_once './Mapping/ACLMapping.php';

class DeleteAccionAccion extends ValidacionesBase {
	
	private $accion;
	private $acl;

	public $respuesta;

	function __construct()
	{
		$this->accion = new AccionModel();
		$this -> acl = new ACLMapping;
	}

	function comprobarDeleteAccion($datosDeleteAccion){
		$this -> existeIdAccion($datosDeleteAccion);
		$this -> accionNoEstaEnPermisos($datosDeleteAccion);
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

	function accionNoEstaEnPermisos($datos) {

		$this -> acl -> searchByAccion($datos);
		$resultado = $this -> acl -> resource;

		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'ACCION_TIENE_PERMISOS_ASOCIADOS';
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