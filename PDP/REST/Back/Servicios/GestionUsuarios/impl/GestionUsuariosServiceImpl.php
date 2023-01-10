<?php

include_once './Servicios/ServiceBase.php';
include_once './Servicios/GestionUsuarios/GestionUsuariosService.php';
include_once './Servicios/Comun/ReturnBusquedas.php';
include_once "./Mapping/UsuarioMapping.php";
include_once "./Mapping/RolMapping.php";
include_once "./Mapping/PersonaMapping.php";

class GestionUsuariosServiceImpl extends ServiceBase implements GestionUsuariosService {

    private $usuario;
    private $clase_validacionAccionUsuario;
    private $clase_validacionFormatoUsuario;
    private $recursos;

    function inicializarParametros($accion){
        switch($accion){
            case 'add' :
                $this->usuario = $this->crearModelo('Usuario');
                $this->clase_validacionAccionUsuario = $this->crearValidacionAccion('Usuario');
                $this->clase_validacionFormatoUsuario = $this->crearValidacionFormato('Usuario');
            break;
            case 'editPassUsuario':
                $this->usuario = $this->crearModelo('Usuario');
                $this->clase_validacionAccionUsuario = $this->crearValidacionAccion('Usuario');
                $this->clase_validacionFormatoUsuario = $this->crearValidacionFormato('Usuario');
            break;
            case 'editRolUsuario':
                $this->usuario = $this->crearModelo('Usuario');
                $this->clase_validacionAccionUsuario = $this->crearValidacionAccion('Usuario');
                $this->clase_validacionFormatoUsuario = $this->crearValidacionFormato('Usuario');
            break;
            case 'delete':
                $this -> usuario = $this -> crearModelo('Usuario');
                $this -> clase_validacionFormatoUsuario = $this->crearValidacionFormato('Usuario');
                $this -> clase_validacionAccionUsuario = $this->crearValidacionAccion('Usuario');
                break;
            case 'reactivar':
                $this -> usuario = $this -> crearModelo('Usuario');
                $this -> clase_validacionAccionUsuario = $this -> crearValidacionAccion('DeleteUsuario');
                break;
            case 'searchByParameters':
                $this->usuario = $this->crearModelo('Usuario');
                break;
            default:
                break;
        }
    }

    function add($mensaje){
        $respuesta = '';

        if($this->usuario->dni_usuario != null &&
            $this->usuario->usuario != null &&
            $this->usuario->passwd_usuario){
            
            $datosUsuario = array();
            
            $datosUsuario['dni_usuario'] = $this->usuario->dni_usuario;
            $datosUsuario['usuario'] = $this->usuario->usuario;
            $datosUsuario['passwd_usuario'] = $this->usuario->passwd_usuario;
            $datosUsuario['borrado_usuario'] = 0;

            
            if ($this->clase_validacionFormatoUsuario != null) {
                $this->clase_validacionFormatoUsuario->validarAtributosUsuario($datosUsuario);
            }
        
            if ($this->clase_validacionAccionUsuario != null){
                $this->clase_validacionAccionUsuario->comprobarAddUsuario($datosUsuario);
            }
            
            if($this->clase_validacionFormatoUsuario->respuesta != null){
                $respuesta = $this->clase_validacionFormatoUsuario->respuesta;
            }else if($this->clase_validacionAccionUsuario->respuesta != null){
                $respuesta = $this->clase_validacionAccionUsuario->respuesta;
            }else{
                $rolMapping = new RolMapping();
                $datosSearchRol = array(
                    'nombre_rol' => 'Usuario'
                );
                $rolMapping->searchByName($datosSearchRol);
                $idRolDefecto =$rolMapping->feedback['resource'];
                $usuarioDatos = [
                    'dni_usuario' => $this->usuario->dni_usuario,
                    'usuario' => $this->usuario->usuario,
                    'passwd_usuario' => $this->usuario->passwd_usuario,
                    'borrado_usuario' => 0,
                    'id_rol' => $idRolDefecto['id_rol']
                ];
                $usuario_mapping = new UsuarioMapping();
                $usuario_mapping->add($usuarioDatos);

                $respuesta = $mensaje;
                $this->recursos = '';
            }
        }
    
    return $respuesta;

    }

    function editPassUsuario($mensaje) {
       
        $respuesta = '';
        $datosEditUsuario = array();
        $datosEditUsuario['dni_usuario'] = $this->usuario->dni_usuario;
        $datosEditUsuario['usuario'] = $this->usuario->usuario;
        $datosEditUsuario['passwd_usuario'] = $this->usuario->passwd_usuario;
        $datosEditUsuario['borrado_usuario'] = 0;
        
        if($this->clase_validacionFormatoUsuario != null) {
            $this->clase_validacionFormatoUsuario->validarAtributoPass($datosEditUsuario['passwd_usuario']);
        }

        if($this->clase_validacionAccionUsuario != null) {
            $this->clase_validacionAccionUsuario->comprobarEditPassUsuario($datosEditUsuario);
        }
        
        if($this->clase_validacionFormatoUsuario->respuesta != null){

            $respuesta =  $this->clase_validacionFormatoUsuario->respuesta;

        }else if($this->clase_validacionAccionUsuario->respuesta != null){
            $respuesta = $this->clase_validacionAccionUsuario->respuesta;
        }else{
            $usuario_mapping = new UsuarioMapping();
            $datoBuscar = array();
            $datoBuscar['usuario'] = $datosEditUsuario['usuario'];
            $usuario_mapping->searchByLogin($datoBuscar);
            $resultado = $usuario_mapping->feedback['resource'];
            $usuarioDatos = [

                'dni_usuario' => $resultado['dni_usuario'],
                'usuario' => $this->usuario->usuario,
                'passwd_usuario' => $this->usuario->passwd_usuario,
                'borrado_usuario' => 0
            ];

            $usuario_mapping->edit($usuarioDatos);
            $respuesta= $mensaje;
        }
        return $respuesta;
    }

    function editRolUsuario($mensaje) {
       
        $respuesta = '';
        $datosEditUsuario = array();
        $datosEditUsuario['dni_usuario'] = $this->usuario->dni_usuario;
        $datosEditUsuario['usuario'] = $this->usuario->usuario;
        $datosEditUsuario['passwd_usuario'] = $this->usuario->passwd_usuario;
        $datosEditUsuario['borrado_usuario'] = 0;
        $datosEditUsuario['id_rol'] = $this->usuario->id_rol;
        
        if($this->clase_validacionFormatoUsuario != null) {
            $this->clase_validacionFormatoUsuario->validarAtributoRolUsuario($datosEditUsuario['id_rol']);
        }

        if($this->clase_validacionAccionUsuario != null) {
            $this->clase_validacionAccionUsuario->comprobarEditRolUsuario($datosEditUsuario);
        }
        
        if($this->clase_validacionFormatoUsuario->respuesta != null){
            $respuesta =  $this->clase_validacionFormatoUsuario->respuesta;
        }else if($this->clase_validacionAccionUsuario->respuesta != null){
            $respuesta = $this->clase_validacionAccionUsuario->respuesta;
        }else{
            $usuarioDatos = [
                'dni_usuario' => $datosEditUsuario['dni_usuario'],
                'id_rol' => $datosEditUsuario['id_rol']
            ];

            $usuario_mapping = new UsuarioMapping();
            $usuario_mapping->editRol($usuarioDatos);
            $respuesta= $mensaje;
        }
        return $respuesta;
    }


    function delete($mensaje){

        $usuario = [
            'dni_usuario' => $this -> usuario -> dni_usuario
        ];

        $this -> clase_validacionFormatoUsuario -> validar_dni_usuario($usuario['dni_usuario']);
        if ($this -> clase_validacionFormatoUsuario -> respuesta != '') {
            return $this -> clase_validacionFormatoUsuario -> respuesta;
        }

        $this -> clase_validacionAccionUsuario -> comprobarDeleteUsuario($usuario);
        if ($this -> clase_validacionAccionUsuario -> respuesta != null){
            return $this -> clase_validacionAccionUsuario -> respuesta;
        }
        
        $usuario_mapping = new UsuarioMapping;
        $usuario_mapping -> delete($usuario);
        
        return $mensaje;

    }

    function search($mensaje, $paginacion){
        $usuario_mapping = new UsuarioMapping();
        $usuario_mapping->search($paginacion);
        $datosRol = $this->searchForeignKeys();

        $datosADevolver = array();
        $datosUsuarioRol = array();
        foreach($usuario_mapping->feedback['resource'] as $usuario){
            foreach($datosRol as $rol){
                if($usuario['id_rol'] == $rol['id_rol']){
                    $datosUsuarioRol['usuario'] = $usuario;
                    $datosUsuarioRol['rol'] = $rol;
                    array_push($datosADevolver, $datosUsuarioRol);
                }
            }
        }
        $returnBusquedas = new ReturnBusquedas($datosADevolver, '',
                    $this->numberFindAll()["COUNT(*)"],sizeof($usuario_mapping->feedback['resource']), $paginacion->inicio);
        return $returnBusquedas;
    }

    function searchDelete($mensaje, $paginacion){
        $usuario_mapping = new UsuarioMapping();
        $usuario_mapping->searchDelete($paginacion);
        $datosRol = $this->searchForeignKeys();

        $datosADevolver = array();
        $datosUsuarioRol = array();
        foreach($usuario_mapping->feedback['resource'] as $usuario){
            foreach($datosRol as $rol){
                if($usuario['id_rol'] == $rol['id_rol']){
                    $datosUsuarioRol['usuario'] = $usuario;
                    $datosUsuarioRol['rol'] = $rol;
                    array_push($datosADevolver, $datosUsuarioRol);
                }
            }
        }
        $returnBusquedas = new ReturnBusquedas($datosADevolver, '',
                    $this->numberFindAll()["COUNT(*)"],sizeof($usuario_mapping->feedback['resource']), $paginacion->inicio);
        return $returnBusquedas;
    }

    function searchForeignKeys() {
        $rol_mapping = new RolMapping();
        $rol_mapping->searchAll();
        return $rol_mapping->feedback['resource'];
    }
    
    function numberFindAll(){
        $usuario_mapping = new UsuarioMapping();
        $usuario_mapping->numberFindAll();
        return $usuario_mapping->feedback['resource'];
    }

    function searchByParameters($mensaje, $paginacion){

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

            if($this->usuario->id_rol===null ||$this->usuario->id_rol==="0"){
                $datosSearchParameters['id_rol'] = '';
            }else{
                $datosSearchParameters['id_rol'] = $this->usuario->id_rol;
            }

            $datosSearchParameters['borrado_usuario'] = 0;


        $usuario_mapping = new UsuarioMapping();
        $usuario_mapping->searchByParameters($datosSearchParameters, $paginacion);
        $datosRol = $this->searchForeignKeys();

        $datosADevolver = array();
        $datosUsuarioRol = array();
        foreach($usuario_mapping->feedback['resource'] as $usuario){
            foreach($datosRol as $rol){
                if($usuario['id_rol'] == $rol['id_rol']){
                    $datosUsuarioRol['usuario'] = $usuario;
                    $datosUsuarioRol['rol'] = $rol;
                    array_push($datosADevolver, $datosUsuarioRol);
                }
            }
        }

        $returnBusquedas = new ReturnBusquedas($datosADevolver, $datosSearchParameters, $this->numberFindParameters($datosSearchParameters)["COUNT(*)"],
                            sizeof($usuario_mapping->feedback['resource']), $paginacion->inicio);
        return $returnBusquedas;
    }

    function searchAll($mensaje){
        $usuario_mapping = new UsuarioMapping();
        $usuario_mapping->searchAll();
        $datosRol = $this->searchForeignKeys();

        $datosADevolver = array();
        $datosUsuarioRol = array();
        foreach($usuario_mapping->feedback['resource'] as $usuario){
            foreach($datosRol as $rol){
                if($usuario['id_rol'] == $rol['id_rol']){
                    $datosUsuarioRol['usuario'] = $usuario;
                    $datosUsuarioRol['rol'] = $rol;
                    array_push($datosADevolver, $datosUsuarioRol);
                }
            }
        }
        $returnBusquedas = new ReturnBusquedas($datosADevolver, '',
                    $this->numberFindAll()["COUNT(*)"],sizeof($usuario_mapping->feedback['resource']), '');
        return $returnBusquedas;
    }

    function reactivar($mensaje) {

        $this -> clase_validacionAccionUsuario -> comprobarReactivar($_POST);
        if (!empty($this -> clase_validacionAccionUsuario -> respuesta)) {
            return $this -> clase_validacionAccionUsuario -> respuesta;
        }
        
        $usuario_mapping = new UsuarioMapping;
        $respuesta = $usuario_mapping -> reactivar($_POST);
		
        $datos_persona = [
            'dni_persona' => $_POST['dni_usuario']
        ];
        
        $persona_mapping = new PersonaMapping;
        $respuesta = $persona_mapping -> reactivar($datos_persona);

        $respuesta = $mensaje; 
        
        return $respuesta;

    }

    function numberFindParameters($datosSearchParameters){
        $usuario_mapping = new UsuarioMapping();
        $usuario_mapping->numberFindParameters($datosSearchParameters);
        return $usuario_mapping->feedback['resource'];
    }

}
?>