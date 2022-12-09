<?php

interface GestionAccionesService {

	public function inicializarParametros($accion);

    function add($mensaje);
	function edit($mensaje);
    function delete($mensaje);
    function search($mensaje);
    function searchByParameters($mensaje);
    
    //function searchByDNI($mensaje);
	
}

?>