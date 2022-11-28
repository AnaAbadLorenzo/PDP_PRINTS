<?php

    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/Registro/RegistroService.php';
    include_once "./Mapping/PersonaMapping.php";
    include_once "./Mapping/UsuarioMapping.php";

    class RegistroServiceImpl extends ServiceBase implements RegistroService {
        public $recursos;

        function inicializarParametros($accion){
            switch($accion){
                case 'registro':
                    $this->persona = $this->crearModelo('Persona');
                    $this->usuario = $this->crearModelo('Usuario');
				    $this->clase_validacionAccionRegistroPersona = $this->crearValidacionAccion('Registro');
                    $this->clase_validacionFormatoRegistroPersona = $this->crearValidacionFormato('Registro');
                    $this->clase_validacionAccionRegistroUsuario = $this->crearValidacionAccion('Autenticacion');
                    $this->clase_validacionFormatoRegistroUsuario = $this->crearValidacionFormato('Autenticacion');
                break;
            }
        }

        function registro($mensaje) {
                $respuesta = '';
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

                if ($this->clase_validacionFormatoRegistroPersona != null) {
                    $this->clase_validacionFormatoRegistroPersona->validarAtributosRegistro($datosRegistroPersona);
                }
                if ($this->clase_validacionFormatoRegistroUsuario != null){
                    $this->clase_validacionFormatoRegistroUsuario->validarAtributosLogin($datosRegistroUsuario);
                }
                if ( $this->clase_validacionAccionRegistroPersona != null) {
                    $this->clase_validacionAccionRegistroPersona->comprobarRegistro($datosRegistroPersona, $datosRegistroUsuario);
                }
               
                if($this->clase_validacionFormatoRegistroPersona->respuesta != null){
                    $respuesta = $this->clase_validacionFormatoRegistroPersona->respuesta;
                }else if($this->clase_validacionFormatoRegistroUsuario->respuesta != null){
                    $respuesta = $this->clase_validacionFormatoRegistroUsuario->respuesta;
                }else if($this->clase_validacionAccionRegistroPersona->respuesta != null){
                    $respuesta = $this->clase_validacionAccionRegistroPersona->respuesta;
                }else{
                    $personaDatos = [
                        'dni_persona' => $datosRegistroPersona['dni_persona'],
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
                        'id_rol' => 2
                    ];
                  
                    $persona_mapping = new PersonaMapping();
                    $persona_mapping->add($personaDatos);
                    $usuario_mapping = new UsuarioMapping();
                    $usuario_mapping->add($usuarioDatos);

                    $respuesta = $mensaje;
                    $recursos = '';
                }
            return $respuesta;
        }
    }
?>