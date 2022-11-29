<?php

interface GestionPersonasService {

	public function inicializarParametros($accion);

	function edit($mensaje);
    function delete($mensaje);
    function search($mensaje);
    function searchByParameters($mensaje);
   // function searchByDNI($mensaje);
	
}

?>