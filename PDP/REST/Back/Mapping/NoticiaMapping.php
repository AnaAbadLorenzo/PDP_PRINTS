<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/NoticiaModel.php';

class NoticiaMapping extends MappingBase {
    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datosInsertar) {

        $this->query = "INSERT INTO `noticia` (`titulo_noticia`, `contenido_noticia`, `fecha_noticia`) 
                        VALUES ('".$datosInsertar['titulo_noticia']."', '"
                        .$datosInsertar['contenido_noticia']. "', '".$datosInsertar['fecha_noticia']."');";
        $this->stmt = $this->conexion->prepare($this->query);

        $this->execute_single_query();
    }

    function edit($datosModificar) {
        $this->query = "UPDATE `noticia` SET `contenido_noticia` = '"
        .$datosModificar['contenido_noticia']."', `fecha_noticia` = '"
        .$datosModificar['fecha_noticia']."' WHERE `id_noticia`='". $datosModificar['id_noticia'] . "'";

        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();
    }

    function delete($datosEliminar) {

        $this->query = "DELETE FROM `noticia` WHERE `id_noticia` = '". $datosEliminar['id_noticia']."'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();
    }

    function search($paginacion) {
        $this->query = "SELECT * FROM `noticia` LIMIT ". $paginacion->inicio. "," .$paginacion->tamanhoPagina. "";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function searchAllWithoutPagination() {
        $this->query = "SELECT * FROM `noticia` ";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function numberFindAll() {
        $this->query = "SELECT COUNT(*) FROM `noticia` ";
        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> get_one_result_from_query();
    }

    function searchByParameters($datos_search, $paginacion) {
        $this -> query = 
            "SELECT * FROM `noticia`
            WHERE
                LOWER(`titulo_noticia`) LIKE LOWER(CONCAT('%','" . $datos_search['titulo_noticia'] . "','%')) AND
                LOWER(`contenido_noticia`) LIKE LOWER(CONCAT('%','" . $datos_search['contenido_noticia'] . "','%')) AND
                LOWER(`fecha_noticia`) LIKE LOWER(CONCAT('%','" . $datos_search['fecha_noticia'] . "','%'))
                LIMIT ". $paginacion -> inicio . "," . $paginacion -> tamanhoPagina . ";"
        ; 

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();

    }

    function numberFindByParameters($datos_search) {
        $this -> query = 
            "SELECT COUNT(*) FROM `noticia`
            WHERE
                LOWER(`titulo_noticia`) LIKE LOWER(CONCAT('%','" . $datos_search['titulo_noticia'] . "','%')) AND
                LOWER(`contenido_noticia`) LIKE LOWER(CONCAT('%','" . $datos_search['contenido_noticia'] . "','%')) AND
                LOWER(`fecha_noticia`) LIKE LOWER(CONCAT('%','" . $datos_search['fecha_noticia'] . "','%'));"
        ; 
        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> get_one_result_from_query();

    }

    function searchById($datosSearch) {
            $this->query = "SELECT * FROM `noticia` WHERE `id_noticia`='" . $datosSearch['id_noticia'] . "'";
            $this->stmt = $this->conexion->prepare($this->query);
            $this->get_one_result_from_query();
            $respuesta = $this->feedback;
    }

    function searchByTitulo($datosSearch) {
            $this->query = "SELECT * FROM `noticia` WHERE `titulo_noticia`='" . $datosSearch['titulo_noticia'] . "'";
            $this->stmt = $this->conexion->prepare($this->query);
            $this->get_one_result_from_query();
            $respuesta = $this->feedback;

    }

    function searchByContenido($datosSearch) {
            $this->query = "SELECT * FROM `noticia` WHERE `contenido_noticia`='" . $datosSearch['contenido_noticia'] . "'";
            $this->stmt = $this->conexion->prepare($this->query);
            $this->get_one_result_from_query();
            $respuesta = $this->feedback;

    }
    function searchByFecha($datosSearch) {
            $this->query = "SELECT * FROM `noticia` WHERE `fecha_noticia`='" . $datosSearch['fecha_noticia'] . "'";
            $this->stmt = $this->conexion->prepare($this->query);
            $this->get_one_result_from_query();
            $respuesta = $this->feedback;

    }
}
?>
