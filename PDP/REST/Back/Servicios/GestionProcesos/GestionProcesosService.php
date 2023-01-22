<?php

interface GestionProcesosService {

	public function inicializarParametros($accion);

    function add($mensaje);
	function edit($mensaje);
    function delete($mensaje);
    function search($mensaje,$paginacion);
    function searchAll($mensaje);
    function searchByParameters($mensaje, $paginacion);
    
    //function searchByDNI($mensaje);
	
}

?>