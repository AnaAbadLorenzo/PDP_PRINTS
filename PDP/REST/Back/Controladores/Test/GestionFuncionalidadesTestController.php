<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Test/impl/TestGestionFuncionalidadesServiceImpl.php';

class GestionFuncionalidadesTestController extends ControllerBase{

	private $testGestionFuncionalidadesService;
	
	public function __construct(){
		$this->testGestionFuncionalidadesService = new TestGestionFuncionalidadesServiceImpl();
	}

	function testAtributosGestionFuncionalidades(){	
		$respuesta = array();
		
		$resultado = $this->testGestionFuncionalidadesService->testAtributoNombreFuncionalidad();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
			
		array_push($respuesta, $resultado);
		$resultado = $this->testGestionFuncionalidadesService->testAtributoDescripcionFuncionalidad();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}

		array_push($respuesta, $resultado);
		$this->rellenarRespuesta('TEST_ATRIBUTOS_GESTION_FUNCIONALIDADES_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}

	function testAccionesGestionFuncionalidades() {
		
		$respuesta = $this->testGestionFuncionalidadesService->testAccionGestionFuncionalidades();
		if($respuesta == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($respuesta, true, '');
		}

		$this->rellenarRespuesta('TEST_ACCIONES_GESTION_FUNCIONALIDADES_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}
}
?>
