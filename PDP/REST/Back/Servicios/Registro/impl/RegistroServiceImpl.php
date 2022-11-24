<?php

    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/Registro/RegistroService.php';
    include_once "./Mapping/PersonaMapping.php";

    class RegistroServiceImpl extends ServiceBase implements RegistroService {

        function inicializarParametros($accion){
            switch($accion){
                case 'registro':
                    $this->persona = $this->crearModelo('Persona');
                    $this->usuario = $this->crearModelo('Usuario');
				    $this->clase_validacionAccionRegistroPersona = $this->crearValidacionAccion('Registro');
                    $this->clase_validacionFormatoRegistroPersona = $this->crearValidacionFormato('Registro');
                    //$this->clase_validacionAccionRegistroUsuario = $this->crearValidacionAccion('Autenticacion');
                    $this->clase_validacionFormatoRegistroUsuario = $this->crearValidacionFormato('Autenticacion');
                break;
            }
        }

        function registro($mensaje) {
            try{
                
                $datosRegistroPersona = array();
                $datosRegistroPersona['dni_persona'] = $this->persona->dni_persona;
                $datosRegistroPersona['nombre_persona'] = $this->persona->nombre_persona;
                $datosRegistroPersona['apellidos_persona'] = $this->persona->apellidos_persona;
                $datosRegistroPersona['fecha_nac_persona'] = $this->persona->fecha_nac_persona;
                $datosRegistroPersona['direccion_persona'] = $this->persona->direccion_persona;
                $datosRegistroPersona['email_persona'] = $this->persona->email_persona;
                $datosRegistroPersona['telefono_persona'] = $this->persona->telefono_persona;
                $datosRegistroPersona['borrado_persona'] = 0;

                $datosRegistroUsuario = array();
                $datosRegistroUsuario['usuario'] = $this->usuario->usuario;
                $datosRegistroUsuario['passwd_usuario'] = $this->usuario->passwd_usuario;
                $datosRegistroUsuario['borrado_usuario'] = 0;


              
                $this->clase_validacionFormatoRegistroPersona->comprobarRegistroBlank($datosRegistroPersona);
                $this->clase_validacionFormatoRegistroUsuario->comprobarLoginBlank($datosRegistroUsuario);
             
                //desconozco razón por la cual no funciona
                //$this->clase_validacionAccionRegistroPersona->comprobarRegistro($datosRegistroPersona, $datosRegistroUsuario);
                
             
                
                /*
                $datosBuscarUser = array();
                $datosBuscarUser['dni_usuario'] = $this->usuario->usuario;
                $datosBuscarUser['foraneas'] = $this->usuario->clavesForaneas;
*/
                $personaDatos = [
                    'dni_persona' => $this->persona->dni_persona,
                    'nombre_persona' => $this->persona->nombre_persona,
                    'apellidos_persona' => $this->persona->apellidos_persona,
                    'fecha_nac_persona' => $this->persona->fecha_nac_persona,
                    'direccion_persona' => $this->persona->direccion_persona,
                    'email_persona' => $this->persona->email_persona,
                    'telefono_persona' => $this->persona->telefono_persona,
                    'borrado_persona' => 0

                ];

                $usuarioDatos = [
                    'dni_usuario' => $this->persona->dni_persona,
                    'borrado_usuario' => 0,
                    'usuario' => $this->usuario->usuario,
                    'passwd_usuario' => $this->usuario->passwd_usuario,
                    'rol' => 2/*$this->usuario->getById('rol',$datosBuscarUser)['resource']['id_rol']*/
                ];
              
                

                include_once "./Autenticacion/GetJWToken.php";
              
                $persona_mapping = new PersonaMapping();
                $this->$persona_mapping->add($datosRegistroPersona);
                $usuario_mapping = new UsuarioMapping();
                $this->$usuario_mapping->add($usuarioDatos);
                $token = GetJWToken::getJWToken($usuarioDatos);

            }
            
            catch(TokenException $ex){
                //$this->rellenarExcepcion($ex->getMessage(), 'login');
            }catch(AtributoIncorrectoException $ex){
                //$this->rellenarExcepcion($ex->getMessage(), 'login');
            }catch(UsuarioNoEncontradoException $ex){
               // $this->rellenarExcepcion($ex->getMessage(), 'login');
            }catch(PasswdUsuarioNoCoincideException $ex){
                //$this->rellenarExcepcion($ex->getMessage(), 'login');
            }
            
            return $personaDatos;
    
        }
    }
?>