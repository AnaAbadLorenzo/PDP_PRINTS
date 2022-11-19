<?php

include_once './Modelos/ModelBase.php';

class LogExcepcionesModel extends ModelBase{
  
	public $id_logExcepciones;
	public $usuario;
	public $tipo_excepcion;
	public $descripcion_excepcion;
	public $fecha;

	function __construct(){
		$this->fillfields();
	}

	function fillfields(){
		$this->usuario = '';
	 	$this->tipo_excepcion = '';
	  	$this->descripcion_excepcion = '';
	  	$this->fecha = '';

		if ($_POST){
			if(isset($_POST['usuario'])) $this->usuario = $_POST['usuario'];
			if(isset($_POST['tipo_excepcion'])) $this->tipo_excepcion = $_POST['tipo_excepcion'];
			if(isset($_POST['descripcion_excepcion'])) $this->descripcion_excepcion = $_POST['descripcion_excepcion'];
			if(isset($_POST['fecha'])) $this->fecha = $_POST['fecha'];	
		}
	}

}

?>