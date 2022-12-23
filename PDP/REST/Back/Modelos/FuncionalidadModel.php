<?php

include_once './Modelos/ModelBase.php';

class FuncionalidadModel extends ModelBase{
  
    public $id_funcionalidad;
	public $nombre_funcionalidad;
	public $descripcion_funcionalidad;
	public $borrado_funcionalidad;
	//public $clavesForaneas;

	function __construct(){
		
		$this->fillfields();
		//$this->clavesForaneas = array('rol');
	}

	function fillfields(){
        $this->id_funcionalidad = '';
		$this->nombre_funcionalidad = '';
		$this->descripcion_funcionalidad = '';
	 	$this->borrado_funcionalidad = '';
	
		if ($_POST){
            if(isset($_POST['id_funcionalidad'])) $this->id_funcionalidad = $_POST['id_funcionalidad'];
			if(isset($_POST['nombre_funcionalidad'])) $this->nombre_funcionalidad = $_POST['nombre_funcionalidad'];
			if(isset($_POST['descripcion_funcionalidad'])) $this->descripcion_funcionalidad = $_POST['descripcion_funcionalidad'];
			if(isset($_POST['borrado_funcionalidad'])) $this->borrado_funcionalidad = $_POST['borrado_funcionalidad'];
        }
	}

	function getById($tabla, $datosSearch){
        include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		return $this->mapping->searchById($datosSearch);
	}

	function getByName($tabla, $datosSearch){
        include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		return $this->mapping->searchByName($datosSearch);
	}

}

?>