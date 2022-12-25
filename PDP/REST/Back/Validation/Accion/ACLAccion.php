<?php

include_once './Validation/ValidacionesBase.php';

include_once './Comun/funcionesComunes.php';

include_once './Modelos/ACLModel.php';

include_once './Mapping/ACLMapping.php';
include_once './Mapping/UsuarioMapping.php';
include_once './Mapping/RolMapping.php';
include_once './Mapping/FuncionalidadMapping.php';
include_once './Mapping/AccionMapping.php';

class ACLAccion extends ValidacionesBase {

	private $acl_mapping;
	private $usuario_mapping;
	private $rol_mapping;
	private $funcionalidad_mapping;
	private $accion_mapping;

	public $respuesta;

	function __construct() {
		$this -> acl_mapping = new ACLMapping;
		$this -> usuario_mapping = new UsuarioMapping;
		$this -> rol_mapping = new RolMapping;
		$this -> funcionalidad_mapping = new FuncionalidadMapping;
		$this -> accion_mapping = new AccionMapping;
	}

	function comprobarAdd($acl_datos) {
		$this -> existeRol($acl_datos);
		$this -> existeAccion($acl_datos);
		$this -> existeFuncionalidad($acl_datos);
		$this -> noExisteTupla($acl_datos);
		return $this -> respuesta;
	}

	function comprobarDelete($acl_datos) {
		$this -> existeTupla($acl_datos);
		return $this -> respuesta;
	}

	function comprobarUsuario($acl_datos) {
		$this -> existeUsuario($acl_datos);
		return $this -> respuesta;
	}

	function comprobarUsuarioYFuncionalidad($acl_datos) {
		$this -> existeUsuario($acl_datos);
		$this -> existeFuncionalidad($acl_datos);
		return $this -> respuesta;
	}
 
	function existeAccion($acl_datos) {

		$this -> accion_mapping -> searchById($acl_datos);
		$resultado = $this -> accion_mapping -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'ACCION_NO_EXISTE';
		}
		
	}
 
	function existeFuncionalidad($acl_datos) {

		$this -> funcionalidad_mapping -> searchById($acl_datos);
		$resultado = $this -> funcionalidad_mapping -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'FUNCIONALIDAD_NO_EXISTE';
		}

	}
 
	function existeRol($acl_datos) {

		$this -> rol_mapping -> searchById($acl_datos);
		$resultado = $this -> rol_mapping -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'ROL_NO_EXISTE';
		}
		
	}
 
	function existeUsuario($usuario) {

		$this -> usuario_mapping -> searchByLogin($usuario);
		$resultado = $this -> usuario_mapping -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'USUARIO_NO_EXISTE';
		}
		
	}
 
	function existeTupla($acl_datos) {

		$this -> acl_mapping -> searchSpecific($acl_datos);
		$resultado = $this -> acl_mapping -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'TUPLA_NO_EXISTE';
		}
		
	}
 
	function noExisteTupla($acl_datos) {

		$this -> acl_mapping -> searchSpecific($acl_datos);
		$resultado = $this -> acl_mapping -> mapping -> resource;

		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'TUPLA_EXISTE';
		}
		
	}

}

?>