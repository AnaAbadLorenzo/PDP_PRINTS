<?php

include_once './Modelos/ModelBase.php';

class NoticiaModel extends ModelBase{

	public $id_noticia;
	public $titulo_noticia;
	public $contenido_noticia;
	public $fecha_noticia;

	function __construct(){

		$this->fillfields();

	}

	function fillfields(){
		$this->id_noticia = '';
		$this->titulo_noticia = '';
	 	$this->contenido_noticia = '';
	  	$this->fecha_noticia = '';

		if ($_POST){
			if(isset($_POST['id_noticia'])) $this->id_noticia = $_POST['id_noticia'];
			if(isset($_POST['titulo_noticia'])) $this->titulo_noticia = $_POST['titulo_noticia'];
			if(isset($_POST['contenido_noticia'])) $this->contenido_noticia = $_POST['contenido_noticia'];
			if(isset($_POST['fecha_noticia'])) $this->fecha_noticia = $_POST['fecha_noticia'];
		}
	}

	function getById($tabla, $datosSearch){
        include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		return $this->mapping->searchById($datosSearch);
	}

	function getByTitulo($tabla, $datosSearch){
        include_once './Mapping/'.ucfirst($tabla).'Mapping.php';
        $map = $tabla.'Mapping';
        $this->mapping = new $map();
		return $this->mapping->searchByTitulo($datosSearch);
	}

}

?>