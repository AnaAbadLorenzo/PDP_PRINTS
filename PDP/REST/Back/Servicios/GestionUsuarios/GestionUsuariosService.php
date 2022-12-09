<?php

interface GestionPersonasService {

	public function inicializarParametros($accion);

	function edit($mensaje);
    function delete($mensaje);
    function add($mensaje);
    function search($mensaje);
    function searchByParameters($mensaje);

}

?>