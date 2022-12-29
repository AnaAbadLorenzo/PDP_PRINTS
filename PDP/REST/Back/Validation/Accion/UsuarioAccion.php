<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';
include_once './Modelos/RolModel.php';

class UsuarioAccion extends ValidacionesBase {

	private $usuario;

	public $respuesta;

	function __construct() {
		$this -> usuario = new UsuarioModel();
	}

	function comprobarAddUsuario($datosUsuario){
        $this->respuesta = null;
		$this -> noExisteUsuario($datosUsuario);
		return $this -> respuesta;
	}

	function comprobarEditPassUsuario($datosUsuario){
        $this->respuesta = null;
		$this -> existeUsuarioByLogin($datosUsuario);
		return $this -> respuesta;
	}

	function comprobarEditRolUsuario($datosUsuario){
        $this->respuesta = null;
		$this -> existeUsuario($datosUsuario);
		$this->existeRol($datosUsuario);
		return $this -> respuesta;
	}

    function comprobarDeleteUsuario($datosUsuario){
        $this->respuesta = null;
		$this -> existeUsuario($datosUsuario);
		return $this -> respuesta;
	}


    function existeUsuario($datosEditUsuario){
		$datoBuscar = array();
		$datoBuscar['dni_usuario'] = $datosEditUsuario['dni_usuario'];
		$resultado = $this->usuario->getByDNI('usuario', $datoBuscar)['resource'];

		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'USUARIO_NO_EXISTE';
		}
    }

	function existeUsuarioByLogin($datosEditUsuario){
		$datoBuscar = array();
		$datoBuscar['usuario'] = $datosEditUsuario['usuario'];
		$resultado = $this->usuario->getByLogin('usuario', $datoBuscar)['resource'];

		if(!sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'USUARIO_NO_EXISTE';
		}
    }

	function existeRol($rol_datos) {
		$rol = new RolModel();
		$rol -> getById('Rol', $rol_datos);
		$resultado = $rol -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'ROL_NO_EXISTE';
		}
		
	}

    function noExisteUsuario($datosEditUsuario){
		$datoBuscar = array();
		$datoBuscar['dni_usuario'] = $datosEditUsuario['dni_usuario'];
		$resultado = $this->usuario->getByDNI('usuario', $datoBuscar);
		if($resultado == null || sizeof($resultado) == 0) {
			return true;
		}else{
			$this->respuesta = 'USUARIO_YA_EXISTE';
		}
    }

}

?>