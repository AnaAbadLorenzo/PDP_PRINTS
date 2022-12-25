<?php

include_once './Servicios/ServiceBase.php';
include_once './Servicios/ACL/ACLService.php';

include_once './Mapping/ACLMapping.php';
include_once './Mapping/UsuarioMapping.php';

include_once './Validation/Accion/ACLAccion.php';

class ACLServiceImpl extends ServiceBase implements ACLService {

    public $acl;

    function inicializarParametros() {
        $this -> acl = $this -> crearModelo('ACL');
        $this -> validacion_accion = $this -> crearValidacionAccion('ACL');
        $this -> validacion_formato = $this -> crearValidacionFormato('ACL');
    }

    function add() {

        $acl_datos = [
            'id_rol' => $this -> acl -> id_rol,
            'id_funcionalidad' => $this -> acl -> id_funcionalidad,
            'id_accion' => $this -> acl -> id_accion,
        ];
        
        //comprobacion formato ids
        $this -> validacion_formato -> validarAtributosAdd($acl_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //comprobacion rol,funcionalidad,accion existe + combinacion de ellos no existe en bd
        $this -> validacion_accion -> comprobarAdd($acl_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //añadir a bd
        $acl_mapping = new ACLMapping;
        $acl_mapping -> add($acl_datos);
        
        return $acl_mapping -> feedback['resource'];

    }

    function delete() {

        $acl_datos = [
            'id_rol' => $this -> acl -> id_rol,
            'id_funcionalidad' => $this -> acl -> id_funcionalidad,
            'id_accion' => $this -> acl -> id_accion,
        ];
        
        //comprobacion formato ids
        $this -> validacion_formato -> validarAtributosDelete($acl_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //comprobacion tupla existe en bd
        $this -> validacion_accion -> comprobarDelete($acl_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //quitar de bd
        $acl_mapping = new ACLMapping;
        $acl_mapping -> delete($acl_datos);
        
        return $acl_mapping -> feedback['resource'];

    }

    //devuelve todos los ids de las funcionalidades disponibles del usuario
    //Se le debe pasar el usuario como un array que contenga la clave 'usuario', y valor correspondiente
    function searchFuncionalidadesUsuario($usuario) {
        
        //comprobacion formato usuario
        $this -> validacion_formato -> validarAtributosUsuario($usuario);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //comprobacion usuario existe
        $this -> validacion_accion -> comprobarUsuario($usuario);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //conseguir rol del usuario
        $usuario_mapping = new UsuarioMapping;
        $usuario_mapping -> searchByLogin($usuario);
        $respuesta = $usuario_mapping -> resource;
        $rol_usuario = ['id_rol' => $respuesta['id_rol']];

        //conseguir funcionalidades
        $acl_mapping = new ACLMapping;
        $acl_mapping -> searchFuncionalidadesByRol($rol_usuario);

        return $acl_mapping -> feedback['resource'];

    }

    //devuelve todas las acciones disponibles para el usuario y funcionalidad especificados
    function searchAccionesPorFuncionalidadUsuario($datos) {
        
        //comprobacion formato usuario e ids
        $this -> validacion_formato -> validarAtributos($datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //comprobacion usuario e ids
        $this -> validacion_accion -> comprobarUsuarioYFuncionalidad($datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //conseguir rol del usuario
        $usuario_mapping = new UsuarioMapping;
        $usuario_mapping -> searchByLogin($datos);
        $respuesta = $usuario_mapping -> resource;
        array_push($datos, ['id_rol' => $respuesta['id_rol']]);

        //conseguir acciones
        $acl_mapping = new ACLMapping;
        $acl_mapping -> searchAccionesByFuncionalidadRol($datos);

        return $acl_mapping -> feedback['resource'];
        
    }

    //devuelve todos los ids de las funcionalidades disponibles del usuario con sus acciones
    function searchPermisosUsuario($datos) {
        
        //comprobacion formato usuario
        $this -> validacion_formato -> validarAtributosUsuario($datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //comprobacion usuario existe
        $this -> validacion_accion -> comprobarUsuario($datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //conseguir rol del usuario
        $usuario_mapping = new UsuarioMapping;
        $usuario_mapping -> searchByLogin($datos);
        $respuesta = $usuario_mapping -> resource;
        $rol_usuario = ['id_rol' => $respuesta['id_rol']];

        //conseguir funcionalidades
        $acl_mapping = new ACLMapping;
        $acl_mapping -> searchFuncionalidadesYAccionesByRol($rol_usuario);

        return $acl_mapping -> feedback['resource'];

    }

}