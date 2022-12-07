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
		$respuesta ='';
		
		$this->autenticacionValidation->validarLogin();	

		if($this->autenticacionValidation->respuesta != ''){
			$this->rellenarRespuesta($this->autenticacionValidation->respuesta, true, '');
		}

		$this->autenticacionService->inicializarParametros('login');
		
		$respuesta = $this->autenticacionService->login('LOGIN_USUARIO_CORRECTO');

		if($respuesta != 'LOGIN_USUARIO_CORRECTO') {
			$this->rellenarRespuesta($respuesta, true, '');
		}else{
			$this->rellenarRespuesta('LOGIN_USUARIO_CORRECTO', false, $this->autenticacionService->token);
		}
		$this->getRespuesta($respuesta);
	}
	
	function verificarTokenUsuario(){
		$respuesta = $this->autenticacionService->verificarToken('TOKEN_USUARIO_CORRECTO');

		if($respuesta != 'TOKEN_USUARIO_CORRECTO'){
			$this->rellenarRespuesta($respuesta, true, '');
		}
		$this->rellenarRespuesta('TOKEN_USUARIO_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
	}
		
	function recuperarPass() {

		$respuesta = $this -> autenticacionValidation -> validarRecuperarPass();
		if ($respuesta != null) {
			$this -> rellenarRespuesta('VALIDACION_ERROR', true, $respuesta);
		}
		
		$this -> autenticacionService -> inicializarParametros('recuperarPass');
		
		$respuesta = $this -> autenticacionService -> recuperarPass();
		if ($respuesta != true) {
			$this -> rellenarRespuesta('ENVIO_EMAIL_FALLIDO', true, $respuesta);
		} else {
			$this -> rellenarRespuesta('RECUPERAR_PASS_OK', false, $respuesta['usuario']);
		}

	}

}

?>