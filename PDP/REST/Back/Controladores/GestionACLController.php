<?php

include_once './Controladores/ControllerBase.php';

include_once './Servicios/ACL/impl/ACLServiceImpl.php';

include_once './Validation/Atributo/Controlador/ACLValidation.php';

class GestionACLController extends ControllerBase {

	private $acl_service;
	private $acl_validation;

	public function __construct() {
		$this -> acl_service = new ACLServiceImpl;
        $this -> acl_validation = new ACLValidation;
	}

	function add() {
		$this -> acl_validation -> validarAdd();
		if (!empty($this -> acl_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> acl_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> acl_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> acl_validation -> respuesta_accion, true, '');

		} else {
			$this -> acl_service -> inicializarParametros();
	
			$respuesta = $this -> acl_service -> add('ACCION_ASIGNADA');

			if ($respuesta != 'ACCION_ASIGNADA') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta('ACCION_ASIGNADA', false, $respuesta);
			}
			$this -> getRespuesta($respuesta);
		}

	}
    
    function delete() {

		$this -> acl_validation -> validarDelete();
		if (!empty($this -> acl_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> acl_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> acl_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> acl_validation -> respuesta_accion, true, '');

		} else {

			$this -> acl_service -> inicializarParametros();

			$respuesta = $this -> acl_service -> delete('ACCION_DESASIGNADA');

			if ($respuesta != 'ACCION_DESASIGNADA') {
				$this -> rellenarRespuesta($respuesta, true, '');
			} else {
				$this -> rellenarRespuesta($respuesta, false, '');
			}

			$this -> getRespuesta($respuesta);

		}

    }
	
    function searchFuncionalidadesUsuario() {

		$this -> acl_validation -> validarSearchFuncionalidades();
		if (!empty($this -> acl_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> acl_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> acl_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> acl_validation -> respuesta_accion, true, '');

		} else {

			$this -> acl_service -> inicializarParametros();

			$respuesta = $this -> acl_service -> searchFuncionalidadesUsuario($_POST);

			$this -> rellenarRespuesta('BUSQUEDA_ACL_CORRECTO', false, $respuesta);
			$this -> getRespuesta($respuesta);

		}

    }
	
    function searchAccionesPorFuncionalidadUsuario() {

		$this -> acl_validation -> validarSearchAccionesporFuncionalidadesUsuario();
		if (!empty($this -> acl_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> acl_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> acl_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> acl_validation -> respuesta_accion, true, '');

		} else {
			$this -> acl_service -> inicializarParametros();

			$respuesta = $this -> acl_service -> searchAccionesPorFuncionalidadUsuario($_POST);

			$this -> rellenarRespuesta('BUSQUEDA_ACL_CORRECTO', false, $respuesta);
			$this -> getRespuesta($respuesta);

		}

    }
	
    function searchPermisosUsuario() {

		$this -> acl_validation -> validarSearchFuncionalidades();
		if (!empty($this -> acl_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> acl_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> acl_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> acl_validation -> respuesta_accion, true, '');

		} else {

			$this -> acl_service -> inicializarParametros();

			$respuesta = $this -> acl_service -> searchPermisosUsuario($_POST);

			$this -> rellenarRespuesta('BUSQUEDA_ACL_CORRECTO', false, $respuesta);
			$this -> getRespuesta($respuesta);

		}
    }

	function obtenerPermisos(){
		$this->acl_validation->validarObtenerPermisos();

		if (!empty($this -> acl_validation -> respuesta_formato)) {
			$this -> rellenarRespuesta($this -> acl_validation -> respuesta_formato, true, '');

		} else if (!empty($this -> acl_validation -> respuesta_accion)) {
			$this -> rellenarRespuesta($this -> acl_validation -> respuesta_accion, true, '');

		} else {

			$this -> acl_service -> inicializarParametros();

			$respuesta = $this -> acl_service -> obtenerPermisos($_POST);

			$this -> rellenarRespuesta('PERMISOS_OBTENIDOS', false, $respuesta);
			$this -> getRespuesta($respuesta);

		}

	}

}

?>