<?php

interface ACLService {
    function inicializarParametros($accion);
    function funcionesUsuario($usuario);
    function accionesUsuarioFuncionalidad($usuario, funcionalidad);
}
?>