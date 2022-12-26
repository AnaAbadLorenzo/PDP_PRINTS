<?php

    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/GestionFuncionalidades/GestionFuncionalidadesService.php';
    include_once './Mapping/FuncionalidadMapping.php';
    include_once './Mapping/UsuarioMapping.php';
    include_once './Servicios/Comun/ReturnBusquedas.php';

class GestionFuncionalidadesServiceImpl extends ServiceBase implements GestionFuncionalidadesService {

        private $funcionalidad_mapping;
        private $usuario_mapping;

        function inicializarParametros($accion){
            switch($accion){
                case 'add' :
                    $this->funcionalidad = $this->crearModelo('Funcionalidad');
				    $this->clase_validacionFuncionalidadAccion = $this->crearValidacionAccion('AddFuncionalidad');
                    $this->clase_validacionFormatoFuncionalidad = $this->crearValidacionFormato('Funcionalidad');
                break;
                case 'edit':
                    $this->funcionalidad = $this->crearModelo('Funcionalidad');
                    $this->clase_validacionFuncionalidadAccion = $this->crearValidacionAccion('EditFuncionalidad');
                    $this->clase_validacionFormatoFuncionalidad = $this->crearValidacionFormato('Funcionalidad');
                   
                    break;
                case 'delete':
                    $this->funcionalidad = $this->crearModelo('Funcionalidad');
                    $this->clase_validacionAccionDeleteFuncionalidad = $this->crearValidacionAccion('DeleteFuncionalidad');
                    break;
                case 'searchByParameters':
                    $this->funcionalidad = $this->crearModelo('Funcionalidad');
                    break;
                case 'reactivar':
                    $this -> funcionalidad = $this -> crearModelo('Funcionalidad');
                    $this -> validacion_reactivar = $this -> crearValidacionAccion('DeleteFuncionalidad'); //hago las comprobaciones en este archivo, si tengo que hacer otro archivo a mayores para cada reactivacion de entidad no acabo nunca. besos, miguel
                    break;
                default:
                    break;
            }
        }

        function add($mensaje){
            $respuesta = '';

            if($this->funcionalidad->nombre_funcionalidad != null &&
            $this->funcionalidad->descripcion_funcionalidad != null
           ){
                $datosFuncionalidad = array();
                
                $datosFuncionalidad['nombre_funcionalidad'] = $this->funcionalidad->nombre_funcionalidad;
                $datosFuncionalidad['descripcion_funcionalidad'] = $this->funcionalidad->descripcion_funcionalidad;
                $datosFuncionalidad['borrado_funcionalidad'] = 0;

                
                if ($this->clase_validacionFormatoFuncionalidad != null) {
                    $this->clase_validacionFormatoFuncionalidad->validarAtributosFuncionalidad($datosFuncionalidad);
                }
                if ($this->clase_validacionFuncionalidadAccion != null){
                    $this->clase_validacionFuncionalidadAccion->comprobarAddFuncionalidad($datosFuncionalidad);
                }
                
                if($this->clase_validacionFormatoFuncionalidad->respuesta != null){
                    $respuesta = $this->clase_validacionFormatoFuncionalidad->respuesta;
                }
                
                else if($this->clase_validacionFuncionalidadAccion->respuesta != null){
                    $respuesta = $this->clase_validacionFuncionalidadAccion->respuesta;
                }
                
                else{
                    $FuncionalidadDatos = [
                        'nombre_funcionalidad' => $this->funcionalidad->nombre_funcionalidad,
                        'descripcion_funcionalidad' => $this->funcionalidad->descripcion_funcionalidad,
                        'borrado_funcionalidad' => 0
                    ];
                    
                    $funcionalidad_mapping = new FuncionalidadMapping();
                    $funcionalidad_mapping->add($FuncionalidadDatos);

                    $respuesta = $mensaje;
                    $this->recursos = '';
                }

            }
        return $respuesta;
    
        }

        function edit($mensaje) {
           
                $respuesta = '';
                $datosEditFuncionalidad = array();
                $datosEditFuncionalidad['id_funcionalidad'] = $this->funcionalidad->id_funcionalidad;
                $datosEditFuncionalidad['nombre_funcionalidad'] = $this->funcionalidad->nombre_funcionalidad;
                $datosEditFuncionalidad['descripcion_funcionalidad'] = $this->funcionalidad->descripcion_funcionalidad;
                $datosEditFuncionalidad['borrado_funcionalidad'] = $this->funcionalidad->borrado_funcionalidad;

                
                if ($this->clase_validacionFormatoFuncionalidad != null) {
                    $this->clase_validacionFormatoFuncionalidad->validarAtributosFuncionalidad($datosEditFuncionalidad);
                }
                if ($this->clase_validacionFuncionalidadAccion != null){
                    $this->clase_validacionFuncionalidadAccion->comprobarEditFuncionalidad($datosEditFuncionalidad);
                }
                if($this->clase_validacionFormatoFuncionalidad->respuesta != null){
                    $respuesta = $this->clase_validacionFormatoFuncionalidad->respuesta;
                }else if($this->clase_validacionFuncionalidadAccion->respuesta != null){
                    $respuesta = $this->clase_validacionFuncionalidadAccion->respuesta;
                }else{

                    $FuncionalidadDatos = [
                        'id_funcionalidad' => $this->funcionalidad->id_funcionalidad,
                        'nombre_funcionalidad' => $this->funcionalidad->nombre_funcionalidad,
                        'descripcion_funcionalidad' => $this->funcionalidad->descripcion_funcionalidad,
                        'borrado_funcionalidad' => $this->funcionalidad->borrado_funcionalidad
                    ];
             
                    $funcionalidad_mapping = new FuncionalidadMapping();
                    
        
                    
                    $funcionalidad_mapping->edit($FuncionalidadDatos);

                    $respuesta = $mensaje;
                    $this->recursos = '';
            }
           
            
            return $respuesta;
    
        }


        function delete($mensaje){
                $respuesta = '';
                $datosDeleteFuncionalidad = array();
                $datosDeleteFuncionalidad['id_funcionalidad'] = $this->funcionalidad->id_funcionalidad;

                
                if($this->clase_validacionAccionDeleteFuncionalidad != null) {
                $this->clase_validacionAccionDeleteFuncionalidad->comprobarDeleteFuncionalidad($datosDeleteFuncionalidad);
                }
                if($this->clase_validacionAccionDeleteFuncionalidad->respuesta != null){

                    $respuesta =  $this->clase_validacionAccionDeleteFuncionalidad->respuesta;

                }else{
               
                $funcionalidadDatos = [
                    'id_funcionalidad' => $datosDeleteFuncionalidad['id_funcionalidad'],  
                ];

                $funcionalidad_mapping = new FuncionalidadMapping();
                $funcionalidad_mapping->delete($funcionalidadDatos);
                $respuesta= $mensaje;
            }

            
            return $respuesta;
            
        }
    
        function search($mensaje, $paginacion){
            $funcionalidad_mapping = new FuncionalidadMapping();
            $funcionalidad_mapping->search($paginacion);
            $returnBusquedas = new ReturnBusquedas($funcionalidad_mapping->feedback['resource'], '',
            $this->numberFindAll()["COUNT(*)"],sizeof($funcionalidad_mapping->feedback['resource']), $paginacion->inicio);
            
            return $returnBusquedas;
        }

        function searchDelete($mensaje, $paginacion){
            $funcionalidad_mapping = new FuncionalidadMapping();
            $funcionalidad_mapping->searchDelete($paginacion);
            
            $returnBusquedas = new ReturnBusquedas($funcionalidad_mapping->feedback['resource'], '',
            $this->numberFindAllDelete()["COUNT(*)"],sizeof($funcionalidad_mapping->feedback['resource']), $paginacion->inicio);
            
            return $returnBusquedas;
            
        }

        function searchByParameters($mensaje, $paginacion){
            $datosSearchParameters = array();
                
            if($this->funcionalidad->nombre_funcionalidad===null){
                $datosSearchParameters['nombre_funcionalidad'] = '';
            }else{
                $datosSearchParameters['nombre_funcionalidad'] = $this->funcionalidad->nombre_funcionalidad;
            }

            if($this->funcionalidad->descripcion_funcionalidad===null){
                $datosSearchParameters['descripcion_funcionalidad'] = '';
            }else{
                $datosSearchParameters['descripcion_funcionalidad'] = $this->funcionalidad->descripcion_funcionalidad;
            }
                
            $funcionalidad_mapping = new FuncionalidadMapping();
            $funcionalidad_mapping->searchByParameters($datosSearchParameters,$paginacion);
            $returnBusquedas = new ReturnBusquedas($funcionalidad_mapping->feedback['resource'], $datosSearchParameters, $this->numberFindParameters($datosSearchParameters)["COUNT(*)"],
            sizeof($funcionalidad_mapping->feedback['resource']), $paginacion->inicio);
            return $returnBusquedas;
        }

        function numberFindAll(){
            $funcionalidad_mapping = new FuncionalidadMapping();
            $funcionalidad_mapping->numberFindAll();
            return $funcionalidad_mapping->feedback['resource'];
        }

        function numberFindAllDelete(){
            $funcionalidad_mapping = new FuncionalidadMapping();
            $funcionalidad_mapping->numberFindAllDelete();
            return $funcionalidad_mapping->feedback['resource'];
        }

        function numberFindParameters($datosSearchParameters){
            $funcionalidad_mapping = new FuncionalidadMapping();
            $funcionalidad_mapping->numberFindParameters($datosSearchParameters);
            return $funcionalidad_mapping->feedback['resource'];
        }

        function reactivar() {
    
            $this -> validacion_reactivar -> comprobarReactivar($_POST);
            if (!empty($this -> validacion_reactivar -> respuesta)) {
                return $this -> validacion_reactivar -> respuesta;
            }
            
            $funcionalidad_mapping = new FuncionalidadMapping;
            $respuesta = $funcionalidad_mapping -> reactivar($_POST);
    
            return $respuesta;
    
        }
      
    }
?>