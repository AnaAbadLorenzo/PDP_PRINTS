<?php

include_once './Servicios/LogExcepciones/impl/LogExcepcionesServiceImpl.php';
include_once './Comun/codigosExcepciones/codigosExcepciones.php';

class ServiceBase{

	protected $modelo;
	protected $clase_validacion;

	protected $log_excepciones;

	function rellenarExcepcion($mensaje, $clase){		
		$feedback['ok'] = false;
		$feedback['code'] = $mensaje;
		$feedback['resource']='';
		$log_excepciones = new LogExcepcionesServiceImpl();
		$log_excepciones->inicializarParametros();
		$log_excepciones->insertarLogExcepciones($this->construirExcepcion($mensaje, $clase));
		header('Content-type: application/json');
		echo(json_encode($feedback));
		exit();
	}

	function crearModelo($entidad){
		include_once './Modelos/'.$entidad.'Model.php';
		$entidadCrear = $entidad.'Model';
		$this->entidad = new $entidadCrear();
		return $this->entidad;
	}

	function crearValidacionAccion($entidad){
		$entidadCrear = $entidad;
		include_once './Validation/Accion/'.$entidadCrear.'Accion.php';
		$entidadCrear = $entidadCrear.'Accion';
		$validacion = new $entidadCrear;
		return $validacion;
	}

	function crearValidacionFormato($entidad){
		$entidadCrear = $entidad;
		include_once './Validation/Formato/'.$entidadCrear.'Formato.php';
		$entidadCrear = $entidadCrear.'Formato';
		$validacion = new $entidadCrear;
		return $validacion;
	}

	function construirExcepcion($mensaje, $clase){
		$datosExcepcion = array();

		if($clase == 'login'){
			$datosExcepcion['usuario'] = 'GENERICO';
		}
		$datosExcepcion['tipo_excepcion'] = $mensaje;
		$datosExcepcion['descripcion_excepcion'] = constant($mensaje);
		date_default_timezone_set('Europe/Madrid');
		$date = date('Y-m-d H:i:s', time());
		$datosExcepcion['fecha']=(string)$date;

		return $datosExcepcion;
	}
}
?>