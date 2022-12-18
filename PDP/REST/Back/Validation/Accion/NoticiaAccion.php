<?php

include_once './Validation/ValidacionesBase.php';
include_once './Comun/funcionesComunes.php';
include_once './Modelos/NoticiaModel.php';

class NoticiaAccion extends ValidacionesBase {

	private $noticia;

	public $respuesta;

	function __construct() {
		$this -> noticia = new NoticiaModel();
	}

	function comprobarAddNoticia($noticia_datos){
		$this -> existeNoticia($noticia_datos);
		return $this -> respuesta;
	}

	function comprobarEditNoticia($noticia_datos){
		$this -> noExisteNoticia($noticia_datos);
		return $this -> respuesta;
	}

	function comprobarDeleteNoticia($noticia_datos){
		$this -> noExisteNoticia($noticia_datos);
		return $this -> respuesta;
	}

	function existeNoticia ($noticia_datos) {

		$this -> noticia -> getByName('Noticia', $noticia_datos);
		$resultado = $this -> noticia -> mapping -> resource;

		if (sizeof($resultado) == 0) {
			return true;
		} else {
			$this -> respuesta = 'NOTICIA_YA_EXISTE';
		}

	}

	function noExisteNoticia($noticia_datos) {

		$this -> noticia -> getById('Noticia', $noticia_datos);
		$resultado = $this -> noticia -> mapping -> resource;

		if (sizeof($resultado) != 0) {
			return true;
		} else {
			$this -> respuesta = 'NOTICIA_NO_EXISTE';
		}

	}

}

?>