<?php

include_once './Modelos/ModelBase.php';

class ProcesoModel extends ModelBase{
  
	public $id_proceso;
	public $nombre_proceso;
	public $descripcion_proceso;
    public $fecha_proceso;
	public $borrado_proceso;
	public $version_proceso;
    public $check_aprobacion;
    public $formula_proceso;
    public $id_categoria;
    public $dni_usuario;
	public $mapping;
	//public $clavesForaneas;

	function __construct(){
		
		$this->fillfields();
		//$this->clavesForaneas = array('rol');
	}

	function fillfields(){
		$this->id_proceso = '';
		$this->nombre_proceso = '';
	 	$this->descripcion_proceso = '';
	  	$this->fecha_proceso = '';
	  	$this->borrado_proceso = '';
        $this->version_proceso = '';
	  	$this->check_aprobacion = '';
	  	$this->formula_proceso = '';
        $this->id_categoria = '';
	  	$this->dni_usuario = '';
	  	

		if ($_POST){
			if(isset($_POST['id_proceso'])) $this->id_proceso = $_POST['id_proceso'];
			if(isset($_POST['nombre_proceso'])) $this->nombre_proceso = $_POST['nombre_proceso'];
			if(isset($_POST['descripcion_proceso'])) $this->descripcion_proceso = $_POST['descripcion_proceso'];
			if(isset($_POST['fecha_proceso'])) $this->fecha_proceso = $_POST['fecha_proceso'];
			if(isset($_POST['borrado_proceso'])) $this->borrado_proceso = $_POST['borrado_proceso'];		
            if(isset($_POST['version_proceso'])) $this->version_proceso = $_POST['version_proceso'];
			if(isset($_POST['check_aprobacion'])) $this->check_aprobacion = $_POST['check_aprobacion'];
            if(isset($_POST['formula_proceso'])) $this->formula_proceso = $_POST['formula_proceso'];		
            if(isset($_POST['id_categoria'])) $this->id_categoria = $_POST['id_categoria'];
			if(isset($_POST['dni_usuario'])) $this->dni_usuario = $_POST['dni_usuario'];
		}
	}

    function searchById($tabla, $datosSearch){
		
        include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		//$datosSearch['foraneas'] = $this->clavesForaneas;
		return $this->mapping->searchById($datosSearch);
	}

	function getVersion($tabla, $datosSearch){
		
        include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		return $this->mapping->getVersion($datosSearch);
	}

	function getByName($tabla, $datosSearch){
        include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = ucfirst($tabla).'Mapping';
        $this->mapping = new $map();
		return $this->mapping->searchByName($datosSearch);
	}

}

?>