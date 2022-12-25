<?php

include_once './Modelos/ModelBase.php';

class ACLModel extends ModelBase {

	public $id_rol;
	public $id_funcionalidad;
	public $id_accion;

	function __construct() {
		$this->fillfields();
		$this->clavesForaneas = array('ACL');
	}

	function fillfields() {

		$this -> id_rol = '';
		$this -> id_funcionalidad = '';
		$this -> id_accion = '';
		$this -> borrado_ACL = '';

		if ($_POST) {
			if (isset($_POST['id_rol'])) $this->id_rol = $_POST['id_rol'];
			if (isset($_POST['id_funcionalidad'])) $this->id_funcionalidad = $_POST['id_funcionalidad'];
			if (isset($_POST['id_accion'])) $this->id_accion = $_POST['id_accion'];
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