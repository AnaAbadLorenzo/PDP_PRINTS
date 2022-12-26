<?php

include_once './Servicios/ServiceBase.php';
include_once './Servicios/Noticia/NoticiaService.php';
include_once './Mapping/NoticiaMapping.php';
include_once './Validation/Accion/NoticiaAccion.php';
include_once './Servicios/Comun/ReturnBusquedas.php';

class NoticiaServiceImpl extends ServiceBase implements NoticiaService {

    private $noticia;
    private $validacion_formato;
    private $validacion_accion;

    function inicializarParametros() {
        $this -> noticia = $this -> crearModelo('Noticia');
        $this -> validacion_accion = $this -> crearValidacionAccion('Noticia');
        $this -> validacion_formato = $this -> crearValidacionFormato('Noticia');
    }

    function add($mensaje) {

        $noticia_datos = array();
        $noticia_datos['id_noticia'] = $this -> noticia -> id_noticia;
        $noticia_datos['titulo_noticia'] = $this -> noticia -> titulo_noticia;
        $noticia_datos['contenido_noticia'] = $this -> noticia -> contenido_noticia;
        $noticia_datos['fecha_noticia'] = $this -> noticia -> fecha_noticia;

        $this -> validacion_formato -> validarAtributosAdd($noticia_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarAddNoticia($noticia_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $noticia_a_insertar = [
            'id_noticia' => $noticia_datos['id_noticia'],
            'titulo_noticia' => $noticia_datos['titulo_noticia'],
            'contenido_noticia' => $noticia_datos['contenido_noticia'],
            'fecha_noticia' => date('Y-m-d')
        ];

        $noticia_mapping = new NoticiaMapping();
        $noticia_mapping -> add($noticia_a_insertar);
        $respuesta = $mensaje;

        return $respuesta;

    }

    function edit($mensaje) {

        $noticia_datos = array();
        $noticia_datos['id_noticia'] = $this -> noticia -> id_noticia;
        $noticia_datos['titulo_noticia'] = $this -> noticia -> titulo_noticia;
        $noticia_datos['contenido_noticia'] = $this -> noticia -> contenido_noticia;
        $noticia_datos['fecha_noticia'] = $this -> noticia -> fecha_noticia;

        $this -> validacion_formato -> validarAtributosEdit($noticia_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarEditNoticia($noticia_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        if ($respuesta == null) {
            $noticia_a_editar = [
                'id_noticia' => $noticia_datos['id_noticia'],
                'titulo_noticia' => $noticia_datos['titulo_noticia'],
                'contenido_noticia' => $noticia_datos['contenido_noticia'],
                'fecha_noticia' => date('Y-m-d')
            ];

            $noticia_mapping = new NoticiaMapping();
            $noticia_mapping -> edit($noticia_a_editar);
            $respuesta = $mensaje;

        }

        return $respuesta;

    }

    function delete($mensaje){

        $noticia_datos = array();
        $noticia_datos['id_noticia'] = $this -> noticia -> id_noticia;

        $this -> validacion_formato -> validarAtributosDelete($noticia_datos);
        $respuesta = $this -> validacion_formato -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        $this -> validacion_accion -> comprobarDeleteNoticia($noticia_datos);
        $respuesta = $this -> validacion_accion -> respuesta;
        if ($respuesta != null) {
            return $respuesta;
        }

        if ($respuesta == null) {

            $noticia_a_eliminar = [
                'id_noticia' => $noticia_datos['id_noticia']
            ];

            $noticia_mapping = new NoticiaMapping();
            $noticia_mapping -> delete($noticia_a_eliminar);
            $respuesta = $mensaje;

        }

        return $respuesta;

    }

    function search($paginacion) {
        $noticia_mapping = new NoticiaMapping();
        $noticia_mapping -> search($paginacion);

        $returnBusquedas = new ReturnBusquedas
        (
            $noticia_mapping -> feedback['resource'],
            '',
            $this -> numberFindAll()["COUNT(*)"],
            sizeof($noticia_mapping -> feedback['resource']),
            $paginacion -> inicio
        );
        return $returnBusquedas;
    }

    function searchAll() {
        $noticia_mapping = new NoticiaMapping();
        $noticia_mapping -> searchAllWithoutPagination();

        $returnBusquedas = new ReturnBusquedas
        (
            $noticia_mapping -> feedback['resource'],
            '',
            '',
            '',
            ''
        );
        return $returnBusquedas;
    }

    function numberFindAll(){
        $noticia_mapping = new NoticiaMapping();
        $noticia_mapping -> numberFindAll();
        return $noticia_mapping -> feedback['resource'];
    }

    function searchByParameters($paginacion) {
        $datos_search = array(
            'titulo_noticia' => $this->noticia->titulo_noticia,
            'contenido_noticia' => $this->noticia->contenido_noticia,
            'fecha_noticia' => $this->noticia->fecha_noticia
        );
        $noticia_mapping= new NoticiaMapping();
        $noticia_mapping -> searchByParameters($datos_search, $paginacion);

        $returnBusquedas = new ReturnBusquedas
        (
            $noticia_mapping -> feedback['resource'],
            $datos_search,
            $this -> numberFindParameters($datos_search)["COUNT(*)"],
            sizeof($noticia_mapping -> feedback['resource']),
            $paginacion->inicio
        );

        return $returnBusquedas;

    }

    function numberFindParameters($datos_search){
        $noticia_mapping = new NoticiaMapping();
        $noticia_mapping->numberFindByParameters($datos_search);
        return $noticia_mapping->feedback['resource'];
    }

}

?>