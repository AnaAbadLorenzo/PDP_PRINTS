<?php

interface AutenticacionService {

	public function inicializarParametros($accion);

	function login($mensaje);

	function recuperarPass($idioma);
	
}

?>