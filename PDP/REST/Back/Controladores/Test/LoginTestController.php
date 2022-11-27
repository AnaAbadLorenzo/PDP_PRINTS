<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Test/impl/TestLoginServiceImpl.php';
include_once './Test/Atributos/TestUsuario.php';
include_once './Validation/Excepciones/TestsFallidosException.php';

class LoginTestController extends ControllerBase{

	private $testLoginService;
	
	public function __construct(){
		$this->testLoginService = new TestLoginServiceImpl();
	}

	function testAtributosLogin(){	
		$respuesta = array();
		
		try{

			$resultado = $this->testLoginService->testAtributoUsuario();
			array_push($respuesta, $resultado);
			$resultado = $this->testLoginService->testAtributoPasswdUsuario();
			array_push($respuesta, $resultado);
			$this->rellenarRespuesta('TEST_ATRIBUTOS_LOGIN_OK', false, $respuesta);
			$this->getRespuesta($respuesta);

		}catch(TestsFallidosException $exc){
			$this->rellenarRespuesta($exc, true, '');
		}
	}
	
	function testAccionesLogin() {
		try{
			$respuesta = $this->testLoginService->testAccionLogin();
			$this->rellenarRespuesta('TEST_ACCIONES_LOGIN_OK', false, $respuesta);
			$this->getRespuesta($respuesta);

		}catch(TestsFallidosException $exc){
			$this->rellenarRespuesta($exc, true, '');
		}
	}
}
?>
