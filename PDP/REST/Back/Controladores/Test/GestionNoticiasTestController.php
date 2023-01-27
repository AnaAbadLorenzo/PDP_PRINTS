<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Test/impl/TestGestionNoticiasServiceImpl.php';
include_once './Test/Atributos/TestTituloNoticia.php';
include_once './Test/Atributos/TestContenidoNoticia.php';
include_once './Test/Atributos/TestFechaNoticias.php';

class GestionRolesTestController extends ControllerBase{

	private $testGestionNoticiasService;
	
	public function __construct(){
		$this->testGestionNoticiasService = new TestGestionNoticiasServiceImpl();
	}

	function testAtributosGestionRoles(){	
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
		$this->rellenarRespuesta('TEST_ATRIBUTOS_GESTION_NOTICIAS_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}
}
?>
