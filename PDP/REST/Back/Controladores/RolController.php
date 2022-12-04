<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Rol/impl/RolServiceImpl.php';
//VALIDACIONESSSS?

class RolController extends ControllerBase {

	private $RolesService;
	private $editRolValidation;

	public function __construct() {
		$this -> RolesService = new RolesServiceImpl();
		$this -> editRolValidation = new editRolValidation();
	}

	function edit() {	
	
		$this -> editRolValidation -> validarEditRol();
		$this -> RolesService -> inicializarParametros('edit');
		
		$respuesta = $this -> RolesService -> edit('EDIT_ROL_COMPLETO');

		if ($respuesta != 'EDIT_ROL_COMPLETO') {
			$this->rellenarRespuesta($respuesta, true, '');
		} else {
			$this->rellenarRespuesta('EDIT_ROL_COMPLETO', false, '');
		}

		$this->getRespuesta($respuesta);
		
	}
    
    function delete() {

        $this -> RolesService -> inicializarParametros('delete');
        $respuesta = $this -> RolesService -> delete('DELETE_PERSONA_COMPLETO');

        if($respuesta != 'DELETE_PERSONA_COMPLETO') {
			$this->rellenarRespuesta($respuesta, true, '');
		}else{
			$this->rellenarRespuesta('DELETE_PERSONA_COMPLETO', false, '');
		}
		$this->getRespuesta($respuesta);

    }
	
    function search() {
        $respuesta = $this->RolesService->search('BUSQUEDA_PERSONA_CORRECTO');
			$this->rellenarRespuesta('BUSQUEDA_PERSONA_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);
    }
    function searchByParameters(){
		$this->RolesService->inicializarParametros('searchByParameters');
		$respuesta = $this->RolesService->searchByParameters('BUSQUEDA_PERSONA_CORRECTO');
		$this->rellenarRespuesta('BUSQUEDA_PERSONA_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }
}
?>