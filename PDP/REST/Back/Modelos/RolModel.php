<?php

include_once './Modelos/ModelBase.php';

class RolModel extends ModelBase {

	public $id_rol;
	public $nombre_rol;
	public $descripcion_rol;
	public $borrado_rol;

	function __construct() {
		$this->fillfields();
		$this->clavesForaneas = array('rol');
	}

	function fillfields() {

		$this -> id_rol = '';
		$this -> nombre_rol = '';
		$this -> descripcion_rol = '';
		$this -> borrado_rol = '';

		if ($_POST) {
			if (isset($_POST['id_rol'])) $this->id_rol = $_POST['id_rol'];
			if (isset($_POST['nombre_rol'])) $this->nombre_rol = $_POST['nombre_rol'];
			if (isset($_POST['descripcion_rol'])) $this->descripcion_rol = $_POST['descripcion_rol'];
			if (isset($_POST['borrado_rol'])) $this->borrado_rol = $_POST['borrado_rol'];
		}

	}

	function getById($tabla, $datosSearch) {
        include_once './Mapping/' . $tabla . 'Mapping.php';
        $map = $tabla . 'Mapping';
        $this -> mapping = new $map();
		return $this -> mapping -> searchById($datosSearch);
	}

	function getByName($tabla, $datosSearch) {
        include_once './Mapping/' . $tabla . 'Mapping.php';
        $map = $tabla . 'Mapping';
        $this -> mapping = new $map();
		$datosSearch['foraneas'] = $this -> clavesForaneas;
		return $this -> mapping -> searchByName($datosSearch);
	}

}

?>