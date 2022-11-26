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
		try{


			$this->registroValidation->validarRegistro();	
			$this->registroService->inicializarParametros('registro');
		
			$respuesta = $this->registroService->registro('REGISTRO_PERSONA_COMPLETO');
			$this->rellenarRespuesta('REGISTRO_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);

		}catch(AtributoIncorrectoException $exc){
			$this->rellenarRespuesta($exc, true, '');
		}catch(UsuarioYaExisteException $exc){
			echo("usuario");
			$this->rellenarRespuesta($exc, true, '');
		}catch(DNIYaExisteException $exc){
			echo("dni");
			$this->rellenarRespuesta($exc, true, '');
		}
	}	
}
?>