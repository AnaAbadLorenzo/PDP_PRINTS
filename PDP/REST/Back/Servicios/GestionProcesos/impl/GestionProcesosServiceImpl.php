<?php

    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/GestionProcesos/GestionProcesosService.php';
    include_once './Mapping/ProcesoMapping.php';
    include_once './Mapping/UsuarioMapping.php';
    include_once './Servicios/Comun/ReturnBusquedas.php';

class GestionProcesosServiceImpl extends ServiceBase implements GestionProcesosService {

        private $proceso;
        private $clase_validacionAccionProceso;
        private $clase_validacionFormatoProceso;
        private $recursos;

        function inicializarParametros($accion){
            switch($accion){
                case 'add' :
                    $this->proceso = $this->crearModelo('Proceso');
				    $this->clase_validacionAccionProceso = $this->crearValidacionAccion('AddProceso'); 
                    $this->clase_validacionFormatoProceso = $this->crearValidacionFormato('Proceso');
                break;
                case 'edit':
                    $this->proceso = $this->crearModelo('Proceso');
                    $this->clase_validacionAccionProceso = $this->crearValidacionAccion('EditProceso');
                    $this->clase_validacionFormatoProceso = $this->crearValidacionFormato('Proceso');
                   
                break;
                case 'delete':
                    $this->proceso = $this->crearModelo('Proceso');
                    $this->clase_validacionAccionProceso = $this->crearValidacionAccion('DeleteProceso');
                break;
                case 'searchByParameters':
                    $this->proceso = $this->crearModelo('Proceso');
                break;
                default:
                break;
            }
        }

        function add($mensaje){

            $respuesta = '';

            if($this->proceso->nombre_proceso != null &&
            $this->proceso->descripcion_proceso != null &&
            $this->proceso->formula_proceso != null &&
            $this->proceso->id_categoria != null &&
            $this->proceso->dni_usuario != null
           ){
                $datosProceso = array();
                
                $datosProceso['nombre_proceso'] = $this->proceso->nombre_proceso;
                $datosProceso['descripcion_proceso'] = $this->proceso->descripcion_proceso;
                $datosProceso['fecha_proceso'] = date('Y-m-d');
                $datosProceso['borrado_proceso'] = 0;
                $datosProceso['version_proceso'] = 1;
                $datosProceso['check_aprobacion'] = 0;
                $datosProceso['formula_proceso'] = $this->proceso->formula_proceso;
                $datosProceso['id_categoria'] = $this->proceso->id_categoria;
                $datosProceso['dni_usuario'] = $this->proceso->dni_usuario;
                
                if ($this->clase_validacionFormatoProceso != null) {
                    $this->clase_validacionFormatoProceso->validarAtributosProceso($datosProceso);
                }
                if ($this->clase_validacionAccionProceso != null){
                    $this->clase_validacionAccionProceso->comprobarAddProceso($datosProceso);
                }
                
            
                if($this->clase_validacionFormatoProceso->respuesta != null){
                    $respuesta = $this->clase_validacionFormatoProceso->respuesta;
                }else if($this->clase_validacionAccionProceso->respuesta != null){
                    $respuesta = $this->clase_validacionAccionProceso->respuesta;
                }else{
                    $ProcesoDatos = [
                        'nombre_proceso' => $this->proceso->nombre_proceso,
                        'descripcion_proceso' => $this->proceso->descripcion_proceso,
                        'fecha_proceso' => date('Y-m-d'),
                        'version_proceso' => 1,
                        'check_aprobacion' => $this->proceso->check_aprobacion,
                        'formula_proceso' => $this->proceso->formula_proceso,
                        'id_categoria' => $this->proceso->id_categoria,
                        'dni_usuario' => $this->proceso->dni_usuario,
                        'borrado_proceso' => 0
                    ];
                   
          
                    $proceso_mapping = new ProcesoMapping();
                    $proceso_mapping->add($ProcesoDatos);

                    if($this->proceso->check_aprobacion == 1) {
                        $noticia_mapping = new NoticiaMapping();
                        $datosNoticia = array(
                            'titulo_noticia' => 'Publicación de proceso',
                            'contenido_noticia' => 'Se ha publicado un nuevo proceso con nombre ' + $this->proceso->nombre_proceso,
                            'fecha_noticia' => date('Y-m-d')
                        );
                        $noticia_mapping->add($datosNoticia);
                    }

                    $respuesta = $mensaje;
                    $this->recursos = '';
                }

            }
        return $respuesta;
    
        }

        function edit($mensaje) {
                $respuesta = '';
                $datosEditProceso = array();
                $datosEditProceso['id_proceso'] = $this->proceso->id_proceso;
                $datosEditProceso['nombre_proceso'] = $this->proceso->nombre_proceso;
                $datosEditProceso['descripcion_proceso'] = $this->proceso->descripcion_proceso;
                $datosEditProceso['fecha_proceso'] = date('Y-m-d');
                $datosEditProceso['version_proceso'] = $this->proceso->version_proceso;
                //$datosEditProceso['version_proceso'] = $proceso_model->getVersion('proceso',$this->proceso)['resource'];
                $datosEditProceso['check_aprobacion'] = $this->proceso->check_aprobacion;
                $datosEditProceso['formula_proceso'] = $this->proceso->formula_proceso;
                $datosEditProceso['id_categoria'] = $this->proceso->id_categoria;
                $datosEditProceso['dni_usuario'] = $this->proceso->dni_usuario;
                $datosEditProceso['borrado_proceso'] = $this->proceso->borrado_proceso;
              

                
                if ($this->clase_validacionFormatoProceso != null) {
                    $this->clase_validacionFormatoProceso->validarAtributosProceso($datosEditProceso);
                }
                if ($this->clase_validacionAccionProceso != null){
                    $this->clase_validacionAccionProceso->comprobarEditProceso($datosEditProceso);
                }

                
                if($this->clase_validacionFormatoProceso->respuesta != null){
                    $respuesta = $this->clase_validacionFormatoProceso->respuesta;
                }else if($this->clase_validacionAccionProceso->respuesta != null){
                    $respuesta = $this->clase_validacionAccionProceso->respuesta;
                }else{

                    $ProcesoDatos = [
                        'id_proceso' => $this->proceso->id_proceso,
                        'nombre_proceso' => $this->proceso->nombre_proceso,
                        'descripcion_proceso' => $this->proceso->descripcion_proceso,
                        'fecha_proceso' => date('Y-m-d'),
                        'version_proceso' => $this->proceso->version_proceso,
                        //'version_proceso' =>  $proceso_model->getVersion('proceso',$this->proceso)['resource'],
                        'check_aprobacion' => $this->proceso->check_aprobacion,
                        'formula_proceso' => $this->proceso->formula_proceso,
                        'id_categoria' => $this->proceso->id_categoria,
                        'dni_usuario' => $this->proceso->dni_usuario,
                        'borrado_proceso' => $this->proceso->borrado_proceso
                    ];
             
                    $proceso_mapping = new ProcesoMapping();  
                    $proceso_mapping->searchById($datosEditProceso);

                    if($proceso_mapping->feedback['resource']['check_aprobacion'] == 0 && $this->proceso->check_aprobacion == 1) {
                        $noticia_mapping = new NoticiaMapping();
                        $datosNoticia = array(
                            'titulo_noticia' => 'Publicación de proceso',
                            'contenido_noticia' => 'Se ha publicado un nuevo proceso con nombre ' + $this->proceso->nombre_proceso,
                            'fecha_noticia' => date('Y-m-d')
                        );
                        $noticia_mapping->add($datosNoticia);
                    }

                    
                    $proceso_mapping->edit($ProcesoDatos);

                    $respuesta = $mensaje;
                    $this->recursos = '';
            }
           
            
            return $respuesta;
    
        }


        function delete($mensaje){
            
                $respuesta = '';
                $datosDeleteProceso = array();
                $datosDeleteProceso['id_proceso'] = $this->proceso->id_proceso;

                
                if($this->clase_validacionAccionProceso != null) {
                $this->clase_validacionAccionProceso->comprobarDeleteProceso($datosDeleteProceso);
                }
                if($this->clase_validacionAccionProceso->respuesta != null){

                    $respuesta =  $this->clase_validacionAccionProceso->respuesta;

                }else{
               
                $procesoDatos = [
                    'id_proceso' => $datosDeleteProceso['id_proceso'],
                    
                ];

                $proceso_mapping = new ProcesoMapping();
                $proceso_mapping->delete($procesoDatos);
                $respuesta= $mensaje;
            }

            
            return $respuesta;
            
        }
    
        function searchAll($mensaje){
           
            $proceso_mapping = new ProcesoMapping();
            $proceso_mapping->searchAll();
            return $proceso_mapping->feedback['resource'];
           
        }

        function searchByParameters($mensaje, $paginacion){

            echo("llego");
          
            $respuesta = '';
            
            $datosSearchParameters = array();
            if($this->proceso->nombre_proceso===null || $this->proceso->nombre_proceso === ""){
                $datosSearchParameters['nombre_proceso'] = '';
            }else{
                $datosSearchParameters['nombre_proceso'] = $this->proceso->nombre_proceso;
            }
            if($this->proceso->descripcion_proceso===null){
                $datosSearchParameters['descripcion_proceso'] = '';
            }else{
                $datosSearchParameters['descripcion_proceso'] = $this->proceso->descripcion_proceso;
            }
            if($this->proceso->fecha_proceso===null){
                $datosSearchParameters['fecha_proceso'] = '';
            }else{
                $datosSearchParameters['fecha_proceso'] = $this->proceso->fecha_proceso;
            }
            if($this->proceso->version_proceso===null){
                $datosSearchParameters['version_proceso'] = '';
            }else{
                $datosSearchParameters['version_proceso'] = $this->proceso->version_proceso;
            }
            if($this->proceso->check_aprobacion===null){
                $datosSearchParameters['check_aprobacion'] = '';
            }else{
                $datosSearchParameters['check_aprobacion'] = $this->proceso->check_aprobacion;
            }
            if($this->proceso->check_aprobacion===null){
                $datosSearchParameters['check_aprobacion'] = '';
            }else{
                $datosSearchParameters['check_aprobacion'] = $this->proceso->check_aprobacion;
            }
            if($this->proceso->formula_proceso===null){
                $datosSearchParameters['formula_proceso'] = '';
            }else{
                $datosSearchParameters['formula_proceso'] = $this->proceso->formula_proceso;
            }
            if($this->proceso->id_categoria===null){
                $datosSearchParameters['id_categoria'] = '';
            }else{
                $datosSearchParameters['id_categoria'] = $this->proceso->id_categoria;
            }
            if($this->proceso->dni_usuario===null){
                $datosSearchParameters['dni_usuario'] = '';
            }else{
                $datosSearchParameters['dni_usuario'] = $this->proceso->dni_usuario;
            }
            
            $datosSearchParameters['borrado_proceso'] = 0;
        
        $proceso_mapping= new ProcesoMapping();
        $proceso_mapping->searchByParameters($datosSearchParameters, $paginacion);
        $returnBusquedas = new ReturnBusquedas($proceso_mapping->feedback['resource'], $datosSearchParameters, $this->numberFindParameters($datosSearchParameters)["COUNT(*)"],
                        sizeof($proceso_mapping->feedback['resource']), $paginacion->inicio);
        return $returnBusquedas;
        }

        function numberFindParameters($datosSearchParameters){
            $proceso_mapping = new ProcesoMapping();
            $proceso_mapping->numberFindParameters($datosSearchParameters);
            return $proceso_mapping->feedback['resource'];
        }
      
    }
?>