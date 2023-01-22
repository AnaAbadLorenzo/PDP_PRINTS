<?php

    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/GestionProcesos/GestionProcesosService.php';
    include_once './Mapping/ProcesoMapping.php';
    include_once './Mapping/UsuarioMapping.php';
    include_once './Mapping/CategoriaMapping.php';
    include_once './Mapping/NoticiaMapping.php';
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
                case 'searchByIdCategoria':
                    $this->proceso = $this->crearModelo('Proceso');
                break;
                case 'reactivar':
                    $this -> proceso = $this -> crearModelo('Proceso');
                    $this -> clase_validacionAccionProceso = $this -> crearValidacionAccion('DeleteProceso'); //hago las comprobaciones en este archivo, si tengo que hacer otro archivo a mayores para cada reactivacion de entidad no acabo nunca. besos, miguel
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
            $this->proceso->id_categoria != null){

                $datosProceso = array();
                $datosCategoria = array(
                    'id_categoria' => $this->proceso->id_categoria
                );
                
                $categoria_mapping = new CategoriaMapping();
                $categoria_mapping->searchById($datosCategoria);
                $categoria = $categoria_mapping->feedback['resource'];

                $datosProceso['nombre_proceso'] = $this->proceso->nombre_proceso;
                $datosProceso['descripcion_proceso'] = $this->proceso->descripcion_proceso;
                $datosProceso['fecha_proceso'] = date('Y-m-d');
                $datosProceso['borrado_proceso'] = 0;
                $datosProceso['version_proceso'] = 1;
                $datosProceso['check_aprobacion'] = $this->proceso->check_aprobacion;
                $datosProceso['formula_proceso'] = $this->proceso->formula_proceso;
                $datosProceso['id_categoria'] = $this->proceso->id_categoria;
                $datosProceso['dni_usuario'] = $categoria['dni_responsable'];
               
                
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

                    $procesoDatos = [
                        'nombre_proceso' => $this->proceso->nombre_proceso,
                        'descripcion_proceso' => $this->proceso->descripcion_proceso,
                        'fecha_proceso' => date('Y-m-d'),
                        'version_proceso' => 1,
                        'check_aprobacion' => $this->proceso->check_aprobacion,
                        'formula_proceso' => $this->proceso->formula_proceso,
                        'id_categoria' => $this->proceso->id_categoria,
                        'dni_usuario' => $categoria['dni_responsable'],
                        'borrado_proceso' => 0
                    ];
                   
          
                    $proceso_mapping = new ProcesoMapping();
                    $proceso_mapping->add($procesoDatos);

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
                $procesoV = array(
                    'id_proceso' => $this->proceso->id_proceso
                );
                $proceso_mapping = new ProcesoMapping();
                $proceso_mapping->getVersion($procesoV);
                $version = $proceso_mapping->feedback['resource']['version_proceso'];

                $proceso_mapping->searchById($procesoV);
                $antiguoProceso = $proceso_mapping->feedback['resource'];
      
                $datosCategoria = array(
                    'id_categoria' => $this->proceso->id_categoria
                );

                $categoria_mapping = new CategoriaMapping();
                $categoria_mapping->searchById($datosCategoria);
                $categoria = $categoria_mapping->feedback['resource'];
                
                $respuesta = '';
                $datosEditProceso = array();
                $datosEditProceso['id_proceso'] = $this->proceso->id_proceso;
                $datosEditProceso['nombre_proceso'] = $this->proceso->nombre_proceso;
                $datosEditProceso['descripcion_proceso'] = $this->proceso->descripcion_proceso;
                $datosEditProceso['fecha_proceso'] = date('Y-m-d');
                $datosEditProceso['version_proceso'] = $this->proceso->version_proceso;
                $datosEditProceso['version_proceso'] = $version;
                $datosEditProceso['check_aprobacion'] = $this->proceso->check_aprobacion;
                $datosEditProceso['formula_proceso'] = $this->proceso->formula_proceso;
                $datosEditProceso['id_categoria'] = $this->proceso->id_categoria;
                $datosEditProceso['dni_usuario'] = $categoria['dni_responsable'];
                $datosEditProceso['borrado_proceso'] = 0;

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

                    $procesoDatos = [
                        'id_proceso' => $this->proceso->id_proceso,
                        'nombre_proceso' => $this->proceso->nombre_proceso,
                        'descripcion_proceso' => $this->proceso->descripcion_proceso,
                        'fecha_proceso' => date('Y-m-d'),
                        'version_proceso' => intval($version)+1,
                        'check_aprobacion' => $this->proceso->check_aprobacion,
                        'formula_proceso' => $this->proceso->formula_proceso,
                        'id_categoria' => $this->proceso->id_categoria,
                        'dni_usuario' => $categoria['dni_responsable'],
                        'borrado_proceso' => 0
                    ];
                    $proceso_mapping->edit($procesoDatos);

                    if(intval($antiguoProceso['check_aprobacion']) == 0 && $this->proceso->check_aprobacion == 1) {
                        $noticia_mapping = new NoticiaMapping();
                        $datosNoticia = array(
                            'titulo_noticia' => 'Publicación de proceso',
                            'contenido_noticia' => 'Se ha publicado un nuevo proceso con nombre ' .$this->proceso->nombre_proceso,
                            'fecha_noticia' => date('Y-m-d')
                        );
                        $noticia_mapping->add($datosNoticia);
                    }

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

        function search($mensaje,$paginacion){
            $proceso_mapping = new ProcesoMapping();
            $proceso_mapping->search($paginacion);
            $datosProceso =  $proceso_mapping->feedback['resource'];
            $datosUsuario = $this->searchForeignKeysUsuario();
            $datosCategoria = $this->searchForeignKeysCategoria();

            $datosADevolver = array();
            $datosUsuarioDev = array();
            foreach($datosProceso as $proceso){
                foreach($datosUsuario as $usuario){
                    if($usuario['dni_usuario'] == $proceso['dni_usuario']){
                        $datosUsuarioDev['proceso'] = $proceso;
                        $datosUsuarioDev['usuario'] = $usuario;
                    }
                    foreach($datosCategoria as $categoria) {
                        if(isset($datosUsuarioDev['proceso'])){
                            if($categoria['id_categoria'] == $proceso['id_categoria']){
                                $datosUsuarioDev['categoria'] = $categoria;
                            }
                        }
                    }
                    
                }
                array_push($datosADevolver, $datosUsuarioDev);
            }
            $returnBusquedas = new ReturnBusquedas($datosADevolver, '',
                        $this->numberFindAll()["COUNT(*)"],sizeof($datosADevolver), $paginacion->inicio);

            return $returnBusquedas;
           
        }

        function searchDelete($mensaje,$paginacion){
            $proceso_mapping = new ProcesoMapping();
            $proceso_mapping->searchDelete($paginacion);
            $datosProceso =  $proceso_mapping->feedback['resource'];
            $datosUsuario = $this->searchForeignKeysUsuario();
            $datosCategoria = $this->searchForeignKeysCategoria();

            $datosADevolver = array();
            $datosUsuarioDev = array();
            foreach($datosProceso as $proceso){
                foreach($datosUsuario as $usuario){
                    if($usuario['dni_usuario'] == $proceso['dni_usuario']){
                        $datosUsuarioDev['proceso'] = $proceso;
                        $datosUsuarioDev['usuario'] = $usuario;
                    }
                    foreach($datosCategoria as $categoria) {
                        if(isset($datosUsuarioDev['proceso'])){
                            if($categoria['id_categoria'] == $proceso['id_categoria']){
                                $datosUsuarioDev['categoria'] = $categoria;
                            }
                        }
                    }
                    
                }
                array_push($datosADevolver, $datosUsuarioDev);
            }
            $returnBusquedas = new ReturnBusquedas($datosADevolver, '',
                        $this->numberFindDelete()["COUNT(*)"],sizeof($datosADevolver), $paginacion->inicio);

            return $returnBusquedas;
           
        }

        function numberFindAll(){
            $proceso_mapping = new ProcesoMapping();
            $proceso_mapping->numberFindAll();
            return $proceso_mapping->feedback['resource'];
        }

        function numberFindDelete(){
            $proceso_mapping = new ProcesoMapping();
            $proceso_mapping->numberFindDelete();
            return $proceso_mapping->feedback['resource'];
        }
    
        function searchAll($mensaje){
           
            $proceso_mapping = new ProcesoMapping();
            $proceso_mapping->searchAll();
            return $proceso_mapping->feedback['resource'];
           
        }

        function searchByParameters($mensaje, $paginacion){
          
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
            $datosProceso =  $proceso_mapping->feedback['resource'];
            $datosUsuario = $this->searchForeignKeysUsuario();
            $datosCategoria = $this->searchForeignKeysCategoria();

            $datosADevolver = array();
            $datosUsuarioDev = array();
            foreach($datosProceso as $proceso){
                foreach($datosUsuario as $usuario){
                    if($usuario['dni_usuario'] == $proceso['dni_usuario']){
                        $datosUsuarioDev['proceso'] = $proceso;
                        $datosUsuarioDev['usuario'] = $usuario;
                    }
                    foreach($datosCategoria as $categoria) {
                        if(isset($datosUsuarioDev['proceso'])){
                            if($categoria['id_categoria'] == $proceso['id_categoria']){
                                $datosUsuarioDev['categoria'] = $categoria;
                            }
                        }
                    }
                    
                }
                array_push($datosADevolver, $datosUsuarioDev);
            }
            $returnBusquedas = new ReturnBusquedas($datosADevolver, $datosSearchParameters,
                        $this->numberFindParameters($datosSearchParameters)["COUNT(*)"],sizeof($datosADevolver), $paginacion->inicio);

            return $returnBusquedas;
            
            return $returnBusquedas;
        }

        function searchByIdCategoria($mensaje, $paginacion){
            $respuesta = '';
            if($this->proceso->id_categoria===null){
                $datosSearchParameters['id_categoria'] = '';
            }else{
                $datosSearchParameters['id_categoria'] = $this->proceso->id_categoria;
            }

            $proceso_mapping= new ProcesoMapping();
            $proceso_mapping->searchByIdCategoria($datosSearchParameters, $paginacion);
            $datosProceso =  $proceso_mapping->feedback['resource'];
            $datosUsuario = $this->searchForeignKeysUsuario();
            $datosCategoria = $this->searchForeignKeysCategoria();

            $datosADevolver = array();
            $datosUsuarioDev = array();
            foreach($datosProceso as $proceso){
                foreach($datosUsuario as $usuario){
                    if($usuario['dni_usuario'] == $proceso['dni_usuario']){
                        $datosUsuarioDev['proceso'] = $proceso;
                        $datosUsuarioDev['usuario'] = $usuario;
                    }
                    foreach($datosCategoria as $categoria) {
                        if(isset($datosUsuarioDev['proceso'])){
                            if($categoria['id_categoria'] == $proceso['id_categoria']){
                                $datosUsuarioDev['categoria'] = $categoria;
                            }
                        }
                    }
                    
                }
                array_push($datosADevolver, $datosUsuarioDev);
            }

            $returnBusquedas = new ReturnBusquedas($datosADevolver, $datosSearchParameters, $this->numberFindByIdCategoria($datosSearchParameters)["COUNT(*)"],
                    sizeof($datosADevolver), $paginacion->inicio);
            return $returnBusquedas;
        }

        function numberFindParameters($datosSearchParameters){
            $proceso_mapping = new ProcesoMapping();
            $proceso_mapping->numberFindParameters($datosSearchParameters);
            return $proceso_mapping->feedback['resource'];
        }

        function searchForeignKeysUsuario() {
            $usuario_mapping = new UsuarioMapping();
            $usuario_mapping->searchAll();
            return $usuario_mapping->feedback['resource'];
        }

        function searchForeignKeysCategoria() {
            $categoria_mapping = new CategoriaMapping();
            $categoria_mapping->searchAll();
            return $categoria_mapping->feedback['resource'];
        }

        function numberFindByIdCategoria($datosSearchParameters){
            $proceso_mapping = new ProcesoMapping();
            $proceso_mapping->numberFindByIdCategoria($datosSearchParameters);
            return $proceso_mapping->feedback['resource'];
        }

        function reactivar() {
            $this -> clase_validacionAccionProceso -> comprobarReactivar($_POST);
            if (!empty($this -> clase_validacionAccionProceso -> respuesta)) {
                return $this -> clase_validacionAccionProceso -> respuesta;
            }
            
            $proceso_mapping = new ProcesoMapping();
            $respuesta = $proceso_mapping -> reactivar($_POST);
    
            return $respuesta;
    
        }

      
    }
?>