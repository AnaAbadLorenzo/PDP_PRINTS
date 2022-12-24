<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/GestionUsuarios/impl/GestionUsuariosServiceImpl.php';
include_once './Validation/Atributo/Controlador/UsuarioValidation.php';

class GestionUsuariosController extends ControllerBase{

	private $gestionUsuariosService;
	private $usuarioValidation;

	public function __construct(){
		$this->gestionUsuariosService = new GestionUsuariosServiceImpl();
		$this->usuarioValidation = new UsuarioValidation();
	}

	function add() {
		$this -> usuarioValidation -> validarUsuarioAdd();
		if (!empty($this -> usuarioValidation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> usuarioValidation -> respuesta_formato, true, '');

		} else if (!empty($this -> usuarioValidation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> usuarioValidation -> respuesta_accion, true, '');

		} else {
	
			$this -> gestionUsuariosService -> inicializarParametros('add');
			
			$respuesta = $this -> gestionUsuariosService -> add('ADD_USUARIO_COMPLETO');

			if ($respuesta != 'ADD_USUARIO_COMPLETO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			
			} else {
				$this -> rellenarRespuesta($respuesta, false, '');
			}

			$this -> getRespuesta($respuesta);
		}
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