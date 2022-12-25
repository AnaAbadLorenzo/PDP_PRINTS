<?php

interface ACLService {

    public function inicializarParametros();

    function add();
    function delete();
    function searchFuncionalidadesUsuario($usuario);
    function searchAccionesPorFuncionalidadUsuario($datos);
    function searchPermisosUsuario($datos);

}
?>