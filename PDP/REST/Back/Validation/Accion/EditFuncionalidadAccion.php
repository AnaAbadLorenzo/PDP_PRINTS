<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class EditFuncionalidadAccion extends ValidacionesBase{

	
	private $funcionalidad;
	public $respuesta;

	function __construct()
	{
		$this->funcionalidad = new FuncionalidadModel();
	}
	function comprobarEditFuncionalidad($datosFuncionalidad){

		$this->existeIdFuncionalidad($datosFuncionalidad);
		//no se me ocurre ninguna premisa para no poder insertar o editar una acción
		
	}

    //aquí irían las funciones de las premisas a cumplir para la inserción/edición 
	
function existeIdFuncionalidad($datosEditFuncionalidad){

		$datoBuscar = array();
		$datoBuscar['id_funcionalidad'] = $datosEditFuncionalidad['id_funcionalidad'];

		$resultado = $this->funcionalidad->getById('funcionalidad', $datoBuscar)['resource'];
		
		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'ID_FUNCIONALIDAD_NO_EXISTE';
			//throw new DNINoExisteException('DNI_NO_EXISTE');
		}}
		
	
	

}

?>