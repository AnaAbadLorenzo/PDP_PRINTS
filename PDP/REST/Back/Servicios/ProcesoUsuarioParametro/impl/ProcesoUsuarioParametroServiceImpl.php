<?php

include_once './Servicios/ServiceBase.php';
include_once './Servicios/Comun/ReturnBusquedas.php';
include_once './Servicios/ProcesoUsuarioParametro/ProcesoUsuarioParametroService.php';

include_once './Mapping/ProcesoUsuarioParametroMapping.php';

include_once './Modelos/ProcesoUsuarioParametroModel.php';

include_once './Validation/Accion/ProcesoUsuarioParametroAccion.php';

class ProcesoUsuarioParametroServiceImpl extends ServiceBase implements ProcesoUsuarioParametroService {

    public $proceso_usuario_parametro;
    
    private $validacion_formato;
    private $validacion_accion;

    function inicializarParametros() {
        $this -> proceso_usuario_parametro = $this -> crearModelo('ProcesoUsuarioParametro');
        $this -> validacion_accion = $this -> crearValidacionAccion('ProcesoUsuarioParametro');
        $this -> validacion_formato = $this -> crearValidacionFormato('ProcesoUsuarioParametro');
    }

    function add($mensaje) {

        $proceso_usuario_parametro_datos = [
            'id_proceso_usuario' => $this -> proceso_usuario_parametro -> id_proceso_usuario,
            'id_parametro' => $this -> proceso_usuario_parametro -> id_parametro,
            'valor_parametro' => $this -> proceso_usuario_parametro -> valor_parametro
        ];
    
        $this -> validacion_formato -> validarAtributosAdd($proceso_usuario_parametro_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarAdd($proceso_usuario_parametro_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //añadir a bd
        $proceso_usuario_parametro_mapping = new ProcesoUsuarioParametroMapping;
        $proceso_usuario_parametro_mapping -> add($proceso_usuario_parametro_datos);

        if ($proceso_usuario_parametro_mapping -> respuesta == null) {
            $respuesta = $mensaje;
        } else {
            $respuesta = $proceso_usuario_parametro_mapping -> respuesta;
        }

        return $respuesta;

    }

    function edit($mensaje) {

        $proceso_usuario_parametro_datos = [
            'id_proceso_usuario' => $this -> proceso_usuario_parametro -> id_proceso_usuario,
            'id_parametro' => $this -> proceso_usuario_parametro -> id_parametro,
            'valor_parametro' => $this -> proceso_usuario_parametro -> valor_parametro
        ];
    
        $this -> validacion_formato -> validarAtributosEdit($proceso_usuario_parametro_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarEdit($proceso_usuario_parametro_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            if($this -> proceso_usuario_parametro -> id_proceso_usuario != null &&
                $this -> proceso_usuario_parametro -> id_parametro != null && 
                $this -> proceso_usuario_parametro -> valor_parametro != null) {
                    $proceso_usuario_parametro_mapping = new ProcesoUsuarioParametroMapping;
                    $proceso_usuario_parametro_mapping -> add($proceso_usuario_parametro_datos);
                    $respuesta = $mensaje;
                    return $respuesta;
                }else{
                    return $respuesta;
                }
        }

        //añadir a bd
        $proceso_usuario_parametro_mapping = new ProcesoUsuarioParametroMapping;
        $proceso_usuario_parametro_mapping -> edit($proceso_usuario_parametro_datos);

        if ($proceso_usuario_parametro_mapping -> respuesta == null) {
            $respuesta = $mensaje;
        } else {
            $respuesta = $proceso_usuario_parametro_mapping -> respuesta;
        }

        return $respuesta;

    }

    function delete($mensaje) {

        $proceso_usuario_parametro_datos = [
            'id_proceso_usuario' => $this -> proceso_usuario_parametro -> id_proceso_usuario,
            'id_parametro' => $this -> proceso_usuario_parametro -> id_parametro
        ];
        
        $this -> validacion_formato -> validarAtributosDelete($proceso_usuario_parametro_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarDelete($proceso_usuario_parametro_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $proceso_usuario_parametro_mapping = new ProcesoUsuarioParametroMapping;
        $proceso_usuario_parametro_mapping -> delete($proceso_usuario_parametro_datos);

        if ($proceso_usuario_parametro_mapping -> respuesta == null){
            $respuesta = $mensaje;
        }else{
            $respuesta = $proceso_usuario_parametro_mapping -> respuesta;
        }
        
        return $respuesta;

    }

    function search($paginacion) {

        $proceso_usuario_parametro_mapping = new ProcesoUsuarioParametroMapping();
        $proceso_usuario_parametro_mapping -> search($paginacion);

        $returnBusquedas = new ReturnBusquedas
        (
            $proceso_usuario_parametro_mapping -> feedback['resource'],
            '',
            $this -> numberFindAll()["COUNT(*)"],
            sizeof($proceso_usuario_parametro_mapping -> feedback['resource']),
            $paginacion -> inicio
        );

        return $returnBusquedas;

    }

    function searchByParameters($paginacion) {

        $datos_search = array();
        
        if ($this -> proceso_usuario_parametro -> id_proceso_usuario == null) {
            $datos_search['id_proceso_usuario'] = '';
        } else {
            $datos_search['id_proceso_usuario'] = $this -> proceso_usuario_parametro -> id_proceso_usuario;
        }
       
        if ($this -> proceso_usuario_parametro -> id_parametro == null) {
            $datos_search['id_parametro'] = '';
        } else {
            $datos_search['id_parametro'] = $this -> proceso_usuario_parametro -> id_parametro;
        }
       
        if ($this -> proceso_usuario_parametro -> valor_parametro == null) {
            $datos_search['valor_parametro'] = '';
        } else {
            $datos_search['valor_parametro'] = $this -> proceso_usuario_parametro -> valor_parametro;
        }
        
        $proceso_usuario_parametro_mapping= new ProcesoUsuarioParametroMapping();
        $proceso_usuario_parametro_mapping -> searchByParameters($datos_search, $paginacion);

        $returnBusquedas = new ReturnBusquedas
        (
            $proceso_usuario_parametro_mapping -> feedback['resource'],
            $datos_search,
            $this -> numberFindParameters($datos_search)["COUNT(*)"],
            sizeof($proceso_usuario_parametro_mapping -> feedback['resource']),
            $paginacion->inicio
        );

        return $returnBusquedas;

    }

    function searchByIdProcesoUsuario() {

        $datos_search = array();
        
        if ($this -> proceso_usuario_parametro -> id_proceso_usuario == null) {
            $datos_search['id_proceso_usuario'] = '';
        } else {
            $datos_search['id_proceso_usuario'] = $this -> proceso_usuario_parametro -> id_proceso_usuario;
        }
       
        $proceso_usuario_parametro_mapping= new ProcesoUsuarioParametroMapping();
        $proceso_usuario_parametro_mapping -> searchByIdProcesoUsuario($datos_search);

        return $proceso_usuario_parametro_mapping -> feedback['resource'];

    }
    
    function numberFindAll(){
        $proceso_usuario_parametro_mapping = new ProcesoUsuarioParametroMapping();
        $proceso_usuario_parametro_mapping -> numberFindAll();
        return $proceso_usuario_parametro_mapping -> feedback['resource'];
    }

    function numberFindParameters($datos_search){
        $proceso_usuario_parametro_mapping = new ProcesoUsuarioParametroMapping();
        $proceso_usuario_parametro_mapping->numberFindParameters($datos_search);
        return $proceso_usuario_parametro_mapping->feedback['resource'];
    }

}