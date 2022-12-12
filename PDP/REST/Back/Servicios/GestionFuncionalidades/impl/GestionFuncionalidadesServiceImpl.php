<?php

    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/GestionFuncionalidades/GestionFuncionalidadesService.php';
    include_once './Mapping/FuncionalidadMapping.php';
    include_once './Mapping/UsuarioMapping.php';

class GestionFuncionalidadesServiceImpl extends ServiceBase implements GestionFuncionalidadesService {

        private $funcionalidad_mapping;
        private $usuario_mapping;

        function inicializarParametros($accion){
            switch($accion){
                case 'add' :
                    $this->funcionalidad = $this->crearModelo('Funcionalidad');
				    //$this->clase_validacionAccionAccion = $this->crearValidacionAccion('EditAccion'); en caso de haber alguna premisa creae otro fichero (AddAccionAccion.php)
                    $this->clase_validacionFormatoFuncionalidad = $this->crearValidacionFormato('Funcionalidad');
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
                //no hay que realizar ninguna premisa para insertar...
                /*if ($this->clase_validacionAccionAccion != null){
                    $this->clase_validacionAccionAccion->comprobarAccion($datosAccion);
                }*/
                
            
                if($this->clase_validacionFormatoFuncionalidad->respuesta != null){
                    $respuesta = $this->clase_validacionFormatoFuncionalidad->respuesta;
                }else{
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
    
        function search($mensaje){
            
            $funcionalidad_mapping = new FuncionalidadMapping();
            $funcionalidad_mapping->search();
            return $funcionalidad_mapping->feedback['resource'];
            
        }

        function searchByParameters($mensaje){

            /*
            $respuesta = '';
            
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
                
                //$datosSearchParameters['borrado_persona'] = 0;
            $accion_mapping = new AccionMapping();
            $accion_mapping->searchByParameters($datosSearchParameters);
            return $this->accion_mapping->feedback['resource']; 
             */
        }
      
    }
?>