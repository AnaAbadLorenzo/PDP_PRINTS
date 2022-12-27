<?php

include_once './Modelos/ModelBase.php';

class ACLModel extends ModelBase {

	public $rol;
	public $funcionalidad;
	public $accion;

	function __construct() {
		$this->fillfields();
		$this->clavesForaneas = array('ACL');
	}

	function fillfields() {

		$this -> rol = '';
		$this -> funcionalidad = '';
		$this -> accion = '';

		if ($_POST) {
			if (isset($_POST['rol'])) $this->rol = $_POST['rol'];
			if (isset($_POST['funcionalidad'])) $this->funcionalidad = $_POST['funcionalidad'];
			if (isset($_POST['accion'])) $this->accion = $_POST['accion'];
		}

	}

	// function getById($tabla, $datosSearch) {
    //     include_once './Mapping/' . $tabla . 'Mapping.php';
    //     $map = $tabla . 'Mapping';
    //     $this -> mapping = new $map();
	// 	$datosSearch['foraneas'] = $this -> clavesForaneas;
	// 	return $this -> mapping -> searchById($datosSearch);
	// }

}

?>