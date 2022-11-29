<?php

    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/GestionPersonas/GestionPersonasService.php';
    include_once "./Mapping/PersonaMapping.php";
    include_once "./Mapping/UsuarioMapping.php";

    class GestionPersonasServiceImpl extends ServiceBase implements GestionPersonasService {

        function inicializarParametros($accion){
            switch($accion){
                case 'edit':
                    $this->persona = $this->crearModelo('Persona');
                    //$this->usuario = $this->crearModelo('Usuario');
                    
				    $this->clase_validacionAccionEditPersona = $this->crearValidacionAccion('EditPersona');
                    $this->clase_validacionFormatoEditPersona = $this->crearValidacionFormato('Registro');
                    //$this->clase_validacionAccionRegistroUsuario = $this->crearValidacionAccion('Autenticacion');
                    //$this->clase_validacionFormatoRegistroUsuario = $this->crearValidacionFormato('Autenticacion');

                    case 'delete':
                        $this->persona = $this->crearModelo('Persona');
                        $this->usuario = $this->crearModelo('Usuario');
                        $this->clase_validacionAccionDeletePersona = $this->crearValidacionAccion('DeletePersona');
                break;
            }
        }

        function edit($mensaje) {
            try{
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

                /*$datosRegistroUsuario = array();
                $datosRegistroUsuario['usuario'] = $this->usuario->usuario;
                $datosRegistroUsuario['passwd_usuario'] = $this->usuario->passwd_usuario;
                $datosRegistroUsuario['borrado_usuario'] = 0;*/

                $this->clase_validacionFormatoEditPersona->validarAtributosRegistro($datosEditPersona);
                //$this->clase_validacionFormatoRegistroUsuario->validarAtributosLogin($datosRegistroUsuario);
                $this->clase_validacionAccionEditPersona->comprobarEditPersona($datosEditPersona);
               
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
              
                $persona_mapping = new PersonaMapping();
                $persona_mapping->edit($personaDatos);
            
            }catch(AtributoIncorrectoException $ex){
               $this->rellenarExcepcion($ex->getMessage(), 'edit');
               throw new AtributoIncorrectoException($ex->getMessage());
            }catch(DNINoExisteException $ex){
                $this->rellenarExcepcion($ex->getMessage(), 'edit');
                throw new DNINoExisteException($ex->getMessage());
             }
            
            return $respuesta;
    
        }


        function delete($mensaje){
            try{
            
                $respuesta = '';
                $datosDeletePersona = array();
                $datosDeletePersona['dni_persona'] = $this->persona->dni_persona;
                

                $datosDeleteUsuario = array();
                $datosDeleteUsuario['dni_usuario'] = $this->persona->dni_persona;
                
                //$this->clase_validacionFormatoEditPersona->validarAtributosRegistro($datosEditPersona);
                //$this->clase_validacionFormatoRegistroUsuario->validarAtributosLogin($datosRegistroUsuario);
                $this->clase_validacionAccionDeletePersona->comprobarDeletePersona($datosDeletePersona);
               
                $personaDatos = [
                    'dni_persona' => $datosDeletePersona['dni_persona'],
                    
                ];

                $usuarioDatos = [
                    'dni_usuario' => $datosDeleteUsuario['dni_usuario'],
                    
                ];
                $usuario_mapping = new UsuarioMapping();
                $usuario_mapping->delete($usuarioDatos);
                $persona_mapping = new PersonaMapping();
                $persona_mapping->delete($personaDatos);
            
            }catch(AtributoIncorrectoException $ex){
               $this->rellenarExcepcion($ex->getMessage(), 'edit');
               throw new AtributoIncorrectoException($ex->getMessage());
            }catch(DNINoExisteException $ex){
                $this->rellenarExcepcion($ex->getMessage(), 'edit');
                throw new DNINoExisteException($ex->getMessage());
             }
            
            return $respuesta;
        }
        function search($mensaje){
            $persona_mapping = new PersonaMapping();
            $persona_mapping->search();
            return $persona_mapping->feedback['resource'];
        }
        function searchBy($mensaje){

        }
    }
?>