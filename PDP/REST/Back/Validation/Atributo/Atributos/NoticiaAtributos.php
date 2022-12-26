<?php

class NoticiaAtributos extends ValidacionesFormato {

	public $respuesta;

	function validarAtributosAdd($atributos){
		$this -> validarTituloNoticia($atributos['titulo_noticia']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarContenidoNoticia($atributos['contenido_noticia']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}

	function validarAtributosEdit($atributos){
		$this -> validarIdNoticia($atributos['id_noticia']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarTituloNoticia($atributos['titulo_noticia']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarContenidoNoticia($atributos['contenido_noticia']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}

	function validarAtributosDelete($atributos){
		$this -> validarIdNoticia($atributos['id_noticia']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}

	function validarAtributosSearch($atributos){
		$this -> validarTituloNoticia($atributos['titulo_noticia']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarContenidoNoticia($atributos['contenido_noticia']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
		$this -> validarFechaNoticia($atributos['fecha_noticia']);
		if ($this -> respuesta != '') {
			return $this -> respuesta;
		}
	}

	function validarIdNoticia($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'ID_NOTICIA_VACIO';
		}
	}

	function validarTituloNoticia($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'TITULO_NOTICIA_VACIO';
		}
	}

	function validarContenidoNoticia($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'CONTENIDO_NOTICIA_VACIO';
		}
	}

	function validarFechaNoticia($atributo) {
		$this -> respuesta = '';
		if ($atributo === null || $this -> Es_Vacio($atributo) === true) {
			$this -> respuesta = 'FECHA_NOTICIA_VACIA';
		}
	}

}

?>