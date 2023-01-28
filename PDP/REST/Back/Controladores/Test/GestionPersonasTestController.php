<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Test/impl/TestGestionPersonasServiceImpl.php';

class GestionPersonasTestController extends ControllerBase{

	private $testGestionPersonasService;
	
	public function __construct(){
		$this->testGestionPersonasService = new TestGestionPersonasServiceImpl();
	}

	function testAtributosGestionPersonas(){	
		$respuesta = array();
		
		$resultado = $this->testGestionPersonasService->testAtributoDniPersona();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
			
		array_push($respuesta, $resultado);
		$resultado = $this->testGestionPersonasService->testAtributoNombrePersona();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
		array_push($respuesta, $resultado);
        $resultado = $this->testGestionPersonasService->testAtributoApellidosPersona();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}

		array_push($respuesta, $resultado);
        $resultado = $this->testGestionPersonasService->testAtributoDireccionPersona();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
        array_push($respuesta, $resultado);
        $resultado = $this->testGestionPersonasService->testAtributoFechaNacimientoPersona();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
        array_push($respuesta, $resultado);
        $resultado = $this->testGestionPersonasService->testAtributoEmailPersona();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
        array_push($respuesta, $resultado);
        $resultado = $this->testGestionPersonasService->testAtributoTelefonoPersona();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}


		$this->rellenarRespuesta('TEST_ATRIBUTOS_GESTION_PERSONAS_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}

	function testAccionesGestionPersonas() {
		
		$respuesta = $this->testGestionPersonasService->testAccionGestionPersonas();
		if($respuesta == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($respuesta, true, '');
		}

		$this->rellenarRespuesta('TEST_ACCIONES_GESTION_PERSONAS_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}
}
?>
