<?php

include_once './Modelos/ModelBase.php';

class CategoriaModel extends ModelBase{
  
	public $id_categoria;
	public $nombre_categoria;
	public $descripcion_categoria;
	public $borrado_categoria;
	public $dni_responsable;
    public $id_padre_categoria;
    public $usuario;
	public $mapping;

	function __construct(){
		$this->fillfields();
	}

	function fillfields(){
		$this->id_categoria = '';
		$this->nombre_categoria = '';
	 	$this->descripcion_categoria = '';
	  	$this->borrado_categoria = '';
	  	$this->dni_responsable = '';
        $this->id_padre_categoria = '';
	  	$this->usuario = '';
	  	

		if ($_POST){
			if(isset($_POST['id_categoria'])) $this->id_categoria = $_POST['id_categoria'];
			if(isset($_POST['nombre_categoria'])) $this->nombre_categoria = $_POST['nombre_categoria'];
			if(isset($_POST['descripcion_categoria'])) $this->descripcion_categoria = $_POST['descripcion_categoria'];
			if(isset($_POST['borrado_categoria'])) $this->borrado_categoria = $_POST['borrado_categoria'];
			if(isset($_POST['dni_responsable'])) $this->dni_responsable = $_POST['dni_responsable'];		
            if(isset($_POST['id_padre_categoria'])) $this->id_padre_categoria = $_POST['id_padre_categoria'];
			if(isset($_POST['usuario'])) $this->usuario = $_POST['usuario'];
		}
	}

	function getByDNI($tabla, $datosSearch){
        include_once './Mapping/'.$tabla.'Mapping.php';
        $map = ucfirst($tabla).'Mapping';
        $this->mapping = new $map();
		//$datosSearch['foraneas'] = $this->clavesForaneas;
		return $this->mapping->searchByDNI($datosSearch);
	}


    function searchByIdPadre($tabla, $datosSearch){
        include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = ucfirst($tabla).'Mapping';
        $this->mapping = new $map();
		//$datosSearch['foraneas'] = $this->clavesForaneas;
		return $this->mapping->searchByIdPadre($datosSearch);
	}

    function searchById($tabla, $datosSearch){
		
        include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = ucfirst($tabla).'Mapping';
        $this->mapping = new $map();
		return $this->mapping->searchById($datosSearch);
	}

	function getByName($tabla, $datosSearch){
        include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = ucfirst($tabla).'Mapping';
        $this->mapping = new $map();
		return $this->mapping->searchByName($datosSearch);
	}

}

?>