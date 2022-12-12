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
	function comprobarAccion($datosAccion){

		$this->existeIdAccion($datosAccion);
		//no se me ocurre ninguna premisa para no poder insertar o editar una acción
		
	}

    //aquí irían las funciones de las premisas a cumplir para la inserción/edición 
	
function existeIdAccion($datosEditAccion){

		$datoBuscar = array();
		$datoBuscar['id_accion'] = $datosEditAccion['id_accion'];

		$resultado = $this->accion->getById('accion', $datoBuscar)['resource'];
		
		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'ID_ACCION_NO_EXISTE';
			//throw new DNINoExisteException('DNI_NO_EXISTE');
		}}
		
	
	

}

?>