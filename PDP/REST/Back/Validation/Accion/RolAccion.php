<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';
include_once './Modelos/RolModel.php';

include_once './Mapping/UsuarioMapping.php';
include_once './Mapping/ACLMapping.php';

class RolAccion extends ValidacionesBase {

	private $rol;
	private $usuario;
	private $acl;

	public $respuesta;

	function __construct() {
		$this -> rol = new RolModel;
		$this -> usuario = new UsuarioMapping;
		$this -> acl = new ACLMapping;
	}

	function comprobarAddRol($rol_datos){
		$this -> existeRol($rol_datos);
		return $this -> respuesta;
	}

	function comprobarEditRol($rol_datos){
		$this -> noExisteRol($rol_datos);
		return $this -> respuesta;
	}

	function comprobarDeleteRol($rol_datos){
		$this -> noExisteRol($rol_datos);
		$this -> rolAsociadoAUsuario($rol_datos);
		$this -> rolNoEstaEnPermisos($rol_datos);
		return $this -> respuesta;
	}

	function comprobarReactivar($datos) {
		$this -> existeIdRol($datos);
		$this -> estaBorradoAUno($datos); //aqui salta un warning si no existe el id a revisar
	}

	function estaBorradoAUno($datos) {
		$respuesta = $this -> rol -> getById('rol', $datos)['resource'];
		if ($respuesta['borrado_rol'] === 0) {
			$this -> respuesta = 'ROL_YA_ESTABA_ACTIVADO';
		} else {
			return true;
		}
	}
 
	function existeIdRol($rol_datos) {

		$this -> rol -> getById('Rol', $rol_datos);
		$resultado = $this -> rol -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'ROL_NO_EXISTE';
		}
		
	}
 
	function existeRol($rol_datos) {

		$this -> rol -> getByName('Rol', $rol_datos);
		$resultado = $this -> rol -> mapping -> resource;

		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'ROL_YA_EXISTE';
		}
		
	}
 
	function noExisteRol($rol_datos) {

		$this -> rol -> getById('Rol', $rol_datos);
		$resultado = $this -> rol -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'ROL_NO_EXISTE';
		}
		
	}

	function rolAsociadoAUsuario($rol_datos) {
	 	$this->rol->getById('Rol', $rol_datos);
		$rolResult = $this -> rol -> mapping -> resource;
		$this->usuario->searchAll('Usuario');
		$usuarioResult = $this->usuario->feedback['resource'];
		if(!empty($usuarioResult)) {
			foreach($usuarioResult as $user){
				if($user['id_rol'] == $rolResult['id_rol']){
					$this->respuesta = 'ROL_ASOCIADO_USUARIO';
				}
			}
		}
		if($this->respuesta != 'ROL_ASOCIADO_USUARIO'){
			return true;
		}
	}

	function rolNoEstaEnPermisos($rol_datos) {

		$this -> acl -> searchByRol($rol_datos);
		$resultado = $this -> acl -> resource;

		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'ROL_TIENE_PERMISOS_ASOCIADOS';
		}

	}

}

?>