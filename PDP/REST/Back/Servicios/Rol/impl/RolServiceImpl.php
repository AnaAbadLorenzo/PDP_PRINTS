<?php

include_once './Servicios/ServiceBase.php';
include_once './Servicios/Rol/RolService.php';
include_once './Mapping/RolMapping.php';
include_once './Validation/Accion/RolAccion.php';
include_once './Servicios/Comun/ReturnBusquedas.php';

class RolServiceImpl extends ServiceBase implements RolService {

    private $rol;
    private $validacion_formato;
    private $validacion_accion;

    function inicializarParametros() {
        $this -> rol = $this -> crearModelo('Rol');
        $this -> validacion_accion = $this -> crearValidacionAccion('Rol');
        $this -> validacion_formato = $this -> crearValidacionFormato('Rol');
    }

    function add($mensaje) {
        
        $rol_datos = array();
        $rol_datos['nombre_rol'] = $this -> rol -> nombre_rol;
        $rol_datos['descripcion_rol'] = $this -> rol -> descripcion_rol;
        $rol_datos['borrado_rol'] = 0;
        
        $this -> validacion_formato -> validarAtributosAdd($rol_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarAddRol($rol_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $rol_a_insertar = [
            'nombre_rol' => $rol_datos['nombre_rol'],
            'descripcion_rol' => $rol_datos['descripcion_rol'],
            'borrado_rol' => 0
        ];
        
        $rol_mapping = new RolMapping();
        $rol_mapping -> add($rol_a_insertar);
        $respuesta = $mensaje;

        return $respuesta;

    }

    function edit($mensaje) {
        
        $rol_datos = array();
        $rol_datos['id_rol'] = $this -> rol -> id_rol;
        $rol_datos['nombre_rol'] = $this -> rol -> nombre_rol;
        $rol_datos['descripcion_rol'] = $this -> rol -> descripcion_rol;
        
        $this -> validacion_formato -> validarAtributosEdit($rol_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarEditRol($rol_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        if ($respuesta == null) {

            $rol_a_editar = [
                'id_rol' => $rol_datos['id_rol'],
                'nombre_rol' => $rol_datos['nombre_rol'],
                'descripcion_rol' => $rol_datos['descripcion_rol']
            ];
            
            $rol_mapping = new RolMapping();
            $rol_mapping -> edit($rol_a_editar);
            $respuesta = $mensaje;

        }
        
        return $respuesta;

    }

    function delete($mensaje){
        
        $rol_datos = array();
        $rol_datos['id_rol'] = $this -> rol -> id_rol;
        
        $this -> validacion_formato -> validarAtributosDelete($rol_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarDeleteRol($rol_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        if ($respuesta == null) {

            $rol_a_eliminar = [
                'id_rol' => $rol_datos['id_rol']
            ];
            
            $rol_mapping = new RolMapping();
            $rol_mapping -> delete($rol_a_eliminar);
            $respuesta = $mensaje;

        }
        
        return $respuesta;

    }

    function search($paginacion) {

        $rol_mapping = new RolMapping();
        $rol_mapping -> search($paginacion);

        $returnBusquedas = new ReturnBusquedas
        (
            $rol_mapping -> feedback['resource'],
            '',
            $this -> numberFindAll()["COUNT(*)"],
            sizeof($rol_mapping -> feedback['resource']),
            $paginacion -> inicio
        );

        return $returnBusquedas;

    }

    function numberFindAll(){
        $rol_mapping = new RolMapping();
        $rol_mapping -> numberFindAll();
        return $rol_mapping -> feedback['resource'];
    }

    function searchByParameters($paginacion) {
        $datos_search = array();
        
        if($this->rol->nombre_rol == null){
            $datos_search['nombre_rol'] = '';
        }else{
            $datos_search['nombre_rol'] = $this->rol->nombre_rol;
        }
       
        if($this->rol->descripcion_rol == null){
            $datos_search['descripcion_rol'] = '';
        }else{
            $datos_search['descripcion_rol'] = $this->rol->descripcion_rol;
        }
        
        $rol_mapping= new RolMapping();
        $rol_mapping -> searchByParameters($datos_search, $paginacion);

        $returnBusquedas = new ReturnBusquedas
        (
            $rol_mapping -> feedback['resource'],
            $datos_search,
            $this -> numberFindParameters($datos_search)["COUNT(*)"],
            sizeof($rol_mapping -> feedback['resource']),
            $paginacion->inicio
        );

        return $returnBusquedas;

    }

    function numberFindParameters($datos_search){
        $rol_mapping = new RolMapping();
        $rol_mapping->numberFindParameters($datos_search);
        
        return $rol_mapping->feedback['resource'];
    }

    function searchDelete($paginacion) {

        $rol_mapping = new RolMapping();
        $rol_mapping -> searchDelete($paginacion);

        $returnBusquedas = new ReturnBusquedas
        (
            $rol_mapping -> feedback['resource'],
            '',
            $this -> numberFindAllDelete()["COUNT(*)"],
            sizeof($rol_mapping -> feedback['resource']),
            $paginacion -> inicio
        );

        return $returnBusquedas;

    }

    function numberFindAllDelete(){
        $rol_mapping = new RolMapping();
        $rol_mapping -> numberFindAllDelete();
        return $rol_mapping -> feedback['resource'];
    }

}

?>