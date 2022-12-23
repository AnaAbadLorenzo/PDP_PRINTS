<?php

include_once './Modelos/ModelBase.php';

class AccionModel extends ModelBase{
  
    public $id_accion;
	public $nombre_accion;
	public $descripcion_accion;
	public $borrado_accion;
	//public $clavesForaneas;

	function __construct(){
		
		$this->fillfields();
		//$this->clavesForaneas = array('rol');
	}

	function fillfields(){
        $this->id_accion = '';
		$this->nombre_accion = '';
		$this->descripcion_accion = '';
	 	$this->borrado_accion = '';
	  	

		if ($_POST){

            if(isset($_POST['id_accion'])) $this->id_accion = $_POST['id_accion'];
			if(isset($_POST['nombre_accion'])) $this->nombre_accion = $_POST['nombre_accion'];
			if(isset($_POST['descripcion_accion'])) $this->descripcion_accion = $_POST['descripcion_accion'];
			if(isset($_POST['borrado_accion'])) $this->borrado_accion = $_POST['borrado_accion'];
        }
	}

	function getById($tabla, $datosSearch){

        include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		return $this->mapping->searchById($datosSearch);
	}

	function getByName($tabla, $datosBuscar) {
		include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		return $this->mapping->searchByName($datosBuscar);
	}

}

?>