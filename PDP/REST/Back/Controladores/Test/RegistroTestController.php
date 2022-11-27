<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Test/impl/TestRegistroServiceImpl.php';
include_once './Test/Atributos/TestDNIPersona.php';
include_once './Validation/Excepciones/TestsFallidosException.php';

class RegistroTestController extends ControllerBase{

	private $testRegistroService;
	
	public function __construct(){
		$this->testRegistroService = new TestRegistroServiceImpl();
	}

	function testAtributosRegistro(){	
		$respuesta = array();
        $resultado = '';
		
		try{
			$resultado = $this->testRegistroService->testAtributoDNIPersona();
			array_push($respuesta, $resultado);
            $resultado = $this->testRegistroService->testAtributoNombrePersona();
			array_push($respuesta, $resultado);
            $resultado = $this->testRegistroService->testAtributoApellidosPersona();
			array_push($respuesta, $resultado);
            $resultado = $this->testRegistroService->testAtributoFechaNacPersona();
			array_push($respuesta, $resultado);
            $resultado = $this->testRegistroService->testAtributoDireccionPersona();
			array_push($respuesta, $resultado);
            $resultado = $this->testRegistroService->testAtributoEmailPersona();
			array_push($respuesta, $resultado);
			$resultado = $this->testRegistroService->testAtributoTelefonoPersona();
			array_push($respuesta, $resultado);
			$this->rellenarRespuesta('TEST_ATRIBUTOS_REGISTRO_OK', false, $respuesta);
			$this->getRespuesta($respuesta);

		}catch(TestsFallidosException $exc){
			$this->rellenarRespuesta($exc, true, '');
		}
	}
}
?>
