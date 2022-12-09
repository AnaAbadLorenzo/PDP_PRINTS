<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Test/impl/TestRecuperarPassServiceImpl.php';

class RecuperarPassTestController extends ControllerBase{

	private $testRecuperarPassService;
	
	public function __construct(){
		$this->testRecuperarPassService = new TestRecuperarPassServiceImpl();
	}

	function testAtributosRecuperarPass(){	
		$respuesta = array();
		
		$resultado = $this->testRecuperarPassService->testAtributoUsuario();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}	
		array_push($respuesta, $resultado);
		
        $resultado = $this->testRecuperarPassService->testAtributoEmailUsuario();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
		array_push($respuesta, $resultado);
		
        $this->rellenarRespuesta('TEST_ATRIBUTOS_RECUPERAR_PASS_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}
	
	function testAccionesRecuperarPass() {
		
		$respuesta = $this->testRecuperarPassService->testAccionRecuperarPass();
		if($respuesta == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($respuesta, true, '');
		}

		$this->rellenarRespuesta('TEST_ACCIONES_RECUPERAR_PASS_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}
}
?>
