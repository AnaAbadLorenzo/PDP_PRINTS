<?php

    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/GestionAcciones/GestionAccionesService.php';
    include_once './Mapping/AccionMapping.php';
    include_once './Mapping/UsuarioMapping.php';
    include_once './Servicios/Comun/ReturnBusquedas.php';

class GestionAccionesServiceImpl extends ServiceBase implements GestionAccionesService {

    private $accion_mapping;

    function inicializarParametros($accion){
        switch($accion){
            case 'add' :
                $this->accion = $this->crearModelo('Accion');
                $this->clase_validacionAccionAccion = $this->crearValidacionAccion('AddAccion');
                $this->clase_validacionFormatoAccion = $this->crearValidacionFormato('Accion');
            break;
            case 'edit':
                $this->accion = $this->crearModelo('Accion');
                $this->clase_validacionAccionAccion = $this->crearValidacionAccion('EditAccion');
                $this->clase_validacionFormatoAccion = $this->crearValidacionFormato('Accion');
        
            break;
            case 'delete':
                $this->accion = $this->crearModelo('Accion');
                $this->clase_validacionAccionDeleteAccion = $this->crearValidacionAccion('DeleteAccion');
                break;
            case 'searchByParameters':
                $this->accion = $this->crearModelo('Accion');
                break;
            case 'reactivar':
                $this -> accion = $this->crearModelo('Accion');
                $this -> validacion_reactivar = $this->crearValidacionAccion('DeleteAccion'); //hago las comprobaciones en este archivo, si tengo que hacer otro archivo a mayores para cada reactivacion de entidad no acabo nunca. besos, miguel
                break;
            default:
                break;
        }
    }

    function add($mensaje){
        $respuesta = '';

        if($this->accion->nombre_accion != null &&
        $this->accion->descripcion_accion != null
        ){
            $datosAccion = array();
            
            $datosAccion['nombre_accion'] = $this->accion->nombre_accion;
            $datosAccion['descripcion_accion'] = $this->accion->descripcion_accion;
            $datosAccion['borrado_accion'] = 0;

            
            if ($this->clase_validacionFormatoAccion != null) {
                $this->clase_validacionFormatoAccion->validarAtributosAccion($datosAccion);
            }
        
            if ($this->clase_validacionAccionAccion != null){
                $this->clase_validacionAccionAccion->comprobarAccionAdd($datosAccion);
            }
            
            if($this->clase_validacionFormatoAccion->respuesta != null){
                $respuesta = $this->clase_validacionFormatoAccion->respuesta;
            }else if($this->clase_validacionAccionAccion->respuesta != null){
                $respuesta = $this->clase_validacionAccionAccion->respuesta;
            }else{
                $AccionDatos = [
                    'nombre_accion' => $this->accion->nombre_accion,
                    'descripcion_accion' => $this->accion->descripcion_accion,
                    'borrado_accion' => 0
                ];
                
                $accion_mapping = new AccionMapping();
                $accion_mapping->add($AccionDatos);

                $respuesta = $mensaje;
                $this->recursos = '';
            }

        }
    return $respuesta;

    }

    function edit($mensaje) {
        
            $respuesta = '';
            $datosEditAccion = array();
            $datosEditAccion['id_accion'] = $this->accion->id_accion;
            $datosEditAccion['nombre_accion'] = $this->accion->nombre_accion;
            $datosEditAccion['descripcion_accion'] = $this->accion->descripcion_accion;
            $datosEditAccion['borrado_accion'] = $this->accion->borrado_accion;

            
            if ($this->clase_validacionFormatoAccion != null) {
                $this->clase_validacionFormatoAccion->validarAtributosAccion($datosEditAccion);
            }
            if ($this->clase_validacionAccionAccion != null){
                $this->clase_validacionAccionAccion->comprobarAccionEdit($datosEditAccion);
            }

            
            if($this->clase_validacionFormatoAccion->respuesta != null){
                $respuesta = $this->clase_validacionFormatoAccion->respuesta;
            }else if($this->clase_validacionAccionAccion->respuesta != null){
                $respuesta = $this->clase_validacionAccionAccion->respuesta;
            }else{

                $AccionDatos = [
                    'id_accion' => $this->accion->id_accion,
                    'nombre_accion' => $this->accion->nombre_accion,
                    'descripcion_accion' => $this->accion->descripcion_accion,
                    'borrado_accion' => $this->accion->borrado_accion
                ];
            
                $accion_mapping = new AccionMapping();
                $accion_mapping->edit($AccionDatos);

                $respuesta = $mensaje;
                $this->recursos = '';
        }
        
        
        return $respuesta;

    }


    function delete($mensaje){
        
        
            $respuesta = '';
            $datosDeleteAccion = array();
            $datosDeleteAccion['id_accion'] = $this->accion->id_accion;

            
            if($this->clase_validacionAccionDeleteAccion != null) {
            $this->clase_validacionAccionDeleteAccion->comprobarDeleteAccion($datosDeleteAccion);
            }
            if($this->clase_validacionAccionDeleteAccion->respuesta != null){

                $respuesta =  $this->clase_validacionAccionDeleteAccion->respuesta;

            }else{
            
            $accionDatos = [
                'id_accion' => $datosDeleteAccion['id_accion'],
                
            ];

            $accion_mapping = new AccionMapping();
            $accion_mapping->delete($accionDatos);
            $respuesta= $mensaje;
        }

        
        return $respuesta;
    }

    function search($mensaje, $paginacion){
        $paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
        $accion_mapping = new AccionMapping();
        $accion_mapping->search($paginacion);
        $returnBusquedas = new ReturnBusquedas($accion_mapping->feedback['resource'], '',
            $this->numberFindAll()["COUNT(*)"],sizeof($accion_mapping->feedback['resource']), $paginacion->inicio);
        return $returnBusquedas;
    }

    function searchDelete($mensaje, $paginacion){
        $paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
        $accion_mapping = new AccionMapping();
        $accion_mapping->searchDelete($paginacion);
        $returnBusquedas = new ReturnBusquedas($accion_mapping->feedback['resource'], '',
            $this->numberFindAllDelete()["COUNT(*)"],sizeof($accion_mapping->feedback['resource']), $paginacion->inicio);
        return $returnBusquedas;
    }

    function searchByParameters($mensaje){
        $respuesta = '';
        
        $paginacion = new Paginacion($_POST['inicio'], $_POST['tamanhoPagina']);
            $datosSearchParameters = array();
            if($this->accion->nombre_accion===null){
                $datosSearchParameters['nombre_accion'] = '';
            }else{
                $datosSearchParameters['nombre_accion'] = $this->accion->nombre_accion;
            }
            if($this->accion->descripcion_accion===null){
                $datosSearchParameters['descripcion_accion'] = '';
            }else{
                $datosSearchParameters['descripcion_accion'] = $this->accion->descripcion_accion;
            }

        $accion_mapping = new AccionMapping();
        $accion_mapping->searchByParameters($datosSearchParameters, $paginacion);
        $returnBusquedas = new ReturnBusquedas($accion_mapping->feedback['resource'], $datosSearchParameters, $this->numberFindParameters($datosSearchParameters)["COUNT(*)"],
                        sizeof($accion_mapping->feedback['resource']), $paginacion->inicio);
        return $returnBusquedas;
    }

    function numberFindAll(){
        $accion_mapping = new AccionMapping();
        $accion_mapping->numberFindAll();
        return $accion_mapping->feedback['resource'];
    }

    function numberFindAllDelete(){
        $accion_mapping = new AccionMapping();
        $accion_mapping->numberFindAllDelete();
        return $accion_mapping->feedback['resource'];
    }

    function numberFindParameters($datosSearchParameters){
        $accion_mapping = new AccionMapping();
        $accion_mapping->numberFindParameters($datosSearchParameters);
        return $accion_mapping->feedback['resource'];
    }

    function reactivar() {

        $this -> validacion_reactivar -> comprobarReactivar($_POST);
        if (!empty($this -> validacion_reactivar -> respuesta)) {
            return $this -> validacion_reactivar -> respuesta;
        }
        
        $accion_mapping = new AccionMapping;
        $respuesta = $accion_mapping -> reactivar($_POST);

        return $respuesta;

    }
    
}
?>