<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';

class DeleteProcesoAccion extends ValidacionesBase{

	
	private $proceso;
	public $respuesta;
	public $parametro_mapping;
	public $proceso_usuario_mapping;

	function __construct()
	{
		$this->proceso = new ProcesoModel();
		$this->parametro_mapping = new ParametroMapping();
		$this->proceso_usuario_mapping = new ProcesoUsuarioMapping();
	}
	function comprobarDeleteProceso($datosDeleteProceso){
		$this->existeIdProceso($datosDeleteProceso);
		$this->procesoEstaAsociadoAUsuario($datosDeleteProceso);
		$this->procesoTieneParametros($datosDeleteProceso);
		
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
function procesoTieneParametros($datos){
	$resultado = array();
	$this -> parametro_mapping -> buscarPorIdProceso($datos);
	$resultado = $this -> parametro_mapping -> feedback['resource'];

	if (sizeof($resultado) == 0) {
		return true;
	} else {
		$this -> respuesta = 'PROCESO_TIENE_PARAMETROS';
	}
}

function procesoEstaAsociadoAUsuario($datos){
	$resultado = array();
	$this -> proceso_usuario_mapping -> buscarPorIdProceso($datos);
	$resultado = $this -> proceso_usuario_mapping -> feedback['resource'];

	if (sizeof($resultado) == 0) {
		return true;
	} else {
		$this -> respuesta = 'PROCESO_ESTA_ASOCIADO_A_USUARIO';
	}
}	
	
		

}
?>