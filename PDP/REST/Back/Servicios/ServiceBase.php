<?php

include_once './Servicios/LogExcepciones/impl/LogExcepcionesServiceImpl.php';
include_once './Comun/codigosExcepciones/codigosExcepciones.php';

class ServiceBase{

	protected $modelo;
	protected $clase_validacion;
	protected $entidad;

	protected $log_excepciones;

	function rellenarExcepcion($mensaje, $clase){		
		$feedback['ok'] = false;
		$feedback['code'] = $mensaje;
		$feedback['resource']='';
		
		$log_excepciones = new LogExcepcionesServiceImpl();
		$log_excepciones->inicializarParametros();
		$log_excepciones->insertarLogExcepciones($this->construirExcepcion($mensaje, $clase));
	}

	function crearModelo($entidad){
		include_once './Modelos/'.$entidad.'Model.php';
		$entidadCrear = $entidad.'Model';
		$this->entidad = new $entidadCrear();
		return $this->entidad;
	}

	function crearValidacionAccion($entidad){
		$entidadCrear = $entidad;
		if(file_exists('./Validation/Accion/'.$entidadCrear.'Accion.php')){
			include_once './Validation/Accion/'.$entidadCrear.'Accion.php';
			$entidadCrear = $entidadCrear.'Accion';
			$validacion = new $entidadCrear();
		}else{
			$validacion = null;
		}
		return $validacion;
	}

	function crearValidacionFormato($entidad){
		$entidadCrear = $entidad;
		if(file_exists('./Validation/Atributo/Atributos/'.$entidadCrear.'Atributos.php')) {
			include_once './Validation/Atributo/Atributos/'.$entidadCrear.'Atributos.php';
			$entidadCrear = $entidadCrear.'Atributos';
			$validacion = new $entidadCrear();
		}else{
			$validacin = null;
		}
		
		return $validacion;
	}

	function construirExcepcion($mensaje, $clase){
		$datosExcepcion = array();

		if($clase == 'login' || $clase == 'registro'){
			$datosExcepcion['usuario'] = 'GENERICO';
		}
		$datosExcepcion['tipo_excepcion'] = $mensaje;
		$datosExcepcion['descripcion_excepcion'] = constant($mensaje);
		date_default_timezone_set('Europe/Madrid');
		$date = date('Y-m-d H:i:s', time());
		$datosExcepcion['fecha']=(string)$date;

		return $datosExcepcion;
	}

	function verificarToken(){
        $requestHeaders = apache_request_headers();
       
        if(isset($requestHeaders['Authorization']) && !empty($requestHeaders['Authorization'])){
            return true;
        }else{
            return 'TOKEN_USUARIO_INCORRECTO';
        }
    }
	
}
?>