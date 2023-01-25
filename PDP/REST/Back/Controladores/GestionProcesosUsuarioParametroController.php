<?php

include_once './Controladores/ControllerBase.php';

include_once './Servicios/Comun/Paginacion.php';
include_once './Servicios/ProcesoUsuarioParametro/impl/ProcesoUsuarioParametroServiceImpl.php';

include_once './Validation/Atributo/Controlador/ProcesoUsuarioParametroValidation.php';

class GestionProcesosUsuarioParametroController extends ControllerBase {

	private $proceso_usuario_parametro_service;
	private $proceso_usuario_parametro_validation;

	public function __construct() {
		$this -> proceso_usuario_parametro_service = new ProcesoUsuarioParametroServiceImpl;
        $this -> proceso_usuario_parametro_validation = new ProcesoUsuarioParametroValidation;
	}

	function add()
	{
		$this -> proceso_usuario_parametro_validation -> validarAdd();
		if (!empty($this -> proceso_usuario_parametro_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> proceso_usuario_parametro_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> proceso_usuario_parametro_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> proceso_usuario_parametro_validation -> respuesta_accion, true, '');

		} else {
			$this -> proceso_usuario_parametro_service -> inicializarParametros();
	
			$respuesta = $this -> proceso_usuario_parametro_service -> add('PROCESO_USUARIO_PARAMETRO_CREADO');

			if ($respuesta != 'PROCESO_USUARIO_PARAMETRO_CREADO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta('PROCESO_USUARIO_PARAMETRO_CREADO', false, $respuesta);
			}
			$this -> getRespuesta($respuesta);
		}
	}

	function edit()
	{
		$this -> proceso_usuario_parametro_validation -> validarEdit();
		if (!empty($this -> proceso_usuario_parametro_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> proceso_usuario_parametro_validation -> respuesta_formato, true, '');
			

		} else {
			if(!empty($this -> proceso_usuario_parametro_validation -> respuesta_accion) &&
					$this -> proceso_usuario_parametro_validation -> respuesta_accion != 'PROCESO_USUARIO_PARAMETRO_NO_EXISTE') {
				$this -> rellenarRespuesta($this -> proceso_usuario_parametro_validation -> respuesta_accion, true, '');	
			}
			$this -> proceso_usuario_parametro_service -> inicializarParametros();
	
			$respuesta = $this -> proceso_usuario_parametro_service -> edit('PROCESO_USUARIO_PARAMETRO_EDITADO');

			if ($respuesta != 'PROCESO_USUARIO_PARAMETRO_EDITADO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta('PROCESO_USUARIO_PARAMETRO_EDITADO', false, $respuesta);
			}
			$this -> getRespuesta($respuesta);
		}
	}
    
    function delete() {

		$this -> proceso_usuario_parametro_validation -> validarDelete();
		if (!empty($this -> proceso_usuario_parametro_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> proceso_usuario_parametro_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> proceso_usuario_parametro_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> proceso_usuario_parametro_validation -> respuesta_accion, true, '');

		} else {

			$this -> proceso_usuario_parametro_service -> inicializarParametros();

			$respuesta = $this -> proceso_usuario_parametro_service -> delete('PROCESO_USUARIO_PARAMETRO_ELIMINADO');

			if ($respuesta != 'PROCESO_USUARIO_PARAMETRO_ELIMINADO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta($respuesta, false, '');
			}

			$this -> getRespuesta($respuesta);

		}

    }
	
    function search() {
		$this -> proceso_usuario_parametro_service -> inicializarParametros();
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$respuesta = $this -> proceso_usuario_parametro_service -> search($paginacion);

		$this -> rellenarRespuesta('BUSQUEDA_PROCESO_USUARIO_PARAMETRO_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);
    }

    function searchByParameters() {

		$this -> proceso_usuario_parametro_service -> inicializarParametros();

		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$respuesta = $this -> proceso_usuario_parametro_service -> searchByParameters($paginacion);

		$this -> rellenarRespuesta('BUSQUEDA_PERSONALIZADA_PROCESO_USUARIO_PARAMETRO_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);

    }

	function searchByIdProcesoUsuario(){
		$this -> proceso_usuario_parametro_service -> inicializarParametros();
		$respuesta = $this -> proceso_usuario_parametro_service -> searchByIdProcesoUsuario();

		$this -> rellenarRespuesta('BUSQUEDA_PROCESO_USUARIO_PARAMETRO_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);
	}

}

?>