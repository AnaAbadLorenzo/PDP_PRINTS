<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Test/impl/TestRegistroServiceImpl.php';
include_once './Test/Atributos/TestDNIPersona.php';

class RegistroTestController extends ControllerBase{

	private $testRegistroService;
	
	public function __construct(){
		$this->testRegistroService = new TestRegistroServiceImpl();
	}

	function testAtributosRegistro(){	
		$respuesta = array();
        $resultado = '';
	
		$resultado = $this->testRegistroService->testAtributoDNIPersona();
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
		array_push($respuesta, $resultado);
        $resultado = $this->testRegistroService->testAtributoNombrePersona();
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
		array_push($respuesta, $resultado);
        $resultado = $this->testRegistroService->testAtributoApellidosPersona();
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
		array_push($respuesta, $resultado);
        $resultado = $this->testRegistroService->testAtributoFechaNacPersona();
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
		array_push($respuesta, $resultado);
        $resultado = $this->testRegistroService->testAtributoDireccionPersona();
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
		array_push($respuesta, $resultado);
        $resultado = $this->testRegistroService->testAtributoEmailPersona();
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
		array_push($respuesta, $resultado);
		$resultado = $this->testRegistroService->testAtributoTelefonoPersona();
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
		array_push($respuesta, $resultado);
		$this->rellenarRespuesta('TEST_ATRIBUTOS_REGISTRO_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}

	function testAccionesRegistro() {
		
		$respuesta = $this->testRegistroService->testAccionRegistro();
		if($respuesta == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($respuesta, true, '');
		}

		$this->rellenarRespuesta('TEST_ACCIONES_REGISTRO_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}
}
?>
