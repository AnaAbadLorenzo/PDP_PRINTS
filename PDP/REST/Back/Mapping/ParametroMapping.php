<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/ParametroModel.php';

class ParametroMapping extends MappingBase {

    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datos)
    {
        $this -> query = 
            "INSERT INTO `parametro` 
            (
                `parametro_formula`,
                `descripcion_parametro`,
                `id_proceso`
            )
            VALUES 
            (
                '" . $datos['parametro_formula'] . "',
                '" . $datos['descripcion_parametro'] . "',
                '" . $datos['id_proceso']."'
            );"
        ;

        $this -> stmt = $this -> conexion -> prepare($this->query);
        $this -> execute_single_query();  
    }

    function delete($datosEliminar) {

        $this -> query =
            "DELETE FROM `parametro`
            WHERE
                `id_parametro`='". $datosEliminar['id_parametro'] . "';"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();

    }

    function search($paginacion) {

        $this -> query = 
            "SELECT * FROM `parametro`
            LIMIT " . $paginacion -> inicio . "," . $paginacion -> tamanhoPagina . ";"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this -> get_results_from_query();
    }

    function searchById($datos) {

        $this -> query = 
            "SELECT * FROM `parametro`
            WHERE
                `id_parametro`='" . $datos['id_parametro'] . "';"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
        $respuesta = $this->feedback;

        return $respuesta;

    }

    function searchByName($datos) {

        $this -> query = 
            "SELECT * FROM `parametro`
            WHERE
                `parametro_formula`='" . $datos['parametro_formula'] . "'"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
    }

    function searchByParameters($datos, $paginacion) {

        $this -> query = 
            "SELECT * FROM `parametro`
            WHERE
                LOWER(`parametro_formula`) LIKE LOWER(CONCAT('%','" . $datos['parametro_formula'] . "','%')) AND
                LOWER(`descripcion_parametro`) LIKE LOWER(CONCAT('%','" . $datos['descripcion_parametro'] . "','%')) AND
                LOWER(`id_proceso`) LIKE LOWER(CONCAT('%','" . $datos['id_proceso'] . "','%'))
                LIMIT ". $paginacion -> inicio . "," . $paginacion -> tamanhoPagina . ";"
        ; 

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();

    }

    function numberFindAll() {
        $this -> query = "SELECT COUNT(*) FROM `parametro`";
        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> get_one_result_from_query();
    }

    function numberFindParameters($datos) {

        $this -> query = 
            "SELECT COUNT(*) FROM `parametro`
            WHERE
                LOWER(`parametro_formula`) LIKE LOWER(CONCAT('%','" . $datos['parametro_formula'] . "','%')) AND
                LOWER(`descripcion_parametro`) LIKE LOWER(CONCAT('%','" . $datos['descripcion_parametro'] . "','%')) AND
                LOWER(`id_proceso`) LIKE LOWER(CONCAT('%','" . $datos['id_proceso'] . "','%'));"
        ;
        $this->stmt = $this->conexion->prepare($this->query); 
        $this->get_one_result_from_query();
    }
    
}
?>