<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

include_once './Mapping/FuncionalidadMapping.php';
include_once './Mapping/ACLMapping.php';

class DeleteFuncionalidadAccion extends ValidacionesBase{

	
	private $funcionalidad;
	private $acl;

	public $respuesta;

	function __construct()
	{
		$this->funcionalidad = new FuncionalidadModel();
		$this -> acl = new ACLMapping;
	}
	function comprobarDeleteFuncionalidad($datosDeleteFuncionalidad){
		$this->existeIdFuncionalidad($datosDeleteFuncionalidad);
		$this -> funcionalidadNoEstaEnPermisos($datosDeleteFuncionalidad);
	}

	function comprobarReactivar($datos) {
		$this -> existeIdFuncionalidad($datos);
		$this -> estaBorradoAUno($datos); //aqui salta un warning si no existe el id a revisar
	}

	function funcionalidadNoEstaEnPermisos($datos) {
		$resultado = array();
		
		$this -> acl -> searchByFuncionalidad($datos);
		$resultado = $this -> acl -> resource;

		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'FUNCIONALIDAD_TIENE_PERMISOS_ASOCIADOS';
		}

	}
	
	function estaBorradoAUno($datos) {
		$resultado = $this -> funcionalidad -> getById('funcionalidad', $datos)['resource'];
		if ($resultado['borrado_funcionalidad'] === 0) {
			$this -> respuesta = 'FUNCIONALIDAD_YA_ESTABA_ACTIVADA';
		} else {
			return true;
		}
	}

function existeIdFuncionalidad($datosDeleteFuncionalidad){

		$datoBuscar = array();
		$datoBuscar['id_funcionalidad'] = $datosDeleteFuncionalidad['id_funcionalidad'];
		$resultado = $this->funcionalidad->getById('funcionalidad', $datoBuscar)['resource'];
		
		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'ID_FUNCIONALIDAD_NO_EXISTE';
			//throw new DNINoExisteException('DNI_NO_EXISTE');
		}}
		
	
		

}
?>