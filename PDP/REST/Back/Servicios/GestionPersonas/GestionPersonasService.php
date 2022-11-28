<?php

interface GestionPersonasService {

	public function inicializarParametros($accion);

	function edit($mensaje);
    function delete($mensaje);
    function search($mensaje);
    function searchBy($mensaje);
   // function searchByDNI($mensaje);
	
}

?>