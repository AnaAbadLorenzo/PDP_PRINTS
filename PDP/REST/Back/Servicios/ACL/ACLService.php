<?php

interface ACLService {

    public function inicializarParametros();

    function add($mensaje);
    function delete($mensaje);
    function searchFuncionalidadesUsuario($usuario);
    function searchAccionesPorFuncionalidadUsuario($datos);
    function searchPermisosUsuario($datos);

}
?>