<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/PersonaModel.php';

class FuncionalidadMapping extends MappingBase {


    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

   function add($datosInsertar) {
        $this->query = "INSERT INTO `funcionalidad` (`nombre_funcionalidad`, `descripcion_funcionalidad`, `borrado_funcionalidad`) 
                        VALUES ('".$datosInsertar['nombre_funcionalidad']."','".$datosInsertar['descripcion_funcionalidad']."','"
                        .$datosInsertar['borrado_funcionalidad']. "')";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();  
    }


    function edit($datosModificar) {
        $this->query = "UPDATE `funcionalidad` SET `descripcion_funcionalidad` = '"
        .$datosModificar['descripcion_funcionalidad']."', `borrado_funcionalidad`='"
        .$datosModificar['borrado_funcionalidad']." 'WHERE `id_funcionalidad` ='"
        .$datosModificar['id_funcionalidad']."'";
        $this->stmt = $this->conexion->prepare($this->query);

        $this->execute_single_query();
    }

    function delete($datosEliminar) {
        $this->query = "UPDATE `funcionalidad` SET `borrado_funcionalidad` = 1 WHERE `id_funcionalidad` ='"
        .$datosEliminar['id_funcionalidad']."'";
        $this->stmt = $this->conexion->prepare($this->query);

        $this->execute_single_query();
    }

    function search($paginacion) {
        $this->query = "SELECT * FROM `funcionalidad` WHERE `borrado_funcionalidad`= 0 LIMIT ".$paginacion->inicio. ",".$paginacion->tamanhoPagina;
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function searchAllSinP() {
        $this->query = "SELECT * FROM `funcionalidad` WHERE `borrado_funcionalidad`= 0";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function searchDelete($paginacion) {
        $this->query = "SELECT * FROM `funcionalidad` WHERE `borrado_funcionalidad` = 1 LIMIT " .$paginacion->inicio. ",".$paginacion->tamanhoPagina;
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function numberFindAll() {
        $this->query = "SELECT COUNT(*) FROM `funcionalidad` WHERE `borrado_funcionalidad`= 0";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
    }

    function numberFindAllDelete() {
        $this->query = "SELECT COUNT(*) FROM `funcionalidad` WHERE `borrado_funcionalidad`= 1";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
    }
    
    function searchByParameters($datosSearchParameters, $paginacion) {
        $this->query = "SELECT * FROM `funcionalidad` WHERE LOWER(`nombre_funcionalidad`) like LOWER(CONCAT('%','" .$datosSearchParameters['nombre_funcionalidad']. "', '%')) AND
                        LOWER(`descripcion_funcionalidad`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['descripcion_funcionalidad']."', '%')) AND
                        `borrado_funcionalidad` = 0 LIMIT ".$paginacion->inicio.",".$paginacion->tamanhoPagina.""; 
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function numberFindParameters($datosSearchParameters) {
        $this->query = "SELECT COUNT(*) FROM `funcionalidad` WHERE LOWER(`nombre_funcionalidad`) like LOWER(CONCAT('%','" .$datosSearchParameters['nombre_funcionalidad']. "', '%')) AND
                        LOWER(`descripcion_funcionalidad`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['descripcion_funcionalidad']."', '%')) AND
                        `borrado_funcionalidad` = 0"; 
        $this->stmt = $this->conexion->prepare($this->query); 
        $this->get_one_result_from_query();
    }

    function searchById($datosSearch) {
        $this->query = "SELECT * FROM `funcionalidad` WHERE `id_funcionalidad`='".$datosSearch['id_funcionalidad']."'";
        $this->stmt = $this->conexion->prepare($this->query);
    
        $this->get_one_result_from_query();
        $respuesta = $this->feedback;
        return $respuesta;
    }

    function searchByName($datosSearch) {
        $this->query = "SELECT * FROM `funcionalidad` WHERE `nombre_funcionalidad`='".$datosSearch['nombre_funcionalidad']."'";
        $this->stmt = $this->conexion->prepare($this->query);
    
        $this->get_one_result_from_query();
    }
}
?>