<?php

include_once './Modelos/ModelBase.php';

class UsuarioModel extends ModelBase{
  
	public $dni_usuario;
	public $usuario;
	public $passwd_usuario;
	public $borrado_usuario;
	public $id_rol;
	public $clavesForaneas;

	function __construct(){
		
		$this->fillfields();
		$this->clavesForaneas = array('rol');
	}

	function fillfields(){
		$this->dni_usuario = '';
		$this->usuario = '';
	 	$this->passwd_usuario = '';
	  	$this->borrado_usuario = '';
	  	$this->id_rol = '';

		if ($_POST){
			if(isset($_POST['dni_usuario'])) $this->dni_usuario = $_POST['dni_usuario'];
			if(isset($_POST['usuario'])) $this->usuario = $_POST['usuario'];
			if(isset($_POST['passwd_usuario'])) $this->passwd_usuario = $_POST['passwd_usuario'];
			if(isset($_POST['borrado_usuario'])) $this->borrado_usuario = $_POST['borrado_usuario'];
			if(isset($_POST['id_rol'])) $this->id_rol = $_POST['id_rol'];		
		}
	}

	function getByLogin($tabla, $datosSearch){
        include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		$datosSearch['foraneas'] = $this->clavesForaneas;
		return $this->mapping->searchByLogin($datosSearch);
	}

	function getByDNI($tabla, $datosSearch){
        include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		if(isset($datosSearch['foraneas'])){
			$datosSearch['foraneas'] = $this->clavesForaneas;
		}

		return $this->mapping->searchById($datosSearch);
	}

	function getAllUsers($tabla) {
		include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		return $this->mapping->searchAll();
	}

}

?>