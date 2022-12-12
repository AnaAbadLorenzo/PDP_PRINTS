<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class DeleteFuncionalidadAccion extends ValidacionesBase{

	
	private $funcionalidad;
	public $respuesta;

	function __construct()
	{
		$this->funcionalidad = new FuncionalidadModel();
	}
	function comprobarDeleteFuncionalidad($datosDeleteFuncionalidad){

		
		$this->existeIdFuncionalidad($datosDeleteFuncionalidad);
		
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