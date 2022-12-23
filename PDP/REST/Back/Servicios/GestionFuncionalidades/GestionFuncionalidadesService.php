<?php

interface GestionFuncionalidadesService {

	public function inicializarParametros($accion);

    function add($mensaje);
	function edit($mensaje);
    function delete($mensaje);
    function search($mensaje, $paginacion);
    function searchDelete($mensaje, $paginacion);
    function searchByParameters($mensaje, $paginacion);
	
}

?>