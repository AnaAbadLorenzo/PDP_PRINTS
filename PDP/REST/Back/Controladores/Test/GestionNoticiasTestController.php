<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Test/impl/TestGestionNoticiasServiceImpl.php';

class GestionNoticiasTestController extends ControllerBase{

	private $testGestionNoticiasService;
	
	public function __construct(){
		$this->testGestionNoticiasService = new TestGestionNoticiasServiceImpl();
	}

	function testAtributosGestionNoticias(){	
		$respuesta = array();
		
		$resultado = $this->testGestionNoticiasService->testAtributoTituloNoticia();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
			
		array_push($respuesta, $resultado);
		$resultado = $this->testGestionNoticiasService->testAtributoContenidoNoticia();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
		array_push($respuesta, $resultado);
        $resultado = $this->testGestionNoticiasService->testAtributoFechaNoticia();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}

		array_push($respuesta, $resultado);
		$this->rellenarRespuesta('TEST_ATRIBUTOS_GESTION_NOTICIAS_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}

	function testAccionesGestionNoticias() {
		
		$respuesta = $this->testGestionNoticiasService->testAccionGestionNoticias();
		if($respuesta == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($respuesta, true, '');
		}

		$this->rellenarRespuesta('TEST_ACCIONES_GESTION_NOTICIAS_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}
}
?>