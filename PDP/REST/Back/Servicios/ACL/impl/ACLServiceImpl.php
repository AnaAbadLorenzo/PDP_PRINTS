<?php

include_once './Servicios/ACL/ACLService.php';

class ACLServiceImpl extends ServiceBase implements ACLService {

    public $usuario;

    function inicializarParametros($accion){
        switch($accion){
            case 'funcionesUsuario' :
                $this->usuario = $this->crearModelo('Usuario');
                $this->clase_validacionAccionFuncionesUsuario = $this->crearValidacionAccion('FuncionesUsuario');
                $this->clase_validacionFormatoUsuario = $this->crearValidacionFormato('Usuario');
            break;
            default:
            break;
        }
    }

    function funcionesUsuario($usuario){

    }
}