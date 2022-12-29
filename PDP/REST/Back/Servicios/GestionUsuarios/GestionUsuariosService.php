<?php

interface GestionUsuariosService {

	function inicializarParametros($accion);
    function add($mensaje);
    function delete($mensaje);
    function search($mensaje, $paginacion);
    function searchByParameters($mensaje, $paginacion);

}

?>