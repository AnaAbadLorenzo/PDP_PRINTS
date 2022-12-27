<?php

include_once './Servicios/ServiceBase.php';
include_once './Servicios/ACL/ACLService.php';

include_once './Mapping/ACLMapping.php';
include_once './Mapping/UsuarioMapping.php';

include_once './Modelos/PermisosFuncionalidadModel.php';

include_once './Validation/Accion/ACLAccion.php';

class ACLServiceImpl extends ServiceBase implements ACLService {

    public $acl;

    function inicializarParametros() {
        $this -> acl = $this -> crearModelo('ACL');
        $this -> validacion_accion = $this -> crearValidacionAccion('ACL');
        $this -> validacion_formato = $this -> crearValidacionFormato('ACL');
    }

    function add($mensaje) {
        $acl_datos = [
            'rol' => $this -> acl -> rol,
            'funcionalidad' => $this -> acl->funcionalidad,
            'accion' => $this -> acl->accion,
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
        $datosAnadir = array(
            'id_rol' => $this -> acl -> rol['id_rol'],
            'id_funcionalidad' => $this -> acl->funcionalidad['id_funcionalidad'],
            'id_accion' => $this -> acl->accion['id_accion']
        );

        $acl_mapping -> add($datosAnadir);

        if($acl_mapping->respuesta == null){
            $respuesta = $mensaje;
        }else{
            $respuesta = $acl_mapping->respuesta;
        }
      
        
        return $respuesta;

    }

    function delete($mensaje) {
        $acl_datos = [
            'rol' => $this -> acl -> rol,
            'funcionalidad' => $this -> acl->funcionalidad,
            'accion' => $this -> acl->accion,
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
        $datosDelete = array(
            'id_rol' => $this -> acl -> rol['id_rol'],
            'id_funcionalidad' => $this -> acl->funcionalidad['id_funcionalidad'],
            'id_accion' => $this -> acl->accion['id_accion']
        );
        $acl_mapping -> delete($datosDelete);

        if($acl_mapping->respuesta == null){
            $respuesta = $mensaje;
        }else{
            $respuesta = $acl_mapping->respuesta;
        }
        
        return $respuesta;

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

        //Devolver la respuesta con todos los datos de la funcionalidad
        $funcionalidades = array();
        $funcionalidadMapping = new FuncionalidadMapping();
        foreach($acl_mapping -> feedback['resource'] as $func) {
            $funcionalidadMapping->searchById($func);
            array_push($funcionalidades, $funcionalidadMapping->feedback['resource']);

        }

        return $funcionalidades;

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
        //conseguir datos de la funcionalidad
        $funcionalidad_mapping = new FuncionalidadMapping();
        $funcionalidad_mapping->searchByName($datos);
        $resultadoFuncionalidad = $funcionalidad_mapping->feedback['resource'];
        $datos['id_funcionalidad'] = $resultadoFuncionalidad['id_funcionalidad'];

        //conseguir rol del usuario
        $usuario_mapping = new UsuarioMapping();
        $usuario_mapping -> searchByLogin($datos);
        $respuesta = $usuario_mapping -> resource;
        $datos['id_rol'] = $respuesta['id_rol'];
        
        //conseguir acciones
        $acl_mapping = new ACLMapping();
        $acl_mapping -> searchAccionesByFuncionalidadRol($datos);

        //conseguir los datos de la accion
        $acciones = array();
        $accion_mapping = new AccionMapping();
        foreach($acl_mapping -> feedback['resource'] as $ac){
            $accion_mapping->searchById($ac);
            array_push($acciones, $accion_mapping -> feedback['resource']);
        }
        return $acciones;
        
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

    function obtenerPermisos($datos) {
        //comprobacion de que la funcionalidad no viene vacía
        $this -> validacion_formato -> validarAtributosNombreFuncionalidad($datos);
        
        //comprobacion funcionalidad existe
        $this->validacion_accion->comprobarFuncionalidad($datos);

        //Recoger todos los datos de la funcionalidad
        $funcionalidad_mapping = new FuncionalidadMapping();
        $funcionalidad_mapping->searchByName($datos);
        $funcionalidad = $funcionalidad_mapping->feedback['resource'];

        //Recogemos todos los datos de permisos
        $acl_mapping = new ACLMapping();
        $acl_mapping->searchACLByFuncionalidad($funcionalidad);
        $acl = $acl_mapping->feedback['resource'];

        if(!empty($funcionalidad)){
            //Recogemos todos los roles
            $rol_mapping = new RolMapping();
            $rol_mapping->searchAll();
            $roles = $rol_mapping->feedback['resource'];

            //Recogemos todas las acciones
            $accion_mapping = new AccionMapping();
            $accion_mapping->searchAll();
            $acciones = $accion_mapping->feedback['resource'];

            $permisosFuncionalidad = array();

            for($i = 0; $i<sizeof($roles); $i++){
                for($j= 0; $j<sizeof($acciones); $j++){
                    $tienePermiso = "";
                    if(sizeof($acl) != 0){
                        for($k=0;$k<sizeof($acl); $k++){
                            $funcPermiso = $acl[$k]['id_funcionalidad'];
                            $idFuncionalidad = $funcionalidad['id_funcionalidad'];

                            if($funcPermiso === $idFuncionalidad &&
                                $acl[$k]['id_accion'] === $acciones[$j]['id_accion'] &&
                                $acl[$k]['id_rol'] === $roles[$i]['id_rol']){
                                    $tienePermiso = "Si";
                                    $accion = $acciones[$j];
                                    $rol = $roles[$i];
                                    $permisosFuncionalidadModel = new PermisosFuncionalidadModel($rol, $funcionalidad, $accion, $tienePermiso);
                                    array_push($permisosFuncionalidad, $permisosFuncionalidadModel);
                                    break;
                            }else{
                                $tienePermiso = "No";
                            }
                        }

                        if($tienePermiso === "No"){
                            $accion = $acciones[$j];
                            $rol = $roles[$i];
                            $permisosFuncionalidadModel = new PermisosFuncionalidadModel($rol, $funcionalidad, $accion, $tienePermiso);
                            array_push($permisosFuncionalidad, $permisosFuncionalidadModel);
                        }
                    }else{
                        $tienePermiso = "No";
                        $accion = $acciones[$j];
                        $rol = $roles[$i];
                        $permisosFuncionalidadModel = new PermisosFuncionalidadModel($rol, $funcionalidad, $accion, $tienePermiso);
                        array_push($permisosFuncionalidad, $permisosFuncionalidadModel);
                    }
                }
            }
        }
        $accionesNoEliminadas = array();

        switch($datos['nombre_funcionalidad']){
            case 'Gestión de personas':
                for($i=0; $i<sizeof($permisosFuncionalidad); $i++){
                    if($permisosFuncionalidad[$i]['funcionalidad']['nombre_funcionalidad'] != 'Reactivar'){
                        array_push($accionesNoEliminadas,$permisosFuncionalidad[$i]);
                    }
                }
            break;
        }

        if($datos['nombre_funcionalidad'] == 'Gestión de personas'){
            return $accionesNoEliminadas;
        }else{
            return $permisosFuncionalidad;
        }
   
    }

}