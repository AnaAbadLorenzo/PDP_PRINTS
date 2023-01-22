<?php

include_once './Modelos/ModelBase.php';

class ProcesoUsuarioModel extends ModelBase {

	public $id_proceso_usuario;
	public $fecha_proceso_usuario;
	public $calculo_huella_carbono;
	public $dni_usuario;
	public $id_proceso;
	public $borrado_proceso_usuario;
	public $usuario;

	public $mapping;

	function __construct() {
		$this->fillfields();
	}

	function fillfields() {

		$this -> id_proceso_usuario = '';
		$this -> fecha_proceso_usuario = '';
		$this -> calculo_huella_carbono = '';
		$this -> dni_usuario = '';
		$this -> id_proceso = '';
		$this -> borrado_proceso_usuario = '';
		$this -> usuario = '';

		if ($_POST) {
			if (isset($_POST['id_proceso_usuario'])) $this -> id_proceso_usuario = $_POST['id_proceso_usuario'];
			if (isset($_POST['fecha_proceso_usuario'])) $this -> fecha_proceso_usuario = $_POST['fecha_proceso_usuario'];
			if (isset($_POST['calculo_huella_carbono'])) $this -> calculo_huella_carbono = $_POST['calculo_huella_carbono'];
			if (isset($_POST['dni_usuario'])) $this -> dni_usuario = $_POST['dni_usuario'];
			if (isset($_POST['id_proceso'])) $this -> id_proceso = $_POST['id_proceso'];
			if (isset($_POST['usuario'])) $this -> usuario = $_POST['usuario'];
			if (isset($_POST['borrado_proceso_usuario'])) $this -> borrado_proceso_usuario = $_POST['borrado_proceso_usuario'];
		}

	}

	function getById($tabla, $datos) {
        include_once './Mapping/' . ucfirst($tabla) . 'Mapping.php';
        $map = $tabla . 'Mapping';
        $this -> mapping = new $map();
		return $this -> mapping -> searchById($datos);
	}

}

?>