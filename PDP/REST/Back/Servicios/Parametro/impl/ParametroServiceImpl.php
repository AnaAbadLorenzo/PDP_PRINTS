<?php

include_once './Servicios/ServiceBase.php';
include_once './Servicios/Comun/ReturnBusquedas.php';
include_once './Servicios/Parametro/ParametroService.php';

include_once './Mapping/ParametroMapping.php';

include_once './Modelos/ParametroModel.php';

include_once './Validation/Accion/ParametroAccion.php';

class ParametroServiceImpl extends ServiceBase implements ParametroService {

    public $parametro;
    private $validacion_formato;
    private $validacion_accion;

    function inicializarParametros() {
        $this -> parametro = $this -> crearModelo('Parametro');
        $this -> validacion_accion = $this -> crearValidacionAccion('Parametro');
        $this -> validacion_formato = $this -> crearValidacionFormato('Parametro');
    }

    function add($mensaje) {

        $parametro_datos = [
            'parametro_formula' => $this -> parametro -> parametro_formula,
            'descripcion_parametro' => $this -> parametro -> descripcion_parametro,
            'id_proceso' => $this -> parametro -> id_proceso
        ];
    
        $this -> validacion_formato -> validarAtributosAdd($parametro_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarAdd($parametro_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //añadir a bd
        $parametro_mapping = new ParametroMapping;
        $parametro_mapping -> add($parametro_datos);

        if($parametro_mapping->respuesta == null){
            $respuesta = $mensaje;
        }else{
            $respuesta = $parametro_mapping->respuesta;
        }

        return $respuesta;

    }

    function edit($mensaje) {

        $parametro_datos = [
            'id_parametro' => $this -> parametro -> id_parametro,
            'parametro_formula' => $this -> parametro -> parametro_formula,
            'descripcion_parametro' => $this -> parametro -> descripcion_parametro,
            'id_proceso' => $this -> parametro -> id_proceso
        ];
    
        $this -> validacion_formato -> validarAtributosEdit($parametro_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarEdit($parametro_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        //añadir a bd
        $parametro_mapping = new ParametroMapping;
        $parametro_mapping -> edit($parametro_datos);

        if($parametro_mapping->respuesta == null){
            $respuesta = $mensaje;
        }else{
            $respuesta = $parametro_mapping->respuesta;
        }

        return $respuesta;

    }

    function delete($mensaje) {

        $parametro_datos = [
            'id_parametro' => $this -> parametro -> id_parametro
        ];
        
        $this -> validacion_formato -> validarAtributosDelete($parametro_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarDelete($parametro_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $parametro_mapping = new ParametroMapping;
        $parametro_mapping -> delete($parametro_datos);

        if ($parametro_mapping -> respuesta == null){
            $respuesta = $mensaje;
        }else{
            $respuesta = $parametro_mapping -> respuesta;
        }
        
        return $respuesta;

    }

    function search($paginacion) {

        $parametro_mapping = new ParametroMapping();
        $parametro_mapping -> search($paginacion);
        $datosParametro = $parametro_mapping -> search($paginacion);
        $datosProceso = $this->searchForeignKeys();

        $datosADevolver = array();
        $datosProcesoDev = array();
        foreach($datosProceso as $proceso){
            foreach($datosParametro as $parametro){
                if($proceso['id_proceso'] == $parametro['id_proceso']){
                    $datosUsuarioDev['parametro'] = $parametro;
                    $datosUsuarioDev['proceso'] = $proceso;
                    array_push($datosADevolver, $datosUsuarioDev);
                }
            }
        }
        $returnBusquedas = new ReturnBusquedas($datosADevolver, '',
                    $this->numberFindAll()["COUNT(*)"],sizeof($datosADevolver), $paginacion->inicio);

        return $returnBusquedas;

    }

    function searchByParameters($paginacion) {

        $datos_search = array();
        
        if ($this -> parametro -> parametro_formula == null) {
            $datos_search['parametro_formula'] = '';
        } else {
            $datos_search['parametro_formula'] = $this -> parametro -> parametro_formula;
        }
       
        if ($this -> parametro -> descripcion_parametro == null) {
            $datos_search['descripcion_parametro'] = '';
        } else {
            $datos_search['descripcion_parametro'] = $this -> parametro -> descripcion_parametro;
        }
       
        if ($this -> parametro -> id_proceso == null) {
            $datos_search['id_proceso'] = '';
        } else {
            $datos_search['id_proceso'] = $this -> parametro -> id_proceso;
        }
        
        $parametro_mapping= new ParametroMapping();
        $parametro_mapping -> searchByParameters($datos_search, $paginacion);

        $returnBusquedas = new ReturnBusquedas
        (
            $parametro_mapping -> feedback['resource'],
            $datos_search,
            $this -> numberFindParameters($datos_search)["COUNT(*)"],
            sizeof($parametro_mapping -> feedback['resource']),
            $paginacion->inicio
        );

        return $returnBusquedas;

    }
    
    function numberFindAll(){
        $parametro_mapping = new ParametroMapping();
        $parametro_mapping -> numberFindAll();
        return $parametro_mapping -> feedback['resource'];
    }

    function numberFindParameters($datos_search){
        $parametro_mapping = new ParametroMapping();
        $parametro_mapping->numberFindParameters($datos_search);
        return $parametro_mapping->feedback['resource'];
    }

    function searchForeignKeys() {
        $proceso_mapping = new ProcesoMapping();
        $proceso_mapping->searchAll();
        return $proceso_mapping->feedback['resource'];
    }

}