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
                    `id_rol`,
                    `nombre_rol`,
                    `descripcion_rol`,
                    `borrado_rol`
                ) VALUES (
                    '" . $datosInsertar['id_rol'] . "',
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
                `nombre_rol`='" . $datosModificar['nombre_rol'] . "',
                `descripcion_rol`='" . $datosModificar['descripcion_rol'] . "',
                `borrado_rol`='" . $datosModificar['borrado_rol'] . "'
            WHERE
                `id_rol`='". $datosModificar['id_rol'] . "'"
        ;

        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();

    }

    function delete($datosEliminar) {
        $this -> query = "DELETE FROM `rol` WHERE `id_rol` = '" . $datosEliminar['id_rol'] . "'";
        $this->stmt = $this->conexion->prepare($this->query);
        $this->execute_single_query();
    }

    function search() {
        $this->query = "SELECT * FROM `rol` ";
        $this->get_results_from_query();
    }

    function searchById($datosSearch) {
        $this->query = "SELECT * FROM `rol` WHERE 'id_rol='".$datosSearch['id_rol']."'";
        $foraneas = $datosSearch->foraneas;
        $this->stmt = $this->conexion->prepare($this->query);
        $this->get_one_result_from_query();
        $respuesta = $this->feedback;

        foreach($foraneas as $fk){
            $result = $this->incluirDatosForaneas($this->feedback['resource'],$fk, 'id_rol');
            array_push($respuesta['resource'], $result);
        } 
    }
    
}
?>