<?php

    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/GestionAcciones/GestionAccionesService.php';
    include_once './Mapping/AccionMapping.php';
    include_once './Mapping/UsuarioMapping.php';

class GestionAccionesServiceImpl extends ServiceBase implements GestionAccionesService {

        private $accion_mapping;
        private $usuario_mapping;

        function inicializarParametros($accion){
            switch($accion){
                case 'add' :
                    $this->accion = $this->crearModelo('Accion');
				    //$this->clase_validacionAccionAccion = $this->crearValidacionAccion('EditAccion'); en caso de haber alguna premisa creae otro fichero (AddAccionAccion.php)
                    $this->clase_validacionFormatoAccion = $this->crearValidacionFormato('Accion');
                case 'edit':
                    $this->accion = $this->crearModelo('Accion');
                    $this->clase_validacionAccionAccion = $this->crearValidacionAccion('EditAccion');
                    $this->clase_validacionFormatoAccion = $this->crearValidacionFormato('Accion');
                    /*$this->persona = $this->crearModelo('Persona');
                    //$this->usuario = $this->crearModelo('Usuario');
                    
				    $this->clase_validacionAccionEditPersona = $this->crearValidacionAccion('EditPersona');
                    $this->clase_validacionFormatoEditPersona = $this->crearValidacionFormato('Registro');
                    //$this->clase_validacionAccionRegistroUsuario = $this->crearValidacionAccion('Autenticacion');
                    //$this->clase_validacionFormatoRegistroUsuario = $this->crearValidacionFormato('Autenticacion');*/
                    break;
                case 'delete':
                    $this->accion = $this->crearModelo('Accion');
                    $this->clase_validacionAccionDeleteAccion = $this->crearValidacionAccion('DeleteAccion');
                    break;
                case 'searchByParameters':
                    $this->accion = $this->crearModelo('Accion');
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
                //no hay que realizar ninguna premisa para insertar...
                /*if ($this->clase_validacionAccionAccion != null){
                    $this->clase_validacionAccionAccion->comprobarAccion($datosAccion);
                }*/
                
            
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
                $datosEditAccion['borrado_accion'] = 0;

                
                if ($this->clase_validacionFormatoAccion != null) {
                    $this->clase_validacionFormatoAccion->validarAtributosAccion($datosEditAccion);
                }
                if ($this->clase_validacionAccionAccion != null){
                    $this->clase_validacionAccionAccion->comprobarAccion($datosEditAccion);
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
                        'borrado_accion' => 0
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
    
        function search($mensaje){
            $accion_mapping = new AccionMapping();
            $accion_mapping->search();
            return $accion_mapping->feedback['resource'];
        }

        function searchByParameters($mensaje){

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
        }
       
    }
?>