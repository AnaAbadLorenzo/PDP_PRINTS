<?php

include_once './Mapping/MappingBase.php';

class ModelBase{
	protected $tabla;

	public function __construct()
	{}

	function insertar($tabla, $datosInsertar){
        include_once './Mapping/'.$tabla.'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		$respuesta = $this->mapping->add($datosInsertar);
		
		return $respuesta;
	}

	function editar($tabla, $datosModificar){
		include_once './Mapping/'.$tabla.'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		$this->mapping->edit($datosModificar);
	}

	function eliminar($tabla, $datosEliminar){
        include_once './Mapping/'.$tabla.'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		$this->mapping->delete($datosEliminar);
	}

	function buscarTodos($tabla) {
        include_once './Mapping/'.$tabla.'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		$this->mapping->search();
    }

	function getById($tabla, $datosSearch){
        include_once './Mapping/'.$tabla.'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		return $this->mapping->searchById($datosSearch);
	}

}
?>