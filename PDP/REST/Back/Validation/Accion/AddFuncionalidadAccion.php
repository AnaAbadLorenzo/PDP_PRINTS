<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class AddFuncionalidadAccion extends ValidacionesBase{

	
	private $funcionalidad;
	public $respuesta;

	function __construct()
	{
		$this->funcionalidad = new FuncionalidadModel();
	}
	function comprobarAddFuncionalidad($datosFuncionalidad){

		$this->existeNombreFuncionalidad($datosFuncionalidad);
		
	}

    function existeNombreFuncionalidad($datosEditFuncionalidad){

		$datoBuscar = array();
		$datoBuscar['nombre_funcionalidad'] = $datosEditFuncionalidad['nombre_funcionalidad'];

		$resultado = $this->funcionalidad->getByName('funcionalidad', $datoBuscar)['resource'];
	
		if($resultado != null) {
			$this->respuesta = 'FUNCIONALIDAD_YA_EXISTE';
		}else{
            return true;
        }
    }
}

?>