<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Autenticacion/impl/AutenticacionServiceImpl.php';
include_once './Validation/Atributo/Controlador/AutenticacionValidation.php';

class AutenticacionController extends ControllerBase {

	private $autenticacionService;
	private $autenticacionValidation;

	public function __construct(){
		$this->autenticacionService = new AutenticacionServiceImpl();
		$this->autenticacionValidation = new AutenticacionValidation();
	}

	function login(){	
		try {
			$this->autenticacionValidation->validarLogin();	
			$this->autenticacionService->inicializarParametros('login');
		
			$respuesta = $this->autenticacionService->login('LOGIN_USUARIO_CORRECTO');
			$this->rellenarRespuesta('LOGIN_USUARIO_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);

		} catch (AtributoIncorrectoException $exc) {
			$this->rellenarRespuesta($exc, true, '');
		}
	}

	function recuperarPass() {

		$this -> autenticacionService -> inicializarParametros('recuperarPass');
		
		$respuesta = $this -> autenticacionService -> recuperarPass();

		if ($respuesta != true) {
			if ($respuesta == 'email_incorrecto') {
				$this -> rellenarRespuesta('EMAIL_INCORRECTO', false, $respuesta);
			} else {
				$this -> rellenarRespuesta('PROBELMA', false, $respuesta);
			}
		} else {
			$this -> rellenarRespuesta('RECUPERAR_PASS_OK', false, $respuesta);
			$this -> getRespuesta($respuesta);
		}

	}

}
?>