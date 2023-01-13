<?php

include_once './Modelos/ModelBase.php';

class ProcesoUsuarioParametroModel extends ModelBase {

	public $id_proceso_usuario;
	public $id_parametro;
	public $valor_parametro;

	public $mapping;

	function __construct() {
		$this -> fillfields();
	}

	function fillfields() {

		$this -> id_proceso_usuario = '';
		$this -> id_parametro = '';
		$this -> valor_parametro = '';

		if ($_POST) {
			if (isset($_POST['id_proceso_usuario'])) $this -> id_proceso_usuario = $_POST['id_proceso_usuario'];
			if (isset($_POST['id_parametro'])) $this -> id_parametro = $_POST['id_parametro'];
			if (isset($_POST['valor_parametro'])) $this -> valor_parametro = $_POST['valor_parametro'];
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