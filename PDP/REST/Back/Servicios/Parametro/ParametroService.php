<?php

interface ParametroService {

	public function inicializarParametros();

    function add($mensaje);
    function delete($mensaje);
    function search($paginacion);
    function searchByParameters($paginacion);
	
}

?>