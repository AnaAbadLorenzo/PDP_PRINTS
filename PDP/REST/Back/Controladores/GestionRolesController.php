<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Rol/impl/RolServiceImpl.php';
include_once './Validation/Atributo/Controlador/RolValidation.php';
include_once './Servicios/Comun/Paginacion.php';

class GestionRolesController extends ControllerBase {

	private $rol_service;
	private $rol_validation;

	public function __construct() {
		$this -> rol_service = new RolServiceImpl;
        $this -> rol_validation = new RolValidation;
	}

	function add() {
		$this -> rol_validation -> validarAdd();
		if (!empty($this -> rol_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> rol_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> rol_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> rol_validation -> respuesta_accion, true, '');

		} else {
	
			$this -> rol_service -> inicializarParametros();
			
			$respuesta = $this -> rol_service -> add('ADD_ROL_COMPLETO');

			if ($respuesta != 'ADD_ROL_COMPLETO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			
			} else {
				$this -> rellenarRespuesta($respuesta, false, '');
			}

			$this -> getRespuesta($respuesta);
		}
	}

	function edit() {

		$this -> rol_validation -> validarEdit();
		if (!empty($this -> rol_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> rol_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> rol_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> rol_validation -> respuesta_accion, true, '');

		} else {

			$this -> rol_service -> inicializarParametros();
			
			$respuesta = $this -> rol_service -> edit('EDIT_ROL_COMPLETO');

			if ($respuesta != 'EDIT_ROL_COMPLETO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta($respuesta, false, '');
			}

			$this -> getRespuesta($respuesta);

		}
		
	}
    
    function delete() {

		$this -> rol_validation -> validarDelete();
		if (!empty($this -> rol_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> rol_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> rol_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> rol_validation -> respuesta_accion, true, '');

		} else {

			$this -> rol_service -> inicializarParametros();

			$respuesta = $this -> rol_service -> delete('DELETE_PERSONA_COMPLETO');

			if ($respuesta != 'DELETE_PERSONA_COMPLETO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta($respuesta, false, '');
			}

			$this -> getRespuesta($respuesta);

		}

    }
	
    function search() {

		$this -> rol_service -> inicializarParametros();

		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$respuesta = $this -> rol_service -> search($paginacion);

		$this -> rellenarRespuesta('BUSQUEDA_ROL_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);

    }

    function searchByParameters() {

		$this -> rol_service -> inicializarParametros();

		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$respuesta = $this -> rol_service -> searchByParameters($paginacion);

		$this -> rellenarRespuesta('BUSQUEDA_PERSONALIZADA_ROL_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);
    }

	function searchDelete() {

		$this -> rol_service -> inicializarParametros();

		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$respuesta = $this -> rol_service -> searchDelete($paginacion);

		$this -> rellenarRespuesta('BUSQUEDA_ROL_ELIMINADO_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);

    }

}

?>