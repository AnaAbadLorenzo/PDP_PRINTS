<?php

include_once './Modelos/ModelBase.php';

class ParametroModel extends ModelBase {

	public $id_parametro;
	public $parametro_formula;
	public $descripcion_parametro;
	public $id_proceso;
	public $mapping;

	function __construct() {
		$this->fillfields();
	}

	function fillfields() {

		$this -> id_parametro = '';
		$this -> parametro_formula = '';
		$this -> parametro_formula = '';
		$this -> id_proceso = '';

		if ($_POST) {
			if (isset($_POST['id_parametro'])) $this->id_parametro = $_POST['id_parametro'];
			if (isset($_POST['parametro_formula'])) $this->parametro_formula = $_POST['parametro_formula'];
			if (isset($_POST['descripcion_parametro'])) $this->descripcion_parametro = $_POST['descripcion_parametro'];
			if (isset($_POST['id_proceso'])) $this->id_proceso = $_POST['id_proceso'];
		}

	}

	function getById($tabla, $datos) {
        include_once './Mapping/' . ucfirst($tabla) . 'Mapping.php';
        $map = $tabla . 'Mapping';
        $this -> mapping = new $map();
		return $this -> mapping -> searchById($datos);
	}

	function getByName($tabla, $datos) {
        include_once './Mapping/' . ucfirst($tabla) . 'Mapping.php';
        $map = $tabla . 'Mapping';
        $this -> mapping = new $map();
		return $this -> mapping -> searchByName($datos);
	}

}

?>