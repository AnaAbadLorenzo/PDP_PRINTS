<?php

include_once './Controladores/ControllerBase.php';
include_once './Servicios/Noticia/impl/NoticiaServiceImpl.php';
include_once './Validation/Atributo/Controlador/NoticiaValidation.php';
include_once './Servicios/Comun/Paginacion.php';

class GestionNoticiasController extends ControllerBase {

	private $noticia_service;
	private $noticia_validation;

	public function __construct() {
		$this -> noticia_service = new NoticiaServiceImpl;
        $this -> noticia_validation = new NoticiaValidation;
	}

	function add() {
		$this -> noticia_validation -> validarAdd();
		if (!empty($this -> noticia_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> noticia_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> noticia_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> noticia_validation -> respuesta_accion, true, '');

		} else {

			$this -> noticia_service -> inicializarParametros();

			$respuesta = $this -> noticia_service -> add('ADD_NOTICIA_COMPLETO');

			if ($respuesta != 'ADD_NOTICIA_COMPLETO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta($respuesta, false, '');
			}
			$this -> getRespuesta($respuesta);
		}
	}

	function edit() {

		$this -> noticia_validation -> validarEdit();
		if (!empty($this -> noticia_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> noticia_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> noticia_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> noticia_validation -> respuesta_accion, true, '');

		} else {

			$this -> noticia_service -> inicializarParametros();

			$respuesta = $this -> noticia_service -> edit('EDIT_NOTICIA_COMPLETO');

			if ($respuesta != 'EDIT_NOTICIA_COMPLETO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta($respuesta, false, '');
			}

			$this -> getRespuesta($respuesta);

		}

	}

    function delete() {

		$this -> noticia_validation -> validarDelete();
		if (!empty($this -> noticia_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> noticia_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> noticia_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> noticia_validation -> respuesta_accion, true, '');

		} else {

			$this -> noticia_service -> inicializarParametros();

			$respuesta = $this -> noticia_service -> delete('DELETE_NOTICIA_COMPLETO');

			if ($respuesta != 'DELETE_NOTICIA_COMPLETO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta($respuesta, false, '');
			}

			$this -> getRespuesta($respuesta);

		}

    }

    function search() {
		$this -> noticia_service -> inicializarParametros();
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$respuesta = $this -> noticia_service -> search($paginacion);
		$this -> rellenarRespuesta('BUSQUEDA_NOTICIA_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);
    }

	function searchAll() {
		$this -> noticia_service -> inicializarParametros();
		$respuesta = $this -> noticia_service -> searchAll();
		$this -> rellenarRespuesta('BUSQUEDA_NOTICIA_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);
    }

    function searchByParameters() {

		$this -> noticia_service -> inicializarParametros();

		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$respuesta = $this -> noticia_service -> searchByParameters($paginacion);

		$this -> rellenarRespuesta('BUSQUEDA_PERSONALIZADA_NOTICIA_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);

    }

}

?>