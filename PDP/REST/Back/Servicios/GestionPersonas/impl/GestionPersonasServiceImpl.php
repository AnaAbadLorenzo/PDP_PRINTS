<?php

    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/GestionPersonas/GestionPersonasService.php';
    include_once './Mapping/PersonaMapping.php';
    include_once './Mapping/UsuarioMapping.php';

    class GestionPersonasServiceImpl extends ServiceBase implements GestionPersonasService {

        private $persona_mapping;

        function inicializarParametros($accion){
            switch($accion){
                case 'edit':
                    $this->persona = $this->crearModelo('Persona');
                    //$this->usuario = $this->crearModelo('Usuario');
                    
				    $this->clase_validacionAccionEditPersona = $this->crearValidacionAccion('EditPersona');
                    $this->clase_validacionFormatoEditPersona = $this->crearValidacionFormato('Registro');
                    //$this->clase_validacionAccionRegistroUsuario = $this->crearValidacionAccion('Autenticacion');
                    //$this->clase_validacionFormatoRegistroUsuario = $this->crearValidacionFormato('Autenticacion');
                    break;
                case 'delete':
                    $this->persona = $this->crearModelo('Persona');
                    $this->usuario = $this->crearModelo('Usuario');
                    $this->clase_validacionAccionDeletePersona = $this->crearValidacionAccion('DeletePersona');
                    break;
                case 'searchByParameters':
                    $this->persona = $this->crearModelo('Persona');
                    break;
                default:
                    break;
            }
        }

        function edit($mensaje) {
            
                $respuesta = '';
                $datosEditPersona = array();
                $datosEditPersona['dni_persona'] = $this->persona->dni_persona;
                $datosEditPersona['nombre_persona'] = $this->persona->nombre_persona;
                $datosEditPersona['apellidos_persona'] = $this->persona->apellidos_persona;
                $datosEditPersona['fecha_nac_persona'] = $this->persona->fecha_nac_persona;
                $datosEditPersona['direccion_persona'] = $this->persona->direccion_persona;
                $datosEditPersona['email_persona'] = $this->persona->email_persona;
                $datosEditPersona['telefono_persona'] = $this->persona->telefono_persona;
                $datosEditPersona['borrado_persona'] = 0;

                if($this->clase_validacionFormatoEditPersona != null) {

                    $this->clase_validacionFormatoEditPersona->validarAtributosRegistro($datosEditPersona);
                }
            
                if($this->clase_validacionAccionEditPersona != null) {

                    $this->clase_validacionAccionEditPersona->comprobarEditPersona($datosEditPersona);
                }
                if($this->clase_validacionFormatoEditPersona->respuesta != null){

                    $respuesta =  $this->clase_validacionFormatoEditPersona->respuesta;

                }else if($this->clase_validacionAccionEditPersona->respuesta != null){

                    $respuesta = $this->clase_validacionAccionEditPersona->respuesta;
    
                }else{

                $personaDatos = [
                    'dni_persona' => $datosEditPersona['dni_persona'],
                    'nombre_persona' => $this->persona->nombre_persona,
                    'apellidos_persona' => $this->persona->apellidos_persona,
                    'fecha_nac_persona' => $this->persona->fecha_nac_persona,
                    'direccion_persona' => $this->persona->direccion_persona,
                    'email_persona' => $this->persona->email_persona,
                    'telefono_persona' => $this->persona->telefono_persona,
                    'borrado_persona' => 0

                ];

                $this->persona_mapping->edit($personaDatos);
                $respuesta= $mensaje;
            }
           
            
            return $respuesta;
    
        }


        function delete($mensaje){
            
            
                $respuesta = '';
                $datosDeletePersona = array();
                $datosDeletePersona['dni_persona'] = $this->persona->dni_persona;
                

                $datosDeleteUsuario = array();
                $datosDeleteUsuario['dni_usuario'] = $this->persona->dni_persona;
                
                if($this->clase_validacionAccionDeletePersona != null) {
                $this->clase_validacionAccionDeletePersona->comprobarDeletePersona($datosDeletePersona);
                }
                if($this->clase_validacionAccionDeletePersona->respuesta != null){

                    $respuesta =  $this->clase_validacionAccionDeletePersona->respuesta;

                }else{
               
                $personaDatos = [
                    'dni_persona' => $datosDeletePersona['dni_persona'],
                    
                ];

                $usuarioDatos = [
                    'dni_usuario' => $datosDeleteUsuario['dni_usuario'],
                    
                ];
                $usuario_mapping = new UsuarioMapping();
                $usuario_mapping->delete($usuarioDatos);
                $this->persona_mapping->delete($personaDatos);
                $respuesta= $mensaje;
            }

            
            return $respuesta;
        }
    
        function search($mensaje){
            $this->persona_mapping->search();
            return $this->persona_mapping->feedback['resource'];
        }

        function searchByParameters($mensaje){

            $respuesta = '';
            
                $datosSearchParameters = array();
                if($this->persona->dni_persona===null){
                    $datosSearchParameters['dni_persona'] = '';
                }else{
                    $datosSearchParameters['dni_persona'] = $this->persona->dni_persona;
                }
                if($this->persona->nombre_persona===null){
                    $datosSearchParameters['nombre_persona'] = '';
                }else{
                    $datosSearchParameters['nombre_persona'] = $this->persona->nombre_persona;
                }
                if($this->persona->apellidos_persona===null){
                    $datosSearchParameters['apellidos_persona'] = '';
                }else{
                    $datosSearchParameters['apellidos_persona'] = $this->persona->apellidos_persona;
                }
                if($this->persona->fecha_nac_persona===null){
                    $datosSearchParameters['fecha_nac_persona'] = '';
                }else{
                    $datosSearchParameters['fecha_nac_persona'] = $this->persona->fecha_nac_persona;
                }
                if($this->persona->direccion_persona===null){
                    $datosSearchParameters['direccion_persona'] = '';
                }else{
                    $datosSearchParameters['direccion_persona'] = $this->persona->direccion_persona;
                }
                if($this->persona->email_persona===null){
                    $datosSearchParameters['email_persona'] = '';
                }else{
                    $datosSearchParameters['email_persona'] = $this->persona->email_persona;
                }
                if($this->persona->telefono_persona===null){
                    $datosSearchParameters['telefono_persona'] = '';
                }else{
                    $datosSearchParameters['telefono_persona'] = $this->persona->telefono_persona;
                }

                $datosSearchParameters['borrado_persona'] = 0;
            	
            $this->persona_mapping->searchByParameters($datosSearchParameters);
            return $this->persona_mapping->feedback['resource'];
        }
    }
?>