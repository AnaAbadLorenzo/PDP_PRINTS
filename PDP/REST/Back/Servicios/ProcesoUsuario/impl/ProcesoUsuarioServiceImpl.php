<?php

include_once './Servicios/ServiceBase.php';
include_once './Servicios/Comun/ReturnBusquedas.php';
include_once './Servicios/ProcesoUsuario/ProcesoUsuarioService.php';

include_once './Mapping/ProcesoUsuarioMapping.php';

include_once './Modelos/ProcesoUsuarioModel.php';

include_once './Validation/Accion/ProcesoUsuarioAccion.php';

class ProcesoUsuarioServiceImpl extends ServiceBase implements ProcesoUsuarioService {

    public $proceso_usuario;
    
    private $validacion_formato;
    private $validacion_accion;

    function inicializarParametros() {
        $this -> proceso_usuario = $this -> crearModelo('ProcesoUsuario');
        $this -> validacion_accion = $this -> crearValidacionAccion('ProcesoUsuario');
        $this -> validacion_formato = $this -> crearValidacionFormato('ProcesoUsuario');
    }

    function add($mensaje) {

        $proceso_usuario_datos = [
            'fecha_proceso_usuario' => $this -> proceso_usuario -> fecha_proceso_usuario,
            'calculo_huella_carbono' => $this -> proceso_usuario -> calculo_huella_carbono,
            'dni_usuario' => $this -> proceso_usuario -> dni_usuario,
            'id_proceso' => $this -> proceso_usuario -> id_proceso
        ];
    
        $this -> validacion_formato -> validarAtributosAdd($proceso_usuario_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarAdd($proceso_usuario_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //añadir a bd
        $proceso_usuario_mapping = new ProcesoUsuarioMapping;
        $proceso_usuario_mapping -> add($proceso_usuario_datos);

        if ($proceso_usuario_mapping -> respuesta == null) {
            $respuesta = $mensaje;
        } else {
            $respuesta = $proceso_usuario_mapping -> respuesta;
        }

        return $respuesta;

    }

    function edit($mensaje) {

        $proceso_usuario_datos = [
            'id_proceso_usuario' => $this -> proceso_usuario -> id_proceso_usuario,
            'fecha_proceso_usuario' => $this -> proceso_usuario -> fecha_proceso_usuario,
            'calculo_huella_carbono' => $this -> proceso_usuario -> calculo_huella_carbono,
            'dni_usuario' => $this -> proceso_usuario -> dni_usuario,
            'id_proceso' => $this -> proceso_usuario -> id_proceso
        ];
    
        $this -> validacion_formato -> validarAtributosEdit($proceso_usuario_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarEdit($proceso_usuario_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //añadir a bd
        $proceso_usuario_mapping = new ProcesoUsuarioMapping;
        $proceso_usuario_mapping -> edit($proceso_usuario_datos);

        if ($proceso_usuario_mapping -> respuesta == null) {
            $respuesta = $mensaje;
        } else {
            $respuesta = $proceso_usuario_mapping -> respuesta;
        }

        return $respuesta;

    }

    function delete($mensaje) {

        $proceso_usuario_datos = [
            'id_proceso_usuario' => $this -> proceso_usuario -> id_proceso_usuario
        ];
        
        $this -> validacion_formato -> validarAtributosDelete($proceso_usuario_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarDelete($proceso_usuario_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $proceso_usuario_mapping = new ProcesoUsuarioMapping;
        $proceso_usuario_mapping -> delete($proceso_usuario_datos);

        if ($proceso_usuario_mapping -> respuesta == null){
            $respuesta = $mensaje;
        }else{
            $respuesta = $proceso_usuario_mapping -> respuesta;
        }
        
        return $respuesta;

    }

    function search($paginacion) {

        $proceso_usuario_mapping = new ProcesoUsuarioMapping();
        $proceso_usuario_mapping -> search($paginacion);

        $returnBusquedas = new ReturnBusquedas
        (
            $proceso_usuario_mapping -> feedback['resource'],
            '',
            $this -> numberFindAll()["COUNT(*)"],
            sizeof($proceso_usuario_mapping -> feedback['resource']),
            $paginacion -> inicio
        );

        return $returnBusquedas;

    }

    function searchByParameters($paginacion) {

        $datos_search = array();
        
        if ($this -> proceso_usuario -> id_proceso_usuario == null) {
            $datos_search['id_proceso_usuario'] = '';
        } else {
            $datos_search['id_proceso_usuario'] = $this -> proceso_usuario -> id_proceso_usuario;
        }
        
        if ($this -> proceso_usuario -> fecha_proceso_usuario == null) {
            $datos_search['fecha_proceso_usuario'] = '';
        } else {
            $datos_search['fecha_proceso_usuario'] = $this -> proceso_usuario -> fecha_proceso_usuario;
        }
       
        if ($this -> proceso_usuario -> calculo_huella_carbono == null) {
            $datos_search['calculo_huella_carbono'] = '';
        } else {
            $datos_search['calculo_huella_carbono'] = $this -> proceso_usuario -> calculo_huella_carbono;
        }
       
        if ($this -> proceso_usuario -> dni_usuario == null) {
            $datos_search['dni_usuario'] = '';
        } else {
            $datos_search['dni_usuario'] = $this -> proceso_usuario -> dni_usuario;
        }
       
        if ($this -> proceso_usuario -> id_proceso == null) {
            $datos_search['id_proceso'] = '';
        } else {
            $datos_search['id_proceso'] = $this -> proceso_usuario -> id_proceso;
        }
       
        if ($this -> proceso_usuario -> borrado_proceso_usuario == null) {
            $datos_search['borrado_proceso_usuario'] = '';
        } else {
            $datos_search['borrado_proceso_usuario'] = $this -> proceso_usuario -> borrado_proceso_usuario;
        }
        
        $proceso_usuario_mapping= new ProcesoUsuarioMapping();
        $proceso_usuario_mapping -> searchByParameters($datos_search, $paginacion);

        $returnBusquedas = new ReturnBusquedas
        (
            $proceso_usuario_mapping -> feedback['resource'],
            $datos_search,
            $this -> numberFindParameters($datos_search)["COUNT(*)"],
            sizeof($proceso_usuario_mapping -> feedback['resource']),
            $paginacion->inicio
        );

        return $returnBusquedas;

    }
    
    function numberFindAll(){
        $proceso_usuario_mapping = new ProcesoUsuarioMapping();
        $proceso_usuario_mapping -> numberFindAll();
        return $proceso_usuario_mapping -> feedback['resource'];
    }

    function numberFindParameters($datos_search){
        $proceso_usuario_mapping = new ProcesoUsuarioMapping();
        $proceso_usuario_mapping->numberFindParameters($datos_search);
        return $proceso_usuario_mapping->feedback['resource'];
    }

}