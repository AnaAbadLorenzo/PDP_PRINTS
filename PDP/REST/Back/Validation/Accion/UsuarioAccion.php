<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';
include_once './Modelos/RolModel.php';
include_once './Mapping/CategoriaMapping.php';
include_once './Mapping/ProcesoMapping.php';
include_once './Mapping/ProcesoUsuarioMapping.php';

class UsuarioAccion extends ValidacionesBase {

	private $usuario;
	private $categoria_mapping;
	private $proceso_mapping;
	private $proceso_usuario_mapping;
	public $respuesta;

	function __construct() {
		$this -> usuario = new UsuarioModel();
		$this -> categoria_mapping = new CategoriaMapping();
		$this-> proceso_mapping = new ProcesoMapping();
		$this-> proceso_usuario_mapping = new ProcesoUsuarioMapping();
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
        $this -> respuesta = null;
		$this -> existeUsuario($datosUsuario);
		$this -> estaBorradoACero($datosUsuario);
		$this -> usuarioTieneCategoria($datosUsuario);
		$this -> usuarioTieneProceso($datosUsuario);
		$this -> usuarioTieneProcesoUsuario($datosUsuario);
		
		return $this -> respuesta;
	}

	function estaBorradoACero($datosUsuario) {
		$resultado = $this -> usuario -> getByDNI('usuario', $datosUsuario)['resource'];
		if ($resultado['borrado_usuario'] === 1) {
			$this -> respuesta = 'USUARIO_YA_ELIMINADO';
		} 
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

	function usuarioTieneCategoria($datos){
		$resultado = array();
		$this -> categoria_mapping -> buscarPorDNIUsuario($datos);
		$resultado = $this -> categoria_mapping -> feedback['resource'];
	
		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'USUARIO_TIENE_CATEGORIA';
		}
	}

	function usuarioTieneProceso($datos){
		$resultado = array();
		$this -> proceso_mapping -> buscarPorDNIUsuario($datos);
		$resultado = $this -> proceso_mapping -> feedback['resource'];
	
		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'USUARIO_TIENE_PROCESO';
		}
	}


	function usuarioTieneProcesoUsuario($datos){
		$resultado = array();
		$this -> proceso_usuario_mapping -> buscarPorDNIUsuario($datos);
		$resultado = $this -> proceso_usuario_mapping -> feedback['resource'];
	
		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'USUARIO_TIENE_PROCESO_USUARIO';
		}
	}

}

?>