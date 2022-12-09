<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Registro/impl/RegistroServiceImpl.php';
include_once './Validation/Atributo/Controlador/RegistroValidation.php';

class RegistroController extends ControllerBase{

	private $registroService;
	private $registroValidation;

	public function __construct(){
		$this->registroService = new RegistroServiceImpl();
		$this->registroValidation = new RegistroValidation();
	}

	function registro(){	
		
		$this->registroValidation->validarRegistro();	

		if($this->registroValidation->respuesta != ''){
			$this->rellenarRespuesta($this->registroValidation->respuesta, true, '');
		}
		
		$this->registroService->inicializarParametros('registro');
		
		$respuesta = $this->registroService->registro('REGISTRO_OK');
		if($respuesta != 'REGISTRO_OK') {
			$this->rellenarRespuesta($respuesta, true, '');
		}else{
			$this->rellenarRespuesta('REGISTRO_OK', false, $this->registroService->recursos);
		}
		$this->getRespuesta($respuesta);
	}	
}

?>