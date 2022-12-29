<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/GestionUsuarios/impl/GestionUsuariosServiceImpl.php';
include_once './Validation/Atributo/Controlador/UsuarioValidation.php';
include_once './Servicios/Comun/Paginacion.php';

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

	function editPassUsuario(){
		$this->usuarioValidation->validarEditPassUsuario();
		$this->gestionUsuariosService->inicializarParametros('editPassUsuario');

		$respuesta = $this->gestionUsuariosService->editPassUsuario('EDIT_PASS_USUARIO_COMPLETO');

		if($respuesta != 'EDIT_PASS_USUARIO_COMPLETO') {
			$this->rellenarRespuesta($respuesta, true, '');
		}else{
			$this->rellenarRespuesta('EDIT_PASS_USUARIO_COMPLETO', false, '');
		}
		$this->getRespuesta($respuesta);
	}

	function editRolUsuario(){
		$this->usuarioValidation->validarEditRolUsuario();
		$this->gestionUsuariosService->inicializarParametros('editRolUsuario');

		$respuesta = $this->gestionUsuariosService->editRolUsuario('EDIT_USUARIO_COMPLETO');

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
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
        $respuesta = $this->gestionUsuariosService->search('BUSQUEDA_USUARIO_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_USUARIO_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }

	function searchDelete() {

		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$respuesta = $this -> gestionUsuariosService -> searchDelete('BUSQUEDA_USUARIO_CORRECTO', $paginacion);

		$this -> rellenarRespuesta('BUSQUEDA_USUARIO_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);

    }

    function searchByParameters(){
		$this->gestionUsuariosService->inicializarParametros('searchByParameters');
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$respuesta = $this->gestionUsuariosService->searchByParameters('BUSQUEDA_USUARIO_CORRECTO', $paginacion);
		$this->rellenarRespuesta('BUSQUEDA_USUARIO_CORRECTO', false, $respuesta);
		$this->getRespuesta($respuesta);
    }
	
	function reactivar() {

		$this -> gestionUsuariosService -> inicializarParametros('reactivar');
		$respuesta = $this -> gestionUsuariosService -> reactivar('REACTIVAR_USUARIO_CORRECTO');

		if (!is_array($respuesta)) { //cuando ocurre un error de validacion
			$this->rellenarRespuesta($respuesta, false, $respuesta);
			$this->getRespuesta($respuesta);
		} else if (!$respuesta['ok']) { //error sql
			$this->rellenarRespuesta($respuesta['resource']['code'], true, '');
			$this->getRespuesta($respuesta);
		} else {
			$this->rellenarRespuesta($respuesta, false, '');
			$this->getRespuesta($respuesta);
		}

	}

}
?>