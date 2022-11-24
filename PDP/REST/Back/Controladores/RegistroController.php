<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Registro/impl/RegistroServiceImpl.php';
include_once './Validation/Atributo/Controlador/AutenticacionValidation.php';

class RegistroController extends ControllerBase{

	private $registroService;
	private $registroValidation;

	public function __construct(){
		$this->registroService = new RegistroServiceImpl();
		//$this->autenticacionValidation = new AutenticacionValidation();
	}

	function registro(){	
		try{


			//$this->autenticacionValidation->validarLogin();	
			$this->registroService->inicializarParametros('registro');
		
			$respuesta = $this->registroService->registro('REGISTRO_PERSONA_COMPLETO');
			$this->rellenarRespuesta('REGISTRO_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);

		}catch(AtributoIncorrectoException $exc){
			//$this->rellenarRespuesta($exc, true, '');
		}
	}	
}
?>