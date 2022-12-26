<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/RolModel.php';

class RolMapping extends MappingBase {

    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datosInsertar) {

        $this -> query = 
            "INSERT INTO 
                `rol` (
                    `nombre_rol`,
                    `descripcion_rol`,
                    `borrado_rol`
                ) VALUES (
                    '" . $datosInsertar['nombre_rol'] . "',
                    '" . $datosInsertar['descripcion_rol'] . "',
                    '" . $datosInsertar['borrado_rol']."'
                );"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();  

    }

    function edit($datosModificar) {

        $this -> query = 
            "UPDATE `rol`
            SET
                `descripcion_rol`='" . $datosModificar['descripcion_rol'] . "'
            WHERE
                `id_rol`='". $datosModificar['id_rol'] . "';"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();

    }

    function delete($datosEliminar) {

        $this -> query =
            "UPDATE `rol`
            SET
                `borrado_rol`=1
            WHERE
                `id_rol`='". $datosEliminar['id_rol'] . "';"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();

    }

    function search($paginacion) {

        $this -> query = 
            "SELECT * FROM `rol`
            WHERE `borrado_rol`=0
            LIMIT " . $paginacion -> inicio . "," . $paginacion -> tamanhoPagina . ";"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this -> get_results_from_query();
    }

    function searchDelete($paginacion) {

        $this -> query = 
            "SELECT * FROM `rol`
            WHERE `borrado_rol`=1
            LIMIT " . $paginacion -> inicio . "," . $paginacion -> tamanhoPagina . ";"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this -> get_results_from_query();

    }

    function searchById($datos_search) {

        $this -> query = 
            "SELECT * FROM `rol`
            WHERE
                `id_rol`='" . $datos_search['id_rol'] . "' AND 
                `borrado_rol`=0;"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
        $respuesta = $this->feedback;

    }

    function searchByName($datos_search) {

        $this -> query = 
            "SELECT * FROM `rol`
            WHERE
                `nombre_rol`='" . $datos_search['nombre_rol'] . "' AND 
                `borrado_rol`=0;"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
    }

    function searchByParameters($datos_search, $paginacion) {

        $this -> query = 
            "SELECT * FROM `rol`
            WHERE
                LOWER(`nombre_rol`) LIKE LOWER(CONCAT('%','" . $datos_search['nombre_rol'] . "','%')) AND
                LOWER(`descripcion_rol`) LIKE LOWER(CONCAT('%','" . $datos_search['descripcion_rol'] . "','%')) AND
                `borrado_rol`=0
                LIMIT ". $paginacion -> inicio . "," . $paginacion -> tamanhoPagina . ";"
        ; 

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();

    }

    function numberFindAll() {
        $this -> query = "SELECT COUNT(*) FROM `rol` WHERE `borrado_rol`=0";
        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> get_one_result_from_query();
    }

    function numberFindAllDelete() {
        $this -> query = "SELECT COUNT(*) FROM `rol` WHERE `borrado_rol`=1";
        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> get_one_result_from_query();
    }

    function numberFindParameters($datos_search) {

        $this -> query = 
            "SELECT COUNT(*) FROM `rol`
            WHERE
                LOWER(`nombre_rol`) LIKE LOWER(CONCAT('%','" . $datos_search['nombre_rol'] . "','%')) AND
                LOWER(`descripcion_rol`) LIKE LOWER(CONCAT('%','" . $datos_search['descripcion_rol'] . "','%')) AND
                `borrado_rol`=0;"
        ;
        $this->stmt = $this->conexion->prepare($this->query); 
        $this->get_one_result_from_query();
    }
    
}
?>