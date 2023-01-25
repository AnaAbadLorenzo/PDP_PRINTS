<?php

include_once './Controladores/ControllerBase.php';

include_once './Servicios/Comun/Paginacion.php';
include_once './Servicios/ProcesoUsuario/impl/ProcesoUsuarioServiceImpl.php';

include_once './Validation/Atributo/Controlador/ProcesoUsuarioValidation.php';

class GestionProcesosUsuarioController extends ControllerBase {

	private $proceso_usuario_service;
	private $proceso_usuario_validation;

	public function __construct() {
		$this -> proceso_usuario_service = new ProcesoUsuarioServiceImpl;
        $this -> proceso_usuario_validation = new ProcesoUsuarioValidation;
	}

	function add()
	{
		$this -> proceso_usuario_validation -> validarAdd();
		if (!empty($this -> proceso_usuario_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> proceso_usuario_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> proceso_usuario_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> proceso_usuario_validation -> respuesta_accion, true, '');

		} else {
			$this -> proceso_usuario_service -> inicializarParametros();
	
			$respuesta = $this -> proceso_usuario_service -> add('PROCESO_USUARIO_CREADO');

			if ($respuesta != 'PROCESO_USUARIO_CREADO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta('PROCESO_USUARIO_CREADO', false, $respuesta);
			}
			$this -> getRespuesta($respuesta);
		}
	}

	function edit()
	{
		$this -> proceso_usuario_validation -> validarEdit();
		if (!empty($this -> proceso_usuario_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> proceso_usuario_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> proceso_usuario_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> proceso_usuario_validation -> respuesta_accion, true, '');

		} else {
			$this -> proceso_usuario_service -> inicializarParametros();
	
			$respuesta = $this -> proceso_usuario_service -> edit('PROCESO_USUARIO_EDITADO');

			if ($respuesta != 'PROCESO_USUARIO_EDITADO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta('PROCESO_USUARIO_EDITADO', false, $respuesta);
			}
			$this -> getRespuesta($respuesta);
		}
	}
    
    function delete() {

		$this -> proceso_usuario_validation -> validarDelete();
		if (!empty($this -> proceso_usuario_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> proceso_usuario_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> proceso_usuario_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> proceso_usuario_validation -> respuesta_accion, true, '');

		} else {

			$this -> proceso_usuario_service -> inicializarParametros();

			$respuesta = $this -> proceso_usuario_service -> delete('PROCESO_USUARIO_ELIMINADO');

			if ($respuesta != 'PROCESO_USUARIO_ELIMINADO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta($respuesta, false, '');
			}

			$this -> getRespuesta($respuesta);

		}

    }
	
    function search() {
		$this -> proceso_usuario_service -> inicializarParametros();
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$respuesta = $this -> proceso_usuario_service -> search($paginacion);

		$this -> rellenarRespuesta('BUSQUEDA_PROCESO_USUARIO_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);
    }

    function searchByParameters() {

		$this -> proceso_usuario_service -> inicializarParametros();

		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$respuesta = $this -> proceso_usuario_service -> searchByParameters($paginacion);

		$this -> rellenarRespuesta('BUSQUEDA_PERSONALIZADA_PROCESO_USUARIO_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);

    }

	function searchByParametersUsuario() {

		$this -> proceso_usuario_service -> inicializarParametros();
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$respuesta = $this -> proceso_usuario_service -> searchByParametersUsuario($paginacion);

		$this -> rellenarRespuesta('BUSQUEDA_PERSONALIZADA_PROCESO_USUARIO_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);

    }


	/*
	Recibe:
	- 'id_proceso_usuario'
	- 'parametros' (array/mapa)
		- 'id_parametro' => 'valor_parametro'
		- 'id_parametro' => 'valor_parametro'
		...
	*/
	function calcular() {

		// $this -> proceso_usuario_validation -> validarCalcular();
		// if (!empty($this -> proceso_usuario_validation -> respuesta_formato)) {
		// 	$this -> rellenarRespuesta($this -> proceso_usuario_validation -> respuesta_formato, true, '');

		// } else if (!empty($this -> proceso_usuario_validation -> respuesta_accion)) {
		// 	$this -> rellenarRespuesta($this -> proceso_usuario_validation -> respuesta_accion, true, '');

		// } else {

			$this -> proceso_usuario_service -> inicializarParametros();

			$respuesta = $this -> proceso_usuario_service -> calcular('CALCULO_PROCESO_USUARIO_CORRECTO');

			if ($respuesta != 'CALCULO_PROCESO_USUARIO_CORRECTO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta($respuesta, false, '');
			}

			$this -> getRespuesta($respuesta);

		// }
		
	}

}

?>