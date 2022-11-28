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
		$this->autenticacionService->inicializarParametros('login');
		
		$respuesta = $this->autenticacionService->login('LOGIN_USUARIO_CORRECTO');

		if($respuesta != 'LOGIN_USUARIO_CORRECTO') {
			$this->rellenarRespuesta($respuesta, true, '');
		}else{
			$this->rellenarRespuesta('LOGIN_USUARIO_CORRECTO', false, $this->autenticacionService->token);
		}
		$this->getRespuesta($respuesta);
	}
	
	/*function verificarTokenUsuario(){
		try{
			$respuesta = $this->autenticacionService->verificarToken('TOKEN_USUARIO_CORRECTO');
			$this->rellenarRespuesta('TOKEN_USUARIO_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);
		}catch(TokenUsuarioIncorrectoException $exec){
			$this->rellenarRespuesta($exec->getMessage(), true, '');
		}
	}*/
		

	/*function recuperarPass() {

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

	}*/
}

?>