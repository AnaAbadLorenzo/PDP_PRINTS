<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Test/impl/TestGestionRolesServiceImpl.php';
include_once './Test/Atributos/TestNombreRol.php';
include_once './Test/Atributos/TestDescripcionRol.php';

class GestionRolesTestController extends ControllerBase{

	private $testGestionRolesService;
	
	public function __construct(){
		$this->testGestionRolesService = new TestGestionRolesServiceImpl();
	}

	function testAtributosGestionRoles(){	
		$respuesta = array();
		
		$resultado = $this->testGestionRolesService->testAtributoNombreRol();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}
			
		array_push($respuesta, $resultado);
		$resultado = $this->testGestionRolesService->testAtributoDescripcionRol();
			
		if($resultado == 'TEST_FALLIDOS'){
			$this->rellenarRespuesta($resultado, true, '');
		}

		array_push($respuesta, $resultado);
		$this->rellenarRespuesta('TEST_ATRIBUTOS_GESTION_ROLES_OK', false, $respuesta);
		$this->getRespuesta($respuesta);
	}
}
?>
