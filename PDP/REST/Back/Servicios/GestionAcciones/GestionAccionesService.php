<?php

interface GestionAccionesService {

	public function inicializarParametros($accion);

    function add($mensaje);
	function edit($mensaje);
    function delete($mensaje);
    function search($mensaje,$paginacion);
    function searchByParameters($mensaje);
    function searchDelete($mensaje,$paginacion);
	
}

?>