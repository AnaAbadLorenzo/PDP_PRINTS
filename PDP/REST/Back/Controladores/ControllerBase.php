<?php

abstract class ControllerBase{

	public $serviceBase;

	function rellenarRespuesta($mensaje, $esExcepcion, $recursosDevolver){
		if($esExcepcion === true) {
			$respuesta['ok'] = false;
		}else{
			$respuesta['ok'] = true;
		}

		$respuesta['code'] = $mensaje;
		$respuesta['resource'] = $recursosDevolver;
		
		header('Content-type: application/json');
		echo(json_encode($respuesta)); 
		exit();
	}

	function getRespuesta($respuesta){
	    header('Content-type: application/json');
		echo(json_encode($respuesta));

	}
}

?>
