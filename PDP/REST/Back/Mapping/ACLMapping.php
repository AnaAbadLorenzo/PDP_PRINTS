<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/ACLModel.php';

class ACLMapping extends MappingBase {

    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datos_insertar) {

        $this -> query = 
            "INSERT INTO 
                `rol_accion_funcionalidad` (
                    `id_rol`,
                    `id_funcionalidad`,
                    `id_accion`
                ) VALUES (
                    '" . $datos_insertar['id_rol'] . "',
                    '" . $datos_insertar['id_funcionalidad'] . "',
                    '" . $datos_insertar['id_accion']."'
                );"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();  

    }

    function delete($datos_eliminar) {

        $this -> query =
            "DELETE FROM `rol_accion_funcionalidad`
            WHERE
                `id_accion`='" . $datos_eliminar['id_accion'] . "' AND
                `id_funcionalidad`='" . $datos_eliminar['id_funcionalidad'] . "' AND
                `id_rol`='" . $datos_eliminar['id_rol'] . "';"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();

    }

    function search() {

        $this -> query = 
            "SELECT * FROM `rol_accion_funcionalidad`;"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this -> get_results_from_query();

    }

    function searchByAccion($datos_search) {
        
        $this -> query = 
            "SELECT * FROM `rol_accion_funcionalidad`
            WHERE
                `id_accion`='" . $datos_search['id_accion'] . "';"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this -> get_results_from_query();

    }

    function searchByFuncionalidad($datos_search) {
        
        $this -> query = 
            "SELECT * FROM `rol_accion_funcionalidad`
            WHERE
                `id_funcionalidad`='" . $datos_search['id_funcionalidad'] . "';"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this -> get_results_from_query();

    }

    function searchByRol($datos_search) {
        $this -> query = 
            "SELECT * FROM `rol_accion_funcionalidad`
            WHERE
                `id_rol`='" . $datos_search['id_rol'] . "';"
        ;
        $this->stmt = $this->conexion->prepare($this->query);
        $this -> get_results_from_query();

    }

    function searchSpecific($datos_search) {

        $this -> query = 
            "SELECT * FROM `rol_accion_funcionalidad`
            WHERE
                `id_accion`='" . $datos_search['accion']['id_accion'] . "' AND
                `id_funcionalidad`='" . $datos_search['funcionalidad']['id_funcionalidad'] . "' AND
                `id_rol`='" . $datos_search['rol']['id_rol'] . "';"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this -> get_results_from_query();

    }

    function searchFuncionalidadesByRol($datos_search) {

        $this -> query = 
            "SELECT DISTINCT `id_funcionalidad`
            FROM `rol_accion_funcionalidad`
            WHERE
                `id_rol`='" . $datos_search['id_rol'] . "';"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
        $respuesta = $this->feedback;

    }

    function searchFuncionalidadesYAccionesByRol($datos_search) {

        $this -> query = 
            "SELECT `id_funcionalidad`,`id_accion` 
            FROM `rol_accion_funcionalidad`
            WHERE
                `id_rol`='" . $datos_search['id_rol'] . "';"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
        $respuesta = $this->feedback;

    }

    function searchAccionesByFuncionalidadRol($datos_search) {

        $this -> query = 
            "SELECT `id_accion` FROM `rol_accion_funcionalidad`
            WHERE
                `id_funcionalidad`='" . $datos_search['id_funcionalidad'] . "' AND
                `id_rol`='" . $datos_search['id_rol'] . "';"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function searchACLByFuncionalidad($datos_search) {
        $this -> query = 
        "SELECT * FROM `rol_accion_funcionalidad`
        WHERE
            `id_funcionalidad`='" . $datos_search['id_funcionalidad']."'";

        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function numberFindAll() {
        $this -> query = "SELECT COUNT(*) FROM `rol_accion_funcionalidad`";
        $this -> stmt = $this -> conexion -> prepare($this -> query);
        $this -> get_one_result_from_query();
    }

    // function numberFindParameters($datos_search) {

    //     $this -> query = 
    //         "SELECT COUNT(*) FROM `rol_accion_funcionalidad`
    //         WHERE
    //             LOWER(`id_rol`) LIKE LOWER(CONCAT('%','" . $datos_search['id_rol'] . "','%')) AND
    //             LOWER(`id_funcionalidad`) LIKE LOWER(CONCAT('%','" . $datos_search['id_funcionalidad'] . "','%')) AND
    //             `id_accion`=0;"
    //     ;
    //     $this->stmt = $this->conexion->prepare($this->query); 
    //     $this->get_one_result_from_query();
    // }
    
}
?>