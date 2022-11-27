<?php

interface AutenticacionService {

	public function inicializarParametros($accion);

	function login($mensaje);

	function verificarToken($mensaje);
	
}

?>