<?php

include_once './Mapping/MappingBase.php';
include_once './Modelos/PersonaModel.php';

class AccionMapping extends MappingBase {
    public $conexion;

    public function __construct(){
        $this->conexion = $this->connection();
    }

    function add($datosInsertar) {
        
        $this->query = "INSERT INTO `accion` (`nombre_accion`, `descripcion_accion`, `borrado_accion`) VALUES ('".$datosInsertar['nombre_accion']."','".$datosInsertar['descripcion_accion']."','"
                        .$datosInsertar['borrado_accion']. "')";
        $this->stmt = $this->conexion->prepare($this->query);
       
        $this->execute_single_query();  
    }

    function edit($datosModificar) {
      
        $this->query = "UPDATE `accion` SET `descripcion_accion` = '"
        .$datosModificar['descripcion_accion']."', `borrado_accion`='"
        .$datosModificar['borrado_accion']." 'WHERE `id_accion` ='"
        .$datosModificar['id_accion']."'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();
    }

    function delete($datosEliminar) {
        $this->query = "UPDATE `accion` SET `borrado_accion` = 1 WHERE `id_accion` ='"
        .$datosEliminar['id_accion']."'";
        $this->stmt = $this->conexion->prepare($this->query);

        $this->execute_single_query();
    }

    function search($paginacion) {
        $this->query = "SELECT * FROM `accion` WHERE `borrado_accion` = 0 LIMIT " .$paginacion->inicio. ",".$paginacion->tamanhoPagina;
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function searchDelete($paginacion) {
        $this->query = "SELECT * FROM `accion` WHERE `borrado_accion` = 1 LIMIT " .$paginacion->inicio. ",".$paginacion->tamanhoPagina;
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function numberFindAll() {
        $this->query = "SELECT COUNT(*) FROM `accion` WHERE `borrado_accion`= 0";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
    }

    function numberFindAllDelete() {
        $this->query = "SELECT COUNT(*) FROM `accion` WHERE `borrado_accion`= 1";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
    }

    function searchByParameters($datosSearchParameters, $paginacion) {
        $this->query = "SELECT * FROM `accion` WHERE LOWER(`nombre_accion`) like LOWER(CONCAT('%','" .$datosSearchParameters['nombre_accion']. "', '%')) AND
                        LOWER(`descripcion_accion`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['descripcion_accion']."', '%')) AND
                        `borrado_accion` = 0 LIMIT ".$paginacion->inicio.",".$paginacion->tamanhoPagina.""; 
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_results_from_query();
    }

    function numberFindParameters($datosSearchParameters) {
        $this->query = "SELECT COUNT(*) FROM `accion` WHERE LOWER(`nombre_accion`) like LOWER(CONCAT('%','" .$datosSearchParameters['nombre_accion']. "', '%')) AND
                        LOWER(`descripcion_accion`) LIKE LOWER(CONCAT('%','" .$datosSearchParameters['descripcion_accion']."', '%')) AND
                        `borrado_accion` = 0"; 
        $this->stmt = $this->conexion->prepare($this->query); 
        $this->get_one_result_from_query();
    }

    function searchById($datosSearch) {
        
        $this->query = "SELECT * FROM `accion` WHERE `id_accion`='".$datosSearch['id_accion']."'";
        $this->stmt = $this->conexion->prepare($this->query);
    
        $this->get_one_result_from_query();
        $respuesta = $this->feedback;
        return $respuesta;
    }
 
    function searchByName($datosBuscar) {
        $this->query = "SELECT * FROM `accion` WHERE `nombre_accion`='".$datosBuscar['nombre_accion']."'";

        $this->stmt = $this->conexion->prepare($this->query);
    
        $this->get_one_result_from_query();
        $respuesta = $this->feedback;

        return $respuesta;
    }
   
}
?>