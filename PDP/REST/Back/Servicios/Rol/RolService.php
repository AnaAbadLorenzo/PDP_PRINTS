<?php

interface RolService {

	public function inicializarParametros($accion);

    function add($mensaje);
	function edit($mensaje);
    function delete($mensaje);
    function search($mensaje);
	
}

?>