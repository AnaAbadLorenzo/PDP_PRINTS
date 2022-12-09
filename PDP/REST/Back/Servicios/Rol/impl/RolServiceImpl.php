<?php

include_once './Servicios/ServiceBase.php';
include_once './Servicios/Rol/RolService.php';
include_once './Mapping/RolMapping.php';
include_once './Validation/Accion/RolAccion.php';

class RolServiceImpl extends ServiceBase implements RolService {

    function inicializarParametros($accion) {

        $this -> rol = $this -> crearModelo('Rol');

        switch($accion) {

            case 'add':
                $this -> validacionAccionAddRol = $this -> crearValidacionAccion('AddRol');
                $this -> validacionFormatoAddRol = $this -> crearValidacionFormato('Rol');
                break;

            case 'edit':
                $this -> validacionAccionEditRol = $this -> crearValidacionAccion('EditRol');
                $this -> validacionFormatoEditRol = $this -> crearValidacionFormato('Rol');
                break;

            case 'delete':
                $this -> validacionAccionDeleteRol = $this -> crearValidacionAccion('DeleteRol');
                $this -> validacionFormatoDeleteRol = $this -> crearValidacionFormato('Rol');
                break;

            case 'search':
                break;

            default:
                break;

        }

    }

    function add($mensaje) {
        
        $datosAddRol = array();
        $datosAddRol['id_rol'] = $this -> rol -> id_rol;
        $datosAddRol['nombre_rol'] = $this -> rol -> nombre_rol;
        $datosAddRol['descripcion_rol'] = $this -> rol -> descripcion_rol;
        $datosAddRol['borrado_rol'] = 0;
        
        if ($this -> validacionFormatoAddRol != null) {
            $this -> validacionFormatoAddRol -> validarAtributosRol($datosAddRol);
            $respuesta = $this -> validacionFormatoAddRol -> respuesta;
        }

        if ($this -> validacionAccionAddRol != null) {
            $this -> validacionAccionAddRol -> comprobarAddRol($datosAddRol);
            $respuesta = $this -> validacionAccionAddRol -> respuesta;
        }

        if ($respuesta == null) {

            $rolDatos = [
                'id_rol' => $datosAddRol['id_rol'],
                'nombre_rol' => $datosAddRol['nombre_rol'],
                'descripcion_rol' => $datosAddRol['descripcion_rol'],
                'borrado_rol' => 0
            ];
            
            $rol_mapping = new RolMapping();
            $rol_mapping -> add($rolDatos);
            $respuesta = $mensaje;

        }
        
        return $respuesta;

    }

    function edit($mensaje) {
        
        $datosEditRol = array();
        $datosEditRol['id_rol'] = $this -> rol -> id_rol;
        $datosEditRol['nombre_rol'] = $this -> rol -> nombre_rol;
        $datosEditRol['descripcion_rol'] = $this -> rol -> descripcion_rol;
        $datosEditRol['borrado_rol'] = 0;
        
        if ($this -> validacionFormatoEditRol != null) {
            $this -> validacionFormatoEditRol -> validarAtributosRol($datosEditRol);
            $respuesta = $this -> validacionFormatoEditRol -> respuesta;
        }

        if ($this -> validacionAccionEditRol != null) {
            $this -> validacionAccionEditRol -> comprobarEditRol($datosEditRol);
            $respuesta = $this -> validacionAccionEditRol -> respuesta;
        }

        if ($respuesta == null) {

            $rolDatos = [
                'id_rol' => $datosEditRol['id_rol'],
                'nombre_rol' => $datosEditRol['nombre_rol'],
                'descripcion_rol' => $datosEditRol['descripcion_rol'],
                'borrado_rol' => 0
            ];
            
            $rol_mapping = new RolMapping();
            $rol_mapping -> edit($rolDatos);
            $respuesta = $mensaje;

        }
        
        return $respuesta;

    }

    function delete($mensaje){
        
        $datosDeleteRol = array();
        $datosDeleteRol['id_rol'] = $this -> rol -> id_rol;
        
        if ($this -> validacionFormatoDeleteRol != null) {
            $this -> validacionFormatoDeleteRol -> validarAtributosRol($datosDeleteRol);
            $respuesta = $this -> validacionFormatoDeleteRol -> respuesta;
        }

        if ($this -> validacionAccionDeleteRol != null) {
            $this -> validacionAccionDeleteRol -> comprobarDeleteRol($datosDeleteRol);
            $respuesta = $this -> validacionAccionDeleteRol -> respuesta;
        }

        if ($respuesta == null) {

            $rolDatos = [
                'id_rol' => $datosDeleteRol['id_rol']
            ];
            
            $rol_mapping = new RolMapping();
            $rol_mapping -> delete($rolDatos);
            $respuesta = $mensaje;

        }
        
        return $respuesta;
    }

    function search($mensaje) {
        $rol_mapping = new RolMapping();
        $rol_mapping -> search();
        return $rol_mapping -> feedback['resource'];
    }

}
?>