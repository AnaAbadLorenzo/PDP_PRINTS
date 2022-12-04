<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/GestionUsuarios/impl/GestionUsuariosServiceImpl.php';
include_once './Validation/Atributo/Controlador/EditUsuarioValidation.php';

class GestionUsuariossController extends ControllerBase{

	private $gestionUsuariosService;
	private $editUsuarioValidation;

	public function __construct(){
		$this->gestionUsuariosService = new GestionUsuariosServiceImpl();
		$this->editUsuarioValidation = new EditUsuarioValidation();
	}

	function edit(){


			$this->editUsuarioValidation->validarEditUsuario();
			$this->gestionUsuariosService->inicializarParametros('edit');

			$respuesta = $this->gestionUsuariosService->edit('EDIT_USUARIO_COMPLETO');


			if($respuesta != 'EDIT_USUARIO_COMPLETO') {
				$this->rellenarRespuesta($respuesta, true, '');
			}else{
				$this->rellenarRespuesta('EDIT_USUARIO_COMPLETO', false, '');
			}
			$this->getRespuesta($respuesta);

	}

    function delete(){


        $this->gestionUsuariosService->inicializarParametros('delete');
        $respuesta = $this->gestionUsuariosService->delete('DELETE_USUARIO_COMPLETO');

        if($respuesta != 'DELETE_USUARIO_COMPLETO') {
			$this->rellenarRespuesta($respuesta, true, '');
		}else{
			$this->rellenarRespuesta('DELETE_USUARIO_COMPLETO', false, '');
		}
		$this->getRespuesta($respuesta);


    }
    function search(){

        $respuesta = $this->gestionUsuariosService->search('BUSQUEDA_USUARIO_CORRECTO');
			$this->rellenarRespuesta('BUSQUEDA_USUARIO_CORRECTO', false, $respuesta);
			$this->getRespuesta($respuesta);
    }
    function searchByParameters(){
		$this->gestionUsuariosService->inicializarParametros('searchByParameters');
		$respuesta = $this->gestionUsuariosService->searchByParameters('BUSQUEDA_USUARIO_CORRECTO');
		$this->rellenarRespuesta('BUSQUEDA_USUARIO_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }
}
?>