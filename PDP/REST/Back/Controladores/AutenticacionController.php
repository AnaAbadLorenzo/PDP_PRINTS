<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Autenticacion/impl/AutenticacionServiceImpl.php';
include_once './Validation/Atributo/Controlador/AutenticacionValidation.php';

class AutenticacionController extends ControllerBase{

	private $autenticacionService;
	private $autenticacionValidation;

	public function __construct(){
		$this->autenticacionService = new AutenticacionServiceImpl();
		$this->autenticacionValidation = new AutenticacionValidation();
	}

	function login(){	
		try{
			$this->autenticacionValidation->validarLogin();	
			$this->autenticacionService->inicializarParametros('login');
		
			$respuesta = $this->autenticacionService->login('LOGIN_USUARIO_CORRECTO');
			$this->rellenarRespuesta('LOGIN_USUARIO_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);

		}catch(AtributoIncorrectoException $exc){
			$this->rellenarRespuesta($exc->getMessage(), true, '');
		}
	}
	
	function verificarTokenUsuario(){
		try{
			$respuesta = $this->autenticacionService->verificarToken('TOKEN_USUARIO_CORRECTO');
			$this->rellenarRespuesta('TOKEN_USUARIO_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);
		}catch(TokenUsuarioIncorrectoException $exec){
			$this->rellenarRespuesta($exec->getMessage(), true, '');
		}
	}
}
?>