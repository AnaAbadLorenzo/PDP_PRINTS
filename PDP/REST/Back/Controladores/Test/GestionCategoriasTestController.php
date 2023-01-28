<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Test/impl/TestGestionCategoriasServiceImpl.php';

class GestionCategoriasTestController extends ControllerBase{

	private $testGestionCategoriasService;
	
	public function __construct(){
		$this->testGestionCategoriasService = new TestGestionCategoriasServiceImpl();
	}

	function testAtributosGestionCategorias(){	
		$respuesta = array();
		
		$resultado = $this->testGestionCategoriasService->testAtributoNombreCategoria();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
			
		array_push($respuesta, $resultado);
		$resultado = $this->testGestionCategoriasService->testAtributoDescripcionCategoria();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
		array_push($respuesta, $resultado);
        $resultado = $this->testGestionCategoriasService->testAtributoDniResponsable();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}

		array_push($respuesta, $resultado);
		$this->rellenarRespuesta('TEST_ATRIBUTOS_GESTION_CATEGORIAS_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}
}
?>
