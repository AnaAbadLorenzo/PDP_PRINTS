<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';
include_once './Modelos/RolModel.php';

class RolAccion extends ValidacionesBase {

	private $rol;

	private $usuario;

	public $respuesta;

	function __construct() {
		$this -> rol = new RolModel();
		$this -> usuario = new UsuarioMapping();
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
		$this->rolAsociadoAUsuario($rol_datos);
		return $this -> respuesta;
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

}

?>