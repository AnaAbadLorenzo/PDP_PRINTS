<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Test/impl/TestGestionUsuariosServiceImpl.php';

class GestionUsuariosTestController extends ControllerBase{

	private $testGestionUsuariosService;
	
	public function __construct(){
		$this->testGestionUsuariosService = new TestGestionUsuariosServiceImpl();
	}

	function testAtributosGestionUsuarios(){	
		$respuesta = array();
		
		$resultado = $this->testGestionUsuariosService->testAtributoUsuario();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
			
		array_push($respuesta, $resultado);
		$resultado = $this->testGestionUsuariosService->testAtributoPasswdUsuario();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}

		array_push($respuesta, $resultado);
		$this->rellenarRespuesta('TEST_ATRIBUTOS_GESTION_USUARIOS_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}

	function testAccionesGestionUsuarios() {
		
		$respuesta = $this->testGestionUsuariosService->testAccionGestionUsuarios();
		if($respuesta == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($respuesta, true, '');
		}

		$this->rellenarRespuesta('TEST_ACCIONES_GESTION_USUARIOS_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}
}
?>
