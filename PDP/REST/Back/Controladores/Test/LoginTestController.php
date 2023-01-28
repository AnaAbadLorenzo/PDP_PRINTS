<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Test/impl/TestLoginServiceImpl.php';
include_once './Test/Atributos/Usuario/TestUsuario.php';

class LoginTestController extends ControllerBase{

	private $testLoginService;
	
	public function __construct(){
		$this->testLoginService = new TestLoginServiceImpl();
	}

	function testAtributosLogin(){	
		$respuesta = array();
		
		$resultado = $this->testLoginService->testAtributoUsuario();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
			
		array_push($respuesta, $resultado);
		$resultado = $this->testLoginService->testAtributoPasswdUsuario();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}

		array_push($respuesta, $resultado);
		$this->rellenarRespuesta('TEST_ATRIBUTOS_LOGIN_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}
	
	function testAccionesLogin() {
		
		$respuesta = $this->testLoginService->testAccionLogin();
		if($respuesta == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($respuesta, true, '');
		}

		$this->rellenarRespuesta('TEST_ACCIONES_LOGIN_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}
}
?>
