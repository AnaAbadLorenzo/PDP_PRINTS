<?php

interface GestionFuncionalidadesService {

	public function inicializarParametros($accion);

    function add($mensaje);
	function edit($mensaje);
    function delete($mensaje);
    function search($mensaje);
    function searchByParameters($mensaje);
    
    //function searchByDNI($mensaje);
	
}

?>