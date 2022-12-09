<?php

    include_once './Servicios/ServiceBase.php';
    include_once './Servicios/GestionUsuarios/GestionUsuariosService.php';
    include_once "./Mapping/UsuarioMapping.php";

    class GestionUsuariosServiceImpl extends ServiceBase implements GestionUsuariosService {

        function inicializarParametros($accion){
            switch($accion){
                case 'edit':
                    $this->usuario = $this->crearModelo('Usuario');

				    $this->clase_validacionAccionEditUsuario = $this->crearValidacionAccion('EditUsuario');
                    $this->clase_validacionFormatoEditUsuario = $this->crearValidacionFormato('GestionUsuarios');
                    break;
                case 'delete':
                    $this->usuario = $this->crearModelo('Usuario');
                    $this->clase_validacionAccionDeleteUsuario = $this->crearValidacionAccion('DeleteUsuario');
                    break;
                case 'searchByParameters':
                    $this->usuario = $this->crearModelo('Usuario');
                    break;
                default:
                    break;
            }
        }

        function edit($mensaje) {

                $respuesta = '';
                $datosEditUsuario = array();
                $datosEditUsuario['dni_usuario'] = $this->usuario->dni_usuario;
                $datosEditUsuario['usuario'] = $this->usuario->usuario;
                $datosEditUsuario['passwd_usuario'] = $this->usuario->passwd_usuario;
                $datosEditUsuario['borrado_usuario'] = 0;
                if($this->clase_validacionFormatoEditUsuario != null) {

                    $this->clase_validacionFormatoRegistroUsuario->validarAtributosLogin($datosRegistroUsuario);

                }

                if($this->clase_validacionAccionEditUsuario != null) {

                    $this->clase_validacionAccionEditUsuario>comprobarEditUsuario ($datosEditUsuario);
                }
                if($this->clase_validacionFormatoEditUsuario->respuesta != null){

                    $respuesta =  $this->clase_validacionFormatoEditUsuario->respuesta;

                }else if($this->clase_validacionAccionEditUsuario->respuesta != null){

                    $respuesta = $this->clase_validacionAccionEditUsuario->respuesta;

                }else{

                $usuarioDatos = [

                    'dni_usuario' => $datosEditPersona['dni_usuario'],
                    'usuario' => $this->usuario->usuario,
                    'passwd_usuario' => $this->usuario->passwd_usuario,
                    'borrado_usuario' => 0

                ];

                $usuario_mapping = new UsuarioMapping();
                $usuario_mapping->edit($usuarioDatos);
                $respuesta= $mensaje;
            }


            return $respuesta;

        }


        function delete($mensaje){


                $respuesta = '';
                $datosDeleteUsuario = array();
                $datosDeleteUsuario['dni_usuario'] = $this->usuario->dni_usuario;

                if($this->clase_validacionAccionDeleteUsuario != null) {
                $this->clase_validacionAccionDeleteUsuario->comprobarDeleteUsuario($datosDeleteUsuario);
                }
                if($this->clase_validacionAccionDeleteUsuario->respuesta != null){

                    $respuesta =  $this->clase_validacionAccionDeleteUsuario->respuesta;

                }else{

                $usuarioDatos = [
                    'dni_usuario' => $datosDeleteUsuario['dni_usuario'],

                ];

                $usuarioDatos = [
                    'dni_usuario' => $datosDeleteUsuario['dni_usuario'],

                ];
                $usuario_mapping = new UsuarioMapping();
                $usuario_mapping->delete($usuarioDatos);
                $respuesta= $mensaje;
            }


            return $respuesta;
        }

        function search($mensaje){
            $usuario_mapping = new UsuarioMapping();
            $usuario_mapping->search();
            return $usuario_mapping->feedback['resource'];
        }

        function searchByParameters($mensaje){

            $respuesta = '';

                $datosSearchParameters = array();
                if($this->usuario->dni_usuario===null){
                    $datosSearchParameters['dni_usuario'] = '';
                }else{
                    $datosSearchParameters['dni_usuario'] = $this->usuario->dni_usuario;
                }
                if($this->usuario->usuario===null){
                    $datosSearchParameters['usuario'] = '';
                }else{
                    $datosSearchParameters['usuario'] = $this->usuario->usuario;
                }
                if($this->usuario->passwd_usuario===null){
                    $datosSearchParameters['passwd_usuario'] = '';
                }else{
                    $datosSearchParameters['passwd_usuario'] = $this->usuario->passwd_usuario;
                }

                $datosSearchParameters['borrado_usuario'] = 0;


            $usuario_mapping = new UsuarioMapping();
            $usuario_mapping->searchByParameters($datosSearchParameters);
            return $usuario_mapping->feedback['resource'];
        }
    }
?>