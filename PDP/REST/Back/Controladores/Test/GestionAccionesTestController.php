<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Test/impl/TestGestionAccionesServiceImpl.php';

class GestionAccionesTestController extends ControllerBase{

	private $testGestionAccionesService;
	
	public function __construct(){
		$this->testGestionAccionesService = new TestGestionAccionesServiceImpl();
	}

	function testAtributosGestionAcciones(){	
		$respuesta = array();
		
		$resultado = $this->testGestionAccionesService->testAtributoNombreAccion();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
			
		array_push($respuesta, $resultado);
		$resultado = $this->testGestionAccionesService->testAtributoDescripcionAccion();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}

		array_push($respuesta, $resultado);
		$this->rellenarRespuesta('TEST_ATRIBUTOS_GESTION_ACCIONES_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}

	function testAccionesGestionAcciones() {
		
		$respuesta = $this->testGestionAccionesService->testAccionGestionAcciones();
		if($respuesta == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($respuesta, true, '');
		}

		$this->rellenarRespuesta('TEST_ACCIONES_GESTION_ACCIONES_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}
}
?>
