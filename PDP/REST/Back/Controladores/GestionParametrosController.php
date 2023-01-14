<?php

include_once './Controladores/ControllerBase.php';

include_once './Servicios/Comun/Paginacion.php';
include_once './Servicios/Parametro/impl/ParametroServiceImpl.php';

include_once './Validation/Atributo/Controlador/ParametroValidation.php';

class GestionParametrosController extends ControllerBase {

	private $parametro_service;
	private $parametro_validation;

	public function __construct() {
		$this -> parametro_service = new ParametroServiceImpl;
        $this -> parametro_validation = new ParametroValidation;
	}

	function add()
	{
		$this -> parametro_validation -> validarAdd();
		if (!empty($this -> parametro_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> parametro_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> parametro_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> parametro_validation -> respuesta_accion, true, '');

		} else {
			$this -> parametro_service -> inicializarParametros();
	
			$respuesta = $this -> parametro_service -> add('PARAMETRO_CREADO');

			if ($respuesta != 'PARAMETRO_CREADO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta('PARAMETRO_CREADO', false, $respuesta);
			}
			$this -> getRespuesta($respuesta);
		}
	}
    
    function delete() {

		$this -> parametro_validation -> validarDelete();
		if (!empty($this -> parametro_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> parametro_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> parametro_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> parametro_validation -> respuesta_accion, true, '');

		} else {

			$this -> parametro_service -> inicializarParametros();

			$respuesta = $this -> parametro_service -> delete('PARAMETRO_ELIMINADO');

			if ($respuesta != 'PARAMETRO_ELIMINADO') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta($respuesta, false, '');
			}

			$this -> getRespuesta($respuesta);

		}

    }
	
    function search() {
		$this -> parametro_service -> inicializarParametros();
		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$respuesta = $this -> parametro_service -> search($paginacion);

		$this -> rellenarRespuesta('BUSQUEDA_PARAMETRO_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);
    }
	
    function searchByParameters() {

		$this -> parametro_service -> inicializarParametros();

		$paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
		$respuesta = $this -> parametro_service -> searchByParameters($paginacion);

		$this -> rellenarRespuesta('BUSQUEDA_PERSONALIZADA_PARAMETRO_CORRECTO', false, $respuesta);
		$this -> getRespuesta($respuesta);

    }

}

?>