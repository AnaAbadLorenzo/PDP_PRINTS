<?php

interface ProcesoUsuarioService {

	public function inicializarParametros();

    function add($mensaje);
    function edit($mensaje);
    function delete($mensaje);
    function search($paginacion);
    function searchByParameters($paginacion);
    function calcular($mensaje);
	
}

?>